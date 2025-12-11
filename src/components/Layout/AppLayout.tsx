import { ReactNode, useState } from 'react';
import { NotificationSettings } from '../NotificationSettings/NotificationSettings';
import { FavoritesPanel } from '../Favorites/FavoritesPanel';
import { TextSizeToggle } from '../Settings/TextSizeControl';
import { Settings } from '../Settings';
import { UserMenu } from '../Auth';

type TabId = 'daily' | 'courses' | 'library' | 'journal' | 'dreams';

type AppLayoutProps = {
  children: ReactNode;
  onGoToDay?: (day: number) => void;
  activeTab?: TabId;
};

const PAGE_TITLES: Record<TabId, string> = {
  daily: "Today's Wisdom",
  courses: 'Study Pathways',
  library: 'Sacred Library',
  journal: 'Personal Journal',
  dreams: 'Dream Journal',
};

export function AppLayout({ children, onGoToDay, activeTab = 'daily' }: AppLayoutProps) {
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [, forceUpdate] = useState({});

  const handleTextSizeChange = () => {
    forceUpdate({});
    // Dispatch a storage event so DayView can react
    window.dispatchEvent(new Event('storage'));
  };

  const pageTitle = PAGE_TITLES[activeTab];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-8 pb-24">
      {/* Ambient glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-violet-400/10 rounded-full blur-2xl" />
      </div>
      
      <div className="relative w-full max-w-3xl glass rounded-3xl p-6 md:p-10">
        <header className="mb-6 md:mb-8">
          {/* Header row with controls and title */}
          <div className="flex items-center justify-between gap-4">
            {/* Left: Controls */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Text size toggle */}
              <TextSizeToggle onChange={handleTextSizeChange} />
              
              {/* Favorites button */}
              <button
                onClick={() => setShowFavorites(true)}
                className="p-2 text-white/40 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                title="Saved Passages"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              {/* Notification settings button */}
              <button
                onClick={() => setShowNotificationSettings(true)}
                className="p-2 text-white/40 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                title="Reminder Settings"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              {/* Settings button */}
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 text-white/40 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                title="Settings"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            {/* Center: Page Title */}
            <h1 className="text-xl md:text-2xl font-serif font-medium tracking-wide text-white text-center flex-1">
              {pageTitle}
            </h1>

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
    </div>
  );
}
