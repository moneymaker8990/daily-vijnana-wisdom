import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { STORAGE_KEYS } from './constants';
import {
  getValueMomentInputs,
  markReviewPromptAccepted,
  markReviewPromptDismissedForever,
  markReviewPromptShown,
  shouldShowReviewPrompt,
} from './reviewPrompt';

function setClock(iso: string) {
  vi.setSystemTime(new Date(iso));
}

describe('shouldShowReviewPrompt', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setClock('2026-04-19T10:00:00Z');
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not show when below all thresholds', () => {
    expect(
      shouldShowReviewPrompt({ streakDays: 0, journalEntries: 0, dreamEntries: 0 })
    ).toBe(false);
  });

  it('shows when streak threshold met', () => {
    expect(
      shouldShowReviewPrompt({ streakDays: 7, journalEntries: 0, dreamEntries: 0 })
    ).toBe(true);
  });

  it('shows when journal threshold met', () => {
    expect(
      shouldShowReviewPrompt({ streakDays: 0, journalEntries: 3, dreamEntries: 0 })
    ).toBe(true);
  });

  it('shows when dream threshold met', () => {
    expect(
      shouldShowReviewPrompt({ streakDays: 0, journalEntries: 0, dreamEntries: 2 })
    ).toBe(true);
  });

  it('never shows again after accepted', () => {
    markReviewPromptAccepted();
    expect(
      shouldShowReviewPrompt({ streakDays: 30, journalEntries: 10, dreamEntries: 10 })
    ).toBe(false);
  });

  it('never shows again after permanent dismissal', () => {
    markReviewPromptDismissedForever();
    expect(
      shouldShowReviewPrompt({ streakDays: 30, journalEntries: 10, dreamEntries: 10 })
    ).toBe(false);
  });

  it('respects the 14-day cooldown after shown', () => {
    markReviewPromptShown();
    expect(
      shouldShowReviewPrompt({ streakDays: 30, journalEntries: 10, dreamEntries: 10 })
    ).toBe(false);

    setClock('2026-05-05T10:00:00Z');
    expect(
      shouldShowReviewPrompt({ streakDays: 30, journalEntries: 10, dreamEntries: 10 })
    ).toBe(true);
  });
});

describe('getValueMomentInputs', () => {
  it('reads current counts from localStorage', () => {
    localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify([{ id: 1 }, { id: 2 }]));
    localStorage.setItem(STORAGE_KEYS.DREAMS, JSON.stringify([{ id: 1 }]));
    localStorage.setItem(STORAGE_KEYS.STREAK_DATA, JSON.stringify({ current: 5 }));

    expect(getValueMomentInputs()).toEqual({
      streakDays: 5,
      journalEntries: 2,
      dreamEntries: 1,
    });
  });

  it('falls back to zeros on corrupt data', () => {
    localStorage.setItem(STORAGE_KEYS.JOURNAL, 'not-json');
    localStorage.setItem(STORAGE_KEYS.DREAMS, 'not-json');
    localStorage.setItem(STORAGE_KEYS.STREAK_DATA, 'not-json');
    expect(getValueMomentInputs()).toEqual({
      streakDays: 0,
      journalEntries: 0,
      dreamEntries: 0,
    });
  });
});
