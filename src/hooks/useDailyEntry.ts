import { useEffect, useState } from 'react';
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

export function useDailyEntry() {
  const [entry, setEntry] = useState<DailyEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [userCurrentDay, setUserCurrentDay] = useState(1);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const ds = getDataSource();
      const state = loadUserState();
      
      // Check if there's a day in the URL (from shared link)
      const urlDay = getDayFromUrl();
      
      let dayNumber: number;
      let actualCurrentDay: number; // The user's real progress

      if (state) {
        // Calculate days passed since last visit
        const daysPassed = daysSince(state.lastVisited);
        
        // Auto-advance: add days passed to their current day (max 365)
        actualCurrentDay = Math.min(365, state.currentDay + daysPassed);
        
        // If URL has a specific day, show that; otherwise show user's current day
        dayNumber = urlDay ?? actualCurrentDay;
      } else {
        // First-time user - start at Day 1
        actualCurrentDay = 1;
        dayNumber = urlDay ?? 1;
      }

      // Clear URL parameter after reading
      if (urlDay) {
        clearDayFromUrl();
      }

      let e = await ds.getEntryByDay(dayNumber);
      
      // If requested day doesn't exist, fall back to day 1
      if (!e) {
        e = await ds.getEntryByDay(1);
        dayNumber = 1;
      }
      
      if (e) {
        setEntry(e);
        setUserCurrentDay(actualCurrentDay);
        
        // Save the user's actual progress (not the viewed day from URL)
        saveUserState({
          currentDay: actualCurrentDay,
          lastVisited: new Date().toISOString(),
        });
      }
      setLoading(false);
    };

    void init();
  }, []);

  const goToDay = async (day: number) => {
    const ds = getDataSource();
    let e = await ds.getEntryByDay(day);
    
    // If requested day doesn't exist, stay on current entry
    if (!e) {
      return;
    }
    
    setEntry(e);
    
    // If navigating beyond current progress, update progress
    if (day > userCurrentDay) {
      setUserCurrentDay(day);
      saveUserState({
        currentDay: day,
        lastVisited: new Date().toISOString(),
      });
    }
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
    // "Today" goes to the user's current day in their journey
    await goToDay(userCurrentDay);
  };

  return {
    entry,
    loading,
    goToDay,
    goToNext,
    goToPrev,
    goToToday,
    userCurrentDay, // Expose user's actual progress
  };
}
