import type { JournalStats } from '@lib/journalStorage';

export type JournalStatsBarProps = {
  stats: JournalStats;
  onClick: () => void;
};

export function JournalStatsBar({ stats, onClick }: JournalStatsBarProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-xl border border-violet-400/20 hover:border-violet-400/40 transition-all group"
    >
      <div className="flex items-center gap-6">
        {/* Streak */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🔥</span>
          <div className="text-left">
            <p className="text-lg font-light text-white">{stats.currentStreak}</p>
            <p className="text-xs text-white/40">day streak</p>
          </div>
        </div>

        {/* Entries */}
        <div className="flex items-center gap-2">
          <span className="text-xl">📖</span>
          <div className="text-left">
            <p className="text-lg font-light text-white">{stats.totalEntries}</p>
            <p className="text-xs text-white/40">entries</p>
          </div>
        </div>
      </div>

      <svg className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}
