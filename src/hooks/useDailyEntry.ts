import { useEffect, useState } from 'react';
import type { DailyEntry } from '../lib/types';
import { getDataSource } from '../lib/dataSource';
import { loadUserState, saveUserState } from '../lib/storage';

export function useDailyEntry() {
  const [entry, setEntry] = useState<DailyEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const ds = getDataSource();
      const state = loadUserState();

      let dayNumber: number;

      if (state) {
        // User has visited before - resume from their last day
        dayNumber = state.currentDay;
      } else {
        // First-time user - always start at Day 1
        dayNumber = 1;
      }

      const e = await ds.getEntryByDay(dayNumber);
      if (e) {
        setEntry(e);
        saveUserState({
          currentDay: dayNumber,
          lastVisited: new Date().toISOString(),
        });
      }
      setLoading(false);
    };

    void init();
  }, []);

  const goToDay = async (dayNumber: number) => {
    const ds = getDataSource();
    const e = await ds.getEntryByDay(dayNumber);
    if (!e) return;
    setEntry(e);
    saveUserState({
      currentDay: dayNumber,
      lastVisited: new Date().toISOString(),
    });
  };

  const goToNext = () => {
    if (!entry) return;
    void goToDay(entry.dayNumber + 1);
  };

  const goToPrev = () => {
    if (!entry) return;
    const target = Math.max(1, entry.dayNumber - 1);
    void goToDay(target);
  };

  const goToToday = async () => {
    // "Today" returns to Day 1 (the starting point for linear progression)
    await goToDay(1);
  };

  return {
    entry,
    loading,
    goToDay,
    goToNext,
    goToPrev,
    goToToday,
  };
}
