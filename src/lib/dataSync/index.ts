/**
 * Data Sync Layer
 *
 * Syncs data between localStorage (offline) and Supabase (cloud).
 * - When signed in: saves to both localStorage and cloud
 * - When signed out: only uses localStorage
 * - On sign in: merges localStorage data with cloud data
 */

import type { User } from '@supabase/supabase-js';

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

/**
 * Sync all data when user logs in.
 * Merges localStorage data with cloud data, preferring newer data.
 */
export async function syncAllOnLogin(user: User): Promise<void> {
  try {
    // Upload any localStorage data that doesn't exist in cloud
    await uploadLocalDataToCloud(user);

    // Then fetch latest from cloud (will update localStorage)
    await Promise.all([
      syncJournalEntries(user),
      syncDreamEntries(user),
      syncFavorites(user),
      syncStudyProgress(user),
      syncUserPreferences(user),
    ]);
  } catch {
    // Silently handle sync errors
  }
}

/**
 * Upload local data to cloud on first login
 */
async function uploadLocalDataToCloud(user: User): Promise<void> {
  await uploadLocalJournalEntries(user);
  await uploadLocalDreamEntries(user);
  await uploadLocalFavorites(user);
  await uploadLocalStudyProgress(user);
}
