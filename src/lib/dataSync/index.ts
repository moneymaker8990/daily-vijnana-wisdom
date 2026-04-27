/**
 * Data Sync Layer
 *
 * Syncs data between localStorage (offline) and Supabase (cloud).
 * - When signed in: saves to both localStorage and cloud
 * - When signed out: only uses localStorage
 * - On sign in: merges localStorage data with cloud data
 */

import type { User } from '@supabase/supabase-js';
import { track } from '@lib/analytics';

// Re-export all sync modules
export {
  type JournalEntrySync,
  syncJournalEntries,
  saveJournalEntry,
  deleteJournalEntry,
  uploadLocalJournalEntries,
} from './journalSync';

export {
  type DreamEntrySync,
  syncDreamEntries,
  saveDreamEntry,
  deleteDreamEntry,
  uploadLocalDreamEntries,
} from './dreamSync';

export {
  type FavoriteSync,
  syncFavorites,
  saveFavorite,
  removeFavorite,
  uploadLocalFavorites,
} from './favoritesSync';

export {
  type StudyProgressSync,
  syncStudyProgress,
  saveStudyProgress,
  uploadLocalStudyProgress,
} from './studySync';

export {
  type UserPreferencesSync,
  syncUserPreferences,
  saveUserPreferences,
} from './preferencesSync';

// Import for syncAllOnLogin
import { syncJournalEntries, uploadLocalJournalEntries } from './journalSync';
import { syncDreamEntries, uploadLocalDreamEntries } from './dreamSync';
import { syncFavorites, uploadLocalFavorites } from './favoritesSync';
import { syncStudyProgress, uploadLocalStudyProgress } from './studySync';
import { syncUserPreferences } from './preferencesSync';

export const LOGIN_SYNC_ERROR_EVENT = 'mindvanta:login-sync-error';

type SyncTask = {
  name: string;
  run: () => Promise<unknown>;
};

type LoginSyncResult = {
  ok: boolean;
  failedScopes: string[];
};

function reportSyncFailures(failedScopes: string[]): void {
  if (failedScopes.length === 0) {
    return;
  }

  console.error('[sync] login sync failed for scopes:', failedScopes.join(', '));
  track('login_sync_failed', { failed_scopes: failedScopes.join(',') });

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(LOGIN_SYNC_ERROR_EVENT, {
        detail: { failedScopes },
      })
    );
  }
}

async function runSyncTasks(tasks: SyncTask[]): Promise<string[]> {
  const results = await Promise.allSettled(tasks.map(task => task.run()));

  return results.reduce<string[]>((failures, result, index) => {
    if (result.status === 'rejected') {
      failures.push(tasks[index].name);
      console.error(`[sync] ${tasks[index].name} failed`, result.reason);
    }
    return failures;
  }, []);
}

/** When an upload scope fails, skip the matching download so we do not replace local data with incomplete cloud state. */
const UPLOAD_FAILURE_SKIPS_DOWNLOAD: Record<string, string> = {
  journal_upload: 'journal_download',
  dream_upload: 'dream_download',
  favorites_upload: 'favorites_download',
  study_upload: 'study_download',
};

/** @internal Exported for unit tests. */
export function downloadNamesToSkipAfterUploadFailures(uploadFailures: string[]): Set<string> {
  const skip = new Set<string>();
  for (const name of uploadFailures) {
    const download = UPLOAD_FAILURE_SKIPS_DOWNLOAD[name];
    if (download) skip.add(download);
  }
  return skip;
}

/**
 * Sync all data when user logs in.
 * Merges localStorage data with cloud data, preferring newer data.
 */
export async function syncAllOnLogin(user: User): Promise<LoginSyncResult> {
  const uploadFailures = await uploadLocalDataToCloud(user);
  const skipDownloads = downloadNamesToSkipAfterUploadFailures(uploadFailures);

  const downloadTasks: SyncTask[] = [
    { name: 'journal_download', run: () => syncJournalEntries(user) },
    { name: 'dream_download', run: () => syncDreamEntries(user) },
    { name: 'favorites_download', run: () => syncFavorites(user) },
    { name: 'study_download', run: () => syncStudyProgress(user) },
    { name: 'preferences_download', run: () => syncUserPreferences(user) },
  ].filter((t) => !skipDownloads.has(t.name));

  const fetchFailures = await runSyncTasks(downloadTasks);

  const failedScopes = [...uploadFailures, ...fetchFailures];
  reportSyncFailures(failedScopes);

  return {
    ok: failedScopes.length === 0,
    failedScopes,
  };
}

/**
 * Upload local data to cloud on first login
 */
async function uploadLocalDataToCloud(user: User): Promise<string[]> {
  return runSyncTasks([
    { name: 'journal_upload', run: () => uploadLocalJournalEntries(user) },
    { name: 'dream_upload', run: () => uploadLocalDreamEntries(user) },
    { name: 'favorites_upload', run: () => uploadLocalFavorites(user) },
    { name: 'study_upload', run: () => uploadLocalStudyProgress(user) },
  ]);
}
