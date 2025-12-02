import { useEffect } from 'react';
import { AppLayout } from './components/Layout/AppLayout';
import { DayView } from './components/DayView/DayView';
import { useDailyEntry } from './hooks/useDailyEntry';
import { startNotificationScheduler, getNotificationSettings } from './lib/notifications';
import { getDataSource } from './lib/dataSource';

function App() {
  const { entry, loading, goToNext, goToPrev, goToToday, goToDay } = useDailyEntry();

  // Start notification scheduler on app load
  useEffect(() => {
    const settings = getNotificationSettings();
    if (settings.enabled) {
      const ds = getDataSource();
      startNotificationScheduler(async () => {
        // Get current day from localStorage
        const stored = localStorage.getItem('vijnana_user_state');
        if (stored) {
          const state = JSON.parse(stored);
          return ds.getEntryByDay(state.currentDay);
        }
        return ds.getEntryByDay(1);
      });
    }

    // Also listen for visibility changes to restart scheduler when app comes to foreground
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const currentSettings = getNotificationSettings();
        if (currentSettings.enabled) {
          const ds = getDataSource();
          startNotificationScheduler(async () => {
            const stored = localStorage.getItem('vijnana_user_state');
            if (stored) {
              const state = JSON.parse(stored);
              return ds.getEntryByDay(state.currentDay);
            }
            return ds.getEntryByDay(1);
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <AppLayout onGoToDay={goToDay}>
      {loading || !entry ? (
        <div className="py-16 text-center">
          <div className="inline-block w-8 h-8 border-2 border-white/30 border-t-white/80 rounded-full animate-spin mb-4" />
          <p className="text-white/60 text-sm">Loading today's entry...</p>
        </div>
      ) : (
        <DayView
          entry={entry}
          onPrev={goToPrev}
          onNext={goToNext}
          onToday={goToToday}
        />
      )}
    </AppLayout>
  );
}

export default App;
