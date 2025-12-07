import { type ReactNode } from 'react';

export type TabId = 'daily' | 'study' | 'dreams';

type Tab = {
  id: TabId;
  label: string;
  icon: ReactNode;
};

const tabs: Tab[] = [
  {
    id: 'daily',
    label: 'Daily',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    id: 'study',
    label: 'Study',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: 'dreams',
    label: 'Dreams',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
  },
];

type TabNavigationProps = {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
};

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-xl border-t border-white/10 safe-area-pb">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'text-violet-400'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              <span className={activeTab === tab.id ? 'scale-110' : ''}>
                {tab.icon}
              </span>
              <span className="text-xs font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <span className="absolute -bottom-0 w-8 h-0.5 bg-violet-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

