import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { STORAGE_KEYS } from './constants';
import { checkNewMilestone, getStreakData, recordDailyVisit, type StreakData } from './streakTracker';

function setToday(iso: string) {
  vi.setSystemTime(new Date(`${iso}T12:00:00Z`));
}

function seedStreak(data: Partial<StreakData>) {
  const base: StreakData = { current: 0, longest: 0, totalDays: 0, lastVisit: '' };
  localStorage.setItem(STORAGE_KEYS.STREAK_DATA, JSON.stringify({ ...base, ...data }));
}

describe('recordDailyVisit', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts a fresh streak at 1 on first visit', () => {
    setToday('2026-04-19');
    const result = recordDailyVisit();
    expect(result.current).toBe(1);
    expect(result.longest).toBe(1);
    expect(result.totalDays).toBe(1);
    expect(result.lastVisit).toBe('2026-04-19');
  });

  it('is idempotent within the same day', () => {
    setToday('2026-04-19');
    recordDailyVisit();
    const second = recordDailyVisit();
    expect(second.current).toBe(1);
    expect(second.totalDays).toBe(1);
  });

  it('increments streak on consecutive days', () => {
    setToday('2026-04-19');
    recordDailyVisit();
    setToday('2026-04-20');
    const result = recordDailyVisit();
    expect(result.current).toBe(2);
    expect(result.longest).toBe(2);
    expect(result.totalDays).toBe(2);
  });

  it('resets streak when a day is missed', () => {
    seedStreak({ current: 5, longest: 5, totalDays: 10, lastVisit: '2026-04-10' });
    setToday('2026-04-19');
    const result = recordDailyVisit();
    expect(result.current).toBe(1);
    expect(result.longest).toBe(5);
    expect(result.totalDays).toBe(11);
  });
});

describe('checkNewMilestone', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns null when current day is not a milestone', () => {
    expect(checkNewMilestone({ current: 5, longest: 5, totalDays: 5, lastVisit: '2026-04-19' })).toBeNull();
  });

  it('returns milestone data the first time that day is reached', () => {
    const ms = checkNewMilestone({ current: 7, longest: 7, totalDays: 7, lastVisit: '2026-04-19' });
    expect(ms).not.toBeNull();
    expect(ms?.days).toBe(7);
  });

  it('does not return the same milestone twice', () => {
    const first = checkNewMilestone({ current: 3, longest: 3, totalDays: 3, lastVisit: '2026-04-19' });
    const second = checkNewMilestone({ current: 3, longest: 3, totalDays: 3, lastVisit: '2026-04-19' });
    expect(first).not.toBeNull();
    expect(second).toBeNull();
  });
});

describe('getStreakData', () => {
  it('returns zeroed defaults when storage is empty', () => {
    expect(getStreakData()).toEqual({ current: 0, longest: 0, totalDays: 0, lastVisit: '' });
  });

  it('returns parsed data from storage', () => {
    seedStreak({ current: 4, longest: 9, totalDays: 20, lastVisit: '2026-04-10' });
    expect(getStreakData()).toEqual({ current: 4, longest: 9, totalDays: 20, lastVisit: '2026-04-10' });
  });
});
