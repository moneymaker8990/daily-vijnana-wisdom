import { useCallback, useEffect, useRef, useState } from 'react';
import type { DailyEntry } from '../lib/types';
import { getDataSource } from '../lib/dataSource';
import { loadUserState, saveUserState } from '../lib/storage';

// Calculate how many days have passed since a date
function daysSince(isoDate: string): number {
  const lastDate = new Date(isoDate);
  const today = new Date();

  // Reset to midnight for accurate day comparison
  lastDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - lastDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(0, diffDays);
}

function localDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// Get day from URL query parameter
function getDayFromUrl(): number | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const dayParam = params.get('day');
  if (dayParam) {
    const day = parseInt(dayParam, 10);
    if (!isNaN(day) && day >= 1 && day <= 365) {
      return day;
    }
  }
  return null;
}

// Clear the day parameter from URL without reload
function clearDayFromUrl() {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  url.searchParams.delete('day');
  window.history.replaceState({}, '', url.pathname);
}

type ProgressSnapshot = {
  actualCurrentDay: number;
  dayNumberToShow: number;
};

function computeProgress(urlDay: number | null): ProgressSnapshot {
  const state = loadUserState();

  let actualCurrentDay: number;
  let dayNumberToShow: number;

  if (state) {
    const daysPassed = daysSince(state.lastVisited);
    actualCurrentDay = Math.min(365, state.currentDay + daysPassed);
    dayNumberToShow = urlDay ?? actualCurrentDay;
  } else {
    actualCurrentDay = 1;
    dayNumberToShow = urlDay ?? 1;
  }

  return { actualCurrentDay, dayNumberToShow };
}

export function useDailyEntry() {
  const [entry, setEntry] = useState<DailyEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [userCurrentDay, setUserCurrentDay] = useState(1);

  const entryRef = useRef<DailyEntry | null>(null);
  const userCurrentDayRef = useRef(1);
  const initialSyncDoneRef = useRef(false);
  const calendarKeyRef = useRef<string | null>(null);

  entryRef.current = entry;
  userCurrentDayRef.current = userCurrentDay;

  const runInitialSync = useCallback(async () => {
    setLoading(true);
    const ds = getDataSource();
    const urlDay = getDayFromUrl();
    const { actualCurrentDay, dayNumberToShow } = computeProgress(urlDay);

    if (urlDay) {
      clearDayFromUrl();
    }

    let dayNumber = dayNumberToShow;
    let e = await ds.getEntryByDay(dayNumber);

    if (!e) {
      e = await ds.getEntryByDay(1);
      dayNumber = 1;
    }

    if (e) {
      setEntry(e);
      setUserCurrentDay(actualCurrentDay);
      saveUserState({
        currentDay: actualCurrentDay,
        lastVisited: new Date().toISOString(),
      });
    }
    setLoading(false);
    calendarKeyRef.current = localDateKey(new Date());
  }, []);

  const runResync = useCallback(async () => {
    if (!initialSyncDoneRef.current) return;

    const ds = getDataSource();
    const { actualCurrentDay } = computeProgress(null);

    const prevEntryDay = entryRef.current?.dayNumber ?? null;
    const prevUserDay = userCurrentDayRef.current;

    if (prevEntryDay !== null && prevEntryDay === prevUserDay && actualCurrentDay > prevUserDay) {
      let e = await ds.getEntryByDay(actualCurrentDay);
      if (!e) {
        e = await ds.getEntryByDay(1);
      }
      if (e) {
        setEntry(e);
        setUserCurrentDay(actualCurrentDay);
        saveUserState({
          currentDay: actualCurrentDay,
          lastVisited: new Date().toISOString(),
        });
      }
      calendarKeyRef.current = localDateKey(new Date());
      return;
    }

    if (actualCurrentDay !== prevUserDay) {
      setUserCurrentDay(actualCurrentDay);
      saveUserState({
        currentDay: actualCurrentDay,
        lastVisited: new Date().toISOString(),
      });
    }
    calendarKeyRef.current = localDateKey(new Date());
  }, []);

  useEffect(() => {
    let alive = true;

    void (async () => {
      await runInitialSync();
      if (alive) {
        initialSyncDoneRef.current = true;
      }
    })();

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        void runResync();
      }
    };

    const onFocus = () => {
      void runResync();
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('focus', onFocus);

    const intervalId = window.setInterval(() => {
      const k = localDateKey(new Date());
      if (calendarKeyRef.current !== null && k !== calendarKeyRef.current) {
        void runResync();
      }
    }, 60_000);

    return () => {
      alive = false;
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('focus', onFocus);
      window.clearInterval(intervalId);
    };
  }, [runInitialSync, runResync]);

  const goToDay = async (day: number) => {
    const ds = getDataSource();
    const e = await ds.getEntryByDay(day);

    if (!e) {
      return;
    }

    setEntry(e);

    const prevUser = userCurrentDayRef.current;
    const nextUserCurrentDay = day > prevUser ? day : prevUser;
    if (nextUserCurrentDay !== prevUser) {
      setUserCurrentDay(nextUserCurrentDay);
    }

    saveUserState({
      currentDay: nextUserCurrentDay,
      lastVisited: new Date().toISOString(),
    });
  };

  const goToNext = () => {
    if (!entry) return;
    const nextDay = Math.min(365, entry.dayNumber + 1);
    void goToDay(nextDay);
  };

  const goToPrev = () => {
    if (!entry) return;
    const target = Math.max(1, entry.dayNumber - 1);
    void goToDay(target);
  };

  const goToToday = async () => {
    await goToDay(userCurrentDayRef.current);
  };

  return {
    entry,
    loading,
    goToDay,
    goToNext,
    goToPrev,
    goToToday,
    userCurrentDay,
  };
}
