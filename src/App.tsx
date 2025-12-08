import { useEffect, useState } from 'react';
import { AppLayout } from './components/Layout/AppLayout';
import { DayView } from './components/DayView/DayView';
import { useDailyEntry } from './hooks/useDailyEntry';
import { startNotificationScheduler, getNotificationSettings } from './lib/notifications';
import { getDataSource } from './lib/dataSource';
import { TabNavigation, type TabId } from './components/Navigation/TabNavigation';
import { StudyHub } from './components/StudyPathways';
import { StudyLibrary } from './components/Study/StudyLibrary';
import { DreamJournal } from './components/Dreams/DreamJournal';

function App() {
  const { entry, loading, goToNext, goToPrev, goToToday, goToDay } = useDailyEntry();
  const [activeTab, setActiveTab] = useState<TabId>('daily');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

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

  // For now, everyone is premium (until subscription is set up)
  const isPremium = true;

  const handleUpgrade = () => {
    setShowUpgradeModal(true);
  };

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
      
      case 'courses':
        return <StudyHub />;
      
      case 'library':
        return (
          <StudyLibrary
            isPremium={isPremium}
            onUpgrade={handleUpgrade}
          />
        );
      
      case 'dreams':
        return (
          <DreamJournal
            isPremium={isPremium}
            onUpgrade={handleUpgrade}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <AppLayout onGoToDay={goToDay} activeTab={activeTab}>
        {renderContent()}
      </AppLayout>
      
      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <UpgradeModal onClose={() => setShowUpgradeModal(false)} />
      )}
    </>
  );
}

function UpgradeModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-6 border border-white/10 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors rounded-lg hover:bg-white/10"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
            <span className="text-3xl">✨</span>
          </div>
          
          <h2 className="text-2xl font-serif text-white mb-2">
            Unlock Premium
          </h2>
          <p className="text-white/60 mb-6">
            Get full access to all features
          </p>

          {/* Features */}
          <div className="space-y-3 mb-6 text-left">
            {[
              'Complete Sacred Text Library',
              'AI-Powered Dream Interpretations',
              'Unlimited Favorites',
              'Custom Reminder Times',
              'Offline Access',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-sm">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white/80">{feature}</span>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <div className="flex items-baseline justify-center gap-1 mb-1">
              <span className="text-3xl font-bold text-white">$4.99</span>
              <span className="text-white/50">/month</span>
            </div>
            <p className="text-xs text-white/40">or $39.99/year (save 33%)</p>
          </div>

          {/* CTA */}
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-xl text-white font-medium shadow-lg shadow-amber-500/25 transition-all hover:scale-105"
          >
            Coming Soon
          </button>
          <p className="mt-3 text-xs text-white/40">
            Subscriptions will be available when the app launches on the App Store
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
