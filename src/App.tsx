import { useEffect, useState, useRef, useCallback, lazy, Suspense } from 'react';
import { AppLayout } from './components/Layout/AppLayout';
import { AssistantProvider } from './components/Assistants';
import { DayView } from './components/DayView/DayView';
import { useDailyEntry } from './hooks/useDailyEntry';
import { startNotificationScheduler, getNotificationSettings } from './lib/notifications';
import { getDataSource } from './lib/dataSource';
import { STORAGE_KEYS } from '@lib/constants';
import { loadUserState } from './lib/storage';
import { TabNavigation, type TabId } from './components/Navigation/TabNavigation';
import { OfflineIndicator, PaywallModal, ReviewPromptModal, useToast } from './components/ui';
import { OnboardingFlow } from './components/Onboarding/OnboardingFlow';
import { MilestoneModal } from './components/ui/MilestoneModal';
import { recordDailyVisit, checkNewMilestone } from './lib/streakTracker';
import { track } from './lib/analytics';
import {
  getPaywallTriggerContext,
  hasPremiumAccess,
  purchasePremium,
  restorePurchases,
  shouldGateTab,
  syncEntitlements,
} from './lib/subscription';
import {
  getValueMomentInputs,
  markReviewPromptAccepted,
  markReviewPromptDismissedForever,
  markReviewPromptShown,
  shouldShowReviewPrompt,
} from './lib/reviewPrompt';
import { supabase } from './lib/supabase';
import { signInWithGoogle } from './lib/auth';

const Journal = lazy(() => import('./components/Journal').then(m => ({ default: m.Journal })));
const StudyHub = lazy(() => import('./components/StudyPathways').then(m => ({ default: m.StudyHub })));
const StudyLibrary = lazy(() => import('./components/Study/StudyLibrary').then(m => ({ default: m.StudyLibrary })));
const DreamJournal = lazy(() => import('./components/Dreams/DreamJournal').then(m => ({ default: m.DreamJournal })));
const FIRST_JOURNAL_TRACKED_KEY = 'mindvanta_first_journal_tracked';
const FIRST_DREAM_TRACKED_KEY = 'mindvanta_first_dream_tracked';
const NUDGE_SHOWN_PREFIX = 'mindvanta_weekly_nudge_';

function App() {
  const { entry, loading, goToNext, goToPrev, goToToday, goToDay, userCurrentDay } = useDailyEntry();
  const { info, error: showError } = useToast();
  const [activeTab, setActiveTab] = useState<TabId>('daily');
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const onboardingStartTracked = useRef(false);
  const sessionStartedAt = useRef<number>(Date.now());
  const [showOnboarding, setShowOnboarding] = useState(
    () => !localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE)
  );
  const [premiumEnabled, setPremiumEnabled] = useState<boolean>(() => hasPremiumAccess());
  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallBusy, setPaywallBusy] = useState(false);
  const [paywallContext, setPaywallContext] = useState('generic');
  const [showReviewPrompt, setShowReviewPrompt] = useState(false);
  const [milestone, setMilestone] = useState<{ days: number; title: string; message: string } | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsSignedIn(!!data.session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const checkout = params.get('checkout');
    if (!checkout) return;

    window.history.replaceState({}, '', window.location.pathname);

    if (checkout === 'success') {
      syncEntitlements().then((state) => {
        setPremiumEnabled(state.tier === 'premium');
        if (state.tier === 'premium') {
          info('Premium unlocked — welcome aboard!');
          track('purchase_success', { trigger: 'stripe_checkout_return' });
        } else {
          info('Payment received — your subscription is being activated.');
          track('checkout_success_sync_pending');
        }
      });
    } else if (checkout === 'cancelled') {
      info('Checkout cancelled. You can upgrade any time.');
      track('checkout_cancelled');
    }
  }, []);

  const maybeOpenReviewPrompt = () => {
    const inputs = getValueMomentInputs();

    if (inputs.journalEntries > 0 && !localStorage.getItem(FIRST_JOURNAL_TRACKED_KEY)) {
      localStorage.setItem(FIRST_JOURNAL_TRACKED_KEY, 'true');
      track('first_journal_entry');
    }

    if (inputs.dreamEntries > 0 && !localStorage.getItem(FIRST_DREAM_TRACKED_KEY)) {
      localStorage.setItem(FIRST_DREAM_TRACKED_KEY, 'true');
      track('first_dream_entry');
    }

    if (shouldShowReviewPrompt(inputs)) {
      markReviewPromptShown();
      setShowReviewPrompt(true);
      track('review_prompt_shown', {
        streak_days: inputs.streakDays,
        journal_entries: inputs.journalEntries,
        dream_entries: inputs.dreamEntries,
      });
    }
  };

  // Scroll to top when tab changes
  const handleTabChange = (tab: TabId) => {
    if (shouldGateTab(tab)) {
      const trigger = getPaywallTriggerContext(tab);
      setPaywallContext(trigger);
      setShowPaywall(true);
      track('paywall_view', { trigger, tab_id: tab });
      return;
    }

    setActiveTab(tab);
    track('tab_view', { tab_id: tab });
    // Scroll the window to top
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Also scroll the main container if it exists
    mainContainerRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Record daily visit and check for milestones
  useEffect(() => {
    if (showOnboarding) return;
    const streak = recordDailyVisit();
    const m = checkNewMilestone(streak);

    if (streak.current >= 2 && streak.current <= 4) {
      const nudgeKey = `${NUDGE_SHOWN_PREFIX}${streak.current}`;
      if (!localStorage.getItem(nudgeKey)) {
        info('Great consistency. Keep your daily rhythm going this week.');
        localStorage.setItem(nudgeKey, 'true');
      }
    }

    if (m) {
      setMilestone(m);
      track('streak_milestone', { days: m.days, title: m.title });

      if (m.days >= 7 && !premiumEnabled) {
        setPaywallContext('streak_7_value_moment');
        setShowPaywall(true);
        track('paywall_view', { trigger: 'streak_7_value_moment' });
      }
    }
    maybeOpenReviewPrompt();
  }, [showOnboarding]);

  const handleOnboardingComplete = () => {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, 'true');
    track('onboarding_complete');
    setShowOnboarding(false);
  };

  useEffect(() => {
    if (showOnboarding && !onboardingStartTracked.current) {
      onboardingStartTracked.current = true;
      track('onboarding_start', { entry_point: 'first_run' });
    }
  }, [showOnboarding]);

  useEffect(() => {
    if (!showOnboarding) {
      maybeOpenReviewPrompt();
    }
  }, [showOnboarding, activeTab]);

  useEffect(() => {
    syncEntitlements().then((state) => {
      setPremiumEnabled(state.tier === 'premium');
    });
  }, []);

  const handleActivatePremium = async () => {
    setPaywallBusy(true);
    const result = await purchasePremium();
    setPaywallBusy(false);

    if (result.redirectUrl) {
      track('paywall_cta_click', { trigger: paywallContext, mode: 'stripe' });
      window.location.href = result.redirectUrl;
      return;
    }

    if (result.ok) {
      setPremiumEnabled(true);
      setShowPaywall(false);
      info('Premium unlocked successfully.');
      track('paywall_cta_click', { trigger: paywallContext, mode: result.state.source ?? 'unknown' });
      track('trial_start', { trigger: paywallContext, product_id: result.state.productId ?? 'default' });
      track('purchase_success', { trigger: paywallContext, product_id: result.state.productId ?? 'default' });
      return;
    }

    track('purchase_fail', { trigger: paywallContext, reason: result.error ?? 'unknown' });
    info(result.error || 'Purchase could not be completed. Please try again.');
  };

  const handleRestorePurchases = async () => {
    setPaywallBusy(true);
    const result = await restorePurchases();
    setPaywallBusy(false);
    if (result.ok) {
      setPremiumEnabled(true);
      setShowPaywall(false);
      info('Purchases restored.');
      track('restore_success', { source: result.state.source ?? 'unknown' });
      return;
    }
    info(result.error ?? 'No purchases to restore.');
    track('restore_fail', { reason: result.error ?? 'unknown' });
  };

  const handlePaywallSignIn = useCallback(async () => {
    setPaywallBusy(true);
    const { error } = await signInWithGoogle();
    setPaywallBusy(false);
    if (error) {
      showError('Sign-in failed. Please try again.');
      track('paywall_signin_fail', { reason: error.message });
    }
  }, [showError]);

  const handleReviewRateNow = () => {
    markReviewPromptAccepted();
    setShowReviewPrompt(false);
    track('review_prompt_accepted');
    window.open('https://mindvanta.io', '_blank', 'noopener,noreferrer');
  };

  const handleReviewLater = () => {
    setShowReviewPrompt(false);
    track('review_prompt_later');
  };

  const handleReviewNoThanks = () => {
    markReviewPromptDismissedForever();
    setShowReviewPrompt(false);
    track('review_prompt_dismissed');
  };

  // Start notification scheduler on app load
  useEffect(() => {
    const settings = getNotificationSettings();
    if (settings.enabled) {
      track('notification_enabled', { source: 'app_load' });
    }
    if (settings.enabled) {
      const ds = getDataSource();
      startNotificationScheduler(async () => {
        const state = loadUserState();
        return ds.getEntryByDay(state?.currentDay ?? 1);
      });
    }

    // Also listen for visibility changes to restart scheduler when app comes to foreground
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const currentSettings = getNotificationSettings();
        if (currentSettings.enabled) {
          const ds = getDataSource();
          startNotificationScheduler(async () => {
            const state = loadUserState();
            return ds.getEntryByDay(state?.currentDay ?? 1);
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    return () => {
      const seconds = Math.round((Date.now() - sessionStartedAt.current) / 1000);
      track('session_duration', {
        seconds,
        bucket: seconds > 180 ? 'gt_180' : seconds >= 60 ? '60_180' : 'lt_60',
      });
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
            userCurrentDay={userCurrentDay}
            onPrev={goToPrev}
            onNext={goToNext}
            onToday={goToToday}
            onGoToDay={goToDay}
            onOpenLibrary={() => handleTabChange('library')}
            onNavigateTab={(tab) => handleTabChange(tab)}
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

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <AssistantProvider>
      <OfflineIndicator />
      <AppLayout onGoToDay={goToDay} activeTab={activeTab} containerRef={mainContainerRef}>
        <div className="app-content-bottom-safe">
          <Suspense fallback={suspenseFallback}>
            {renderContent()}
          </Suspense>
        </div>
      </AppLayout>

      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} hasPremiumAccess={premiumEnabled} />

      {milestone && (
        <MilestoneModal
          days={milestone.days}
          title={milestone.title}
          message={milestone.message}
          onDismiss={() => setMilestone(null)}
        />
      )}

      <PaywallModal
        isOpen={showPaywall}
        isBusy={paywallBusy}
        isSignedIn={isSignedIn}
        triggerContext={paywallContext}
        onActivate={handleActivatePremium}
        onRestore={handleRestorePurchases}
        onSignIn={handlePaywallSignIn}
        onClose={() => {
          setShowPaywall(false);
          track('paywall_close_no_action', { trigger: paywallContext });
        }}
      />

      <ReviewPromptModal
        isOpen={showReviewPrompt}
        onRateNow={handleReviewRateNow}
        onLater={handleReviewLater}
        onNoThanks={handleReviewNoThanks}
      />
    </AssistantProvider>
  );
}

export default App;
