/**
 * Deterministic 365-day schedule of library verse ids for the Daily Verse card.
 * Built from ALL_SOURCES order (cross-tradition interleave) with substantive-verse filters.
 */

import { ALL_SOURCES, ALL_VERSES } from './registry';
import type { Verse } from './types';

function verseHasTeachingDepth(v: Verse): boolean {
  return !!(
    (v.commentary && v.commentary.trim().length > 0) ||
    (v.plainLanguage && v.plainLanguage.trim().length > 0) ||
    (v.reflectionPrompt && v.reflectionPrompt.trim().length > 0) ||
    (v.practiceInstructions && v.practiceInstructions.trim().length > 0)
  );
}

/** Gita ch.1 in this dataset is mostly battlefield roll call / stage-setting. */
function isHeavyGitaChapterOneNarrative(v: Verse): boolean {
  return v.sourceId === 'bhagavad-gita' && v.chapter === 1;
}

function buildPoolForSource(sourceId: string): Verse[] {
  const fromSource = ALL_VERSES.filter((v) => v.sourceId === sourceId);

  let pool = fromSource.filter(
    (v) =>
      v.contentKind !== 'educational_note' &&
      verseHasTeachingDepth(v) &&
      !isHeavyGitaChapterOneNarrative(v)
  );

  if (pool.length === 0) {
    pool = fromSource.filter((v) => v.contentKind !== 'educational_note' && verseHasTeachingDepth(v));
  }

  if (pool.length === 0) {
    pool = fromSource.filter((v) => v.contentKind !== 'educational_note');
  }

  return pool;
}

/**
 * Rotate registry order so day 1 of the year is not always the first registry entry
 * (Bhagavad Gita). Interleaves the same as before, but starts on a different tradition.
 */
function rotatedSourceIds(): string[] {
  const ids = ALL_SOURCES.map((s) => s.id);
  if (ids.length <= 1) return ids;
  /** Start interleave on Tao Te Ching (registry order) instead of Gita so day 1 is not Gita-first. */
  const offset = 1;
  return [...ids.slice(offset), ...ids.slice(0, offset)];
}

function buildDailyVerseSchedule(): readonly string[] {
  const sourceOrder = rotatedSourceIds();
  const bySource = new Map<string, Verse[]>();
  for (const sid of sourceOrder) {
    bySource.set(sid, buildPoolForSource(sid));
  }

  const schedule: string[] = [];
  let round = 0;

  while (schedule.length < 365) {
    let advanced = false;
    for (const sid of sourceOrder) {
      if (schedule.length >= 365) break;
      const pool = bySource.get(sid);
      if (!pool || pool.length === 0) continue;
      advanced = true;
      const idx = (round + schedule.length * 3) % pool.length;
      schedule.push(pool[idx].id);
    }
    if (!advanced) {
      schedule.push('tao-1');
    }
    round++;
  }

  return schedule;
}

export const DAILY_VERSE_SCHEDULE: readonly string[] = buildDailyVerseSchedule();

export const DAILY_VERSE_FALLBACK_ID = 'tao-1';

/**
 * Resolve the Daily Verse card passage for journey day 1–365 (stable ids in `DAILY_VERSE_SCHEDULE`).
 * Implemented here so consumers can import this module directly and stay aligned with the schedule.
 */
export function getJourneyDailyVerse(dayNumber: number): Verse | null {
  if (!Number.isFinite(dayNumber) || dayNumber < 1 || dayNumber > 365) {
    return null;
  }
  const id = DAILY_VERSE_SCHEDULE[dayNumber - 1] ?? DAILY_VERSE_FALLBACK_ID;
  return (
    ALL_VERSES.find((v) => v.id === id) ??
    ALL_VERSES.find((v) => v.id === DAILY_VERSE_FALLBACK_ID) ??
    null
  );
}
