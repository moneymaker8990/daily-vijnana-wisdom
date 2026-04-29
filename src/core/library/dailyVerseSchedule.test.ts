import { describe, expect, it } from 'vitest';
import { DAILY_VERSE_SCHEDULE, getJourneyDailyVerse } from './dailyVerseSchedule';
import { ALL_VERSES, ALL_SOURCES } from './registry';
import { getVerseById, getDailyVerse } from './engine';

const verseIdSet = new Set(ALL_VERSES.map((v) => v.id));

describe('dailyVerseSchedule', () => {
  it('has 365 entries and every id resolves in the registry', () => {
    expect(DAILY_VERSE_SCHEDULE.length).toBe(365);
    for (const id of DAILY_VERSE_SCHEDULE) {
      expect(verseIdSet.has(id)).toBe(true);
      expect(getVerseById(id)).not.toBeNull();
    }
  });

  it('getDailyVerse matches the schedule for sample days', () => {
    for (const d of [1, 2, 100, 365]) {
      const id = DAILY_VERSE_SCHEDULE[d - 1];
      expect(getDailyVerse(d)?.id).toBe(id);
    }
  });

  it('journey day 1 is not Bhagavad Gita (interleave starts after registry offset)', () => {
    const v = getJourneyDailyVerse(1);
    expect(v).not.toBeNull();
    expect(v!.sourceId).not.toBe('bhagavad-gita');
  });

  it('includes verses from many sources (sampler, not Gita-only)', () => {
    const sourceIds = new Set<string>();
    for (const id of DAILY_VERSE_SCHEDULE) {
      const v = getVerseById(id);
      if (v) sourceIds.add(v.sourceId);
    }
    expect(sourceIds.size).toBeGreaterThanOrEqual(ALL_SOURCES.length * 0.5);
  });
});
