import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { AppLayout } from './components/Layout/AppLayout';
import { DayView } from './components/DayView/DayView';
import { useDailyEntry } from './hooks/useDailyEntry';
import { startNotificationScheduler, getNotificationSettings } from './lib/notifications';
import { getDataSource } from './lib/dataSource';
import { STORAGE_KEYS } from '@lib/constants';
import { TabNavigation, type TabId } from './components/Navigation/TabNavigation';
import { OfflineIndicator } from './components/ui';

const Journal = lazy(() => import('./components/Journal').then(m => ({ default: m.Journal })));
const StudyHub = lazy(() => import('./components/StudyPathways').then(m => ({ default: m.StudyHub })));
const StudyLibrary = lazy(() => import('./components/Study/StudyLibrary').then(m => ({ default: m.StudyLibrary })));
const DreamJournal = lazy(() => import('./components/Dreams/DreamJournal').then(m => ({ default: m.DreamJournal })));

function App() {
  const { entry, loading, goToNext, goToPrev, goToToday, goToDay } = useDailyEntry();
  const [activeTab, setActiveTab] = useState<TabId>('daily');
  const mainContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to top when tab changes
  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    // Scroll the window to top
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Also scroll the main container if it exists
    mainContainerRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Start notification scheduler on app load
  useEffect(() => {
    const settings = getNotificationSettings();
    if (settings.enabled) {
      const ds = getDataSource();
      startNotificationScheduler(async () => {
        // Get current day from localStorage
        const stored = localStorage.getItem(STORAGE_KEYS.USER_STATE);
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
            const stored = localStorage.getItem(STORAGE_KEYS.USER_STATE);
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

  const renderContent = () => {
    switch (activeTab) {
      case 'daily':
        return loading || !entry ? (
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
        );
      
      case 'journal':
        return <Journal />;
      
      case 'courses':
        return <StudyHub />;
      
      case 'library':
        return <StudyLibrary />;

      case 'dreams':
        return <DreamJournal />;
      
      default:
        return null;
    }
  };

  const suspenseFallback = (
    <div className="py-16 text-center">
      <div className="inline-block w-8 h-8 border-2 border-white/30 border-t-white/80 rounded-full animate-spin mb-4" />
      <p className="text-white/60 text-sm">Loading...</p>
    </div>
  );

  return (
    <>
      <OfflineIndicator />
      <AppLayout onGoToDay={goToDay} activeTab={activeTab} containerRef={mainContainerRef}>
        <Suspense fallback={suspenseFallback}>
          {renderContent()}
        </Suspense>
      </AppLayout>

      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </>
  );
}

export default App;
