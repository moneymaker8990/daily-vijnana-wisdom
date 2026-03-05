import { ReactNode, useState, useEffect, useRef, RefObject } from 'react';
import { NotificationSettings } from '../NotificationSettings/NotificationSettings';
import { FavoritesPanel } from '../Favorites/FavoritesPanel';
import { TextSizeToggle } from '../Settings/TextSizeControl';
import { Settings } from '../Settings';
import { UserMenu } from '../Auth';
import { SpiritualGuide } from '../Chat';
import { MeditationScreen } from '../Timer/MeditationScreen';
import { getStreakData } from '@lib/streakTracker';
import { track } from '@lib/analytics';

type TabId = 'daily' | 'courses' | 'library' | 'journal' | 'dreams';

type AppLayoutProps = {
  children: ReactNode;
  onGoToDay?: (day: number) => void;
  activeTab?: TabId;
  containerRef?: RefObject<HTMLDivElement | null>;
};

const PAGE_TITLES: Record<TabId, string> = {
  daily: "Today's Wisdom",
  courses: 'Study Pathways',
  library: 'Sacred Library',
  journal: 'Personal Journal',
  dreams: 'Dream Journal',
};

export function AppLayout({ children, onGoToDay, activeTab = 'daily', containerRef }: AppLayoutProps) {
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSpiritualGuide, setShowSpiritualGuide] = useState(false);
  const [showMeditation, setShowMeditation] = useState(false);
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  const [, forceUpdate] = useState({});
  const streakData = getStreakData();
  const headerMenuRef = useRef<HTMLDivElement>(null);

  // Escape key closes whichever modal is open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showHeaderMenu) setShowHeaderMenu(false);
        else if (showMeditation) setShowMeditation(false);
        else if (showSpiritualGuide) setShowSpiritualGuide(false);
        else if (showFavorites) setShowFavorites(false);
        else if (showSettings) setShowSettings(false);
        else if (showNotificationSettings) setShowNotificationSettings(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showHeaderMenu, showMeditation, showSpiritualGuide, showFavorites, showSettings, showNotificationSettings]);

  // Close header menu on outside click
  useEffect(() => {
    if (!showHeaderMenu) return;
    const handler = (e: MouseEvent) => {
      if (headerMenuRef.current && !headerMenuRef.current.contains(e.target as Node)) {
        setShowHeaderMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showHeaderMenu]);

  const handleTextSizeChange = () => {
    forceUpdate({});
    window.dispatchEvent(new Event('storage'));
  };

  const handleInvite = async () => {
    const inviteMessage = 'Join me on MindVanta for daily wisdom, reflection, and spiritual practice.';
    const inviteUrl = 'https://mindvanta.io';
    track('referral_invite_open', { surface: 'app_header' });

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MindVanta',
          text: inviteMessage,
          url: inviteUrl,
        });
        track('referral_share_success', { channel: 'native_share' });
      } catch {
        track('referral_share_cancel', { channel: 'native_share' });
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(`${inviteMessage} ${inviteUrl}`);
      track('referral_share_success', { channel: 'clipboard' });
    } catch {
      track('referral_share_fail', { channel: 'clipboard' });
    }
  };

  const pageTitle = PAGE_TITLES[activeTab];

  return (
    <div ref={containerRef} className="min-h-screen flex items-start justify-center px-2 sm:px-4 pt-3 sm:pt-8 pb-28 sm:pb-24">
      {/* Ambient glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-violet-400/10 rounded-full blur-2xl" />
      </div>

      <div className="relative w-full max-w-3xl glass rounded-2xl sm:rounded-3xl p-3 sm:p-6 md:p-10 overflow-hidden">
        <header className="mb-4 sm:mb-6 md:mb-8">
          {/* Header row with controls and title */}
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: Hamburger menu on mobile, full controls on sm+ */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Mobile hamburger menu */}
              <div className="relative sm:hidden" ref={headerMenuRef}>
                <button
                  onClick={() => setShowHeaderMenu(!showHeaderMenu)}
                  className="p-2 text-white/50 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Menu"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {showHeaderMenu && (
                  <div className="absolute left-0 top-full mt-1 w-52 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 animate-fadeIn">
                    <button
                      onClick={() => { setShowHeaderMenu(false); setShowFavorites(true); }}
                      className="w-full px-4 py-3 text-left text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Saved Passages
                    </button>
                    <button
                      onClick={() => { setShowHeaderMenu(false); setShowNotificationSettings(true); }}
                      className="w-full px-4 py-3 text-left text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      Reminders
                    </button>
                    <button
                      onClick={() => { setShowHeaderMenu(false); setShowSettings(true); }}
                      className="w-full px-4 py-3 text-left text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </button>
                    <button
                      onClick={() => { setShowHeaderMenu(false); void handleInvite(); }}
                      className="w-full px-4 py-3 text-left text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C9.886 12.56 11.654 11.5 13.316 10.658m0 0C14.114 10.27 15.886 9.44 17.1 8.66m-3.784 1.998a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zm-8.632 5.184a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zm12.632 5.184a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
                      </svg>
                      Invite a Friend
                    </button>
                    <div className="border-t border-white/10 px-4 py-3">
                      <TextSizeToggle onChange={() => { handleTextSizeChange(); setShowHeaderMenu(false); }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop controls — hidden on mobile */}
              <div className="hidden sm:flex items-center gap-1">
                <TextSizeToggle onChange={handleTextSizeChange} />

                <button
                  onClick={() => setShowFavorites(true)}
                  className="p-2 text-white/40 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                  title="Saved Passages"
                  aria-label="Saved passages"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                <button
                  onClick={() => setShowNotificationSettings(true)}
                  className="p-2 text-white/40 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                  title="Reminder Settings"
                  aria-label="Reminder settings"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>

                <button
                  onClick={() => setShowSettings(true)}
                  className="p-2 text-white/40 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                  title="Settings"
                  aria-label="Settings"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>

                <button
                  onClick={() => void handleInvite()}
                  className="p-2 text-white/40 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                  title="Invite a Friend"
                  aria-label="Invite a friend"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C9.886 12.56 11.654 11.5 13.316 10.658m0 0C14.114 10.27 15.886 9.44 17.1 8.66m-3.784 1.998a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zm-8.632 5.184a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zm12.632 5.184a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Center: Page Title + Streak */}
            <div className="flex items-center justify-center gap-2 flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-serif font-medium tracking-wide text-white text-center truncate">
                {pageTitle}
              </h1>
              {streakData.current > 0 && (
                <span className="flex items-center gap-0.5 text-xs bg-orange-500/15 text-orange-300/90 px-1.5 py-0.5 rounded-full border border-orange-400/20 flex-shrink-0" title={`${streakData.current} day streak`}>
                  🔥 {streakData.current}
                </span>
              )}
            </div>

            {/* Right: User Menu */}
            <div className="flex-shrink-0">
              <UserMenu />
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>

      {/* Notification settings modal */}
      {showNotificationSettings && (
        <NotificationSettings onClose={() => setShowNotificationSettings(false)} />
      )}

      {/* Favorites panel */}
      <FavoritesPanel
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        onGoToDay={onGoToDay || (() => {})}
      />

      {/* Settings modal */}
      {showSettings && (
        <Settings onClose={() => setShowSettings(false)} />
      )}

      {/* Meditation floating button */}
      <button
        onClick={() => setShowMeditation(true)}
        className="fixed bottom-[4.5rem] left-3 z-40 w-12 h-12 sm:w-14 sm:h-14 sm:bottom-20 sm:left-4 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full shadow-lg shadow-indigo-500/30 flex items-center justify-center text-white hover:scale-105 transition-transform"
        title="Meditation Timer"
        aria-label="Open meditation timer"
      >
        <span className="text-xl sm:text-2xl">🧘</span>
      </button>

      {/* Spiritual Guide floating button */}
      <button
        onClick={() => setShowSpiritualGuide(true)}
        className="fixed bottom-[4.5rem] right-3 z-40 w-12 h-12 sm:w-14 sm:h-14 sm:bottom-20 sm:right-4 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full shadow-lg shadow-violet-500/30 flex items-center justify-center text-white hover:scale-105 transition-transform"
        title="Ask the Spiritual Guide"
        aria-label="Ask the spiritual guide"
      >
        <span className="text-xl sm:text-2xl">🙏</span>
      </button>

      {/* Meditation screen */}
      {showMeditation && (
        <MeditationScreen onClose={() => setShowMeditation(false)} />
      )}

      {/* Spiritual Guide chat */}
      {showSpiritualGuide && (
        <SpiritualGuide onClose={() => setShowSpiritualGuide(false)} />
      )}
    </div>
  );
}
