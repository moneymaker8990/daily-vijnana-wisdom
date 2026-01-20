import { type JournalStats as JournalStatsType, type MoodType } from '@lib/journalStorage';
import { moodInfo } from '@data/journalPrompts';

type JournalStatsProps = {
  stats: JournalStatsType;
  onClose: () => void;
};

export function JournalStats({ stats, onClose }: JournalStatsProps) {
  // Get top 3 moods
  const topMoods = Object.entries(stats.moodDistribution)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  
  const totalMoodEntries = Object.values(stats.moodDistribution).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>
        <h2 className="text-lg font-serif text-white">Your Journey</h2>
        <div className="w-16" />
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-2 gap-4">
        {/* Current Streak */}
        <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl p-5 border border-amber-400/20 text-center">
          <div className="text-4xl mb-2">🔥</div>
          <p className="text-3xl font-light text-white">{stats.currentStreak}</p>
          <p className="text-sm text-white/50">Day streak</p>
        </div>
        
        {/* Total Entries */}
        <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-2xl p-5 border border-violet-400/20 text-center">
          <div className="text-4xl mb-2">📖</div>
          <p className="text-3xl font-light text-white">{stats.totalEntries}</p>
          <p className="text-sm text-white/50">Total entries</p>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
          <p className="text-2xl font-light text-white">{stats.longestStreak}</p>
          <p className="text-xs text-white/40">Best streak</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
          <p className="text-2xl font-light text-white">{stats.totalWords.toLocaleString()}</p>
          <p className="text-xs text-white/40">Words written</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
          <p className="text-2xl font-light text-white">{stats.avgWordsPerEntry}</p>
          <p className="text-xs text-white/40">Avg words</p>
        </div>
      </div>

      {/* Mood Distribution */}
      {totalMoodEntries > 0 && (
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
          <h3 className="text-white font-medium mb-4 flex items-center gap-2">
            <span>😊</span>
            <span>Mood Patterns</span>
          </h3>
          
          <div className="space-y-3">
            {topMoods.map(([mood, count]) => {
              const info = moodInfo[mood as MoodType];
              const percentage = Math.round((count / totalMoodEntries) * 100);
              
              return (
                <div key={mood} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span>{info.icon}</span>
                      <span className="text-white/80">{info.label}</span>
                    </div>
                    <span className="text-white/50">{count} entries ({percentage}%)</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* All moods summary */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
            {Object.entries(stats.moodDistribution)
              .filter(([_, count]) => count > 0)
              .map(([mood, count]) => {
                const info = moodInfo[mood as MoodType];
                return (
                  <span
                    key={mood}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${info.color}`}
                  >
                    <span>{info.icon}</span>
                    <span className="text-white/70">{count}</span>
                  </span>
                );
              })}
          </div>
        </div>
      )}

      {/* Top Tags */}
      {stats.mostUsedTags.length > 0 && (
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
          <h3 className="text-white font-medium mb-4 flex items-center gap-2">
            <span>🏷️</span>
            <span>Top Tags</span>
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {stats.mostUsedTags.map(({ tag, count }) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-violet-500/20 text-violet-300 rounded-full text-sm"
              >
                <span>#{tag}</span>
                <span className="text-violet-300/50 text-xs">×{count}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Monthly Activity */}
      {Object.keys(stats.entriesByMonth).length > 0 && (
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
          <h3 className="text-white font-medium mb-4 flex items-center gap-2">
            <span>📅</span>
            <span>Monthly Activity</span>
          </h3>
          
          <div className="space-y-2">
            {Object.entries(stats.entriesByMonth)
              .sort((a, b) => b[0].localeCompare(a[0]))
              .slice(0, 6)
              .map(([month, count]) => {
                const [year, monthNum] = month.split('-');
                const monthName = new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                });
                
                return (
                  <div key={month} className="flex items-center justify-between text-sm">
                    <span className="text-white/70">{monthName}</span>
                    <span className="text-white/50">{count} entries</span>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Motivational Quote */}
      <div className="text-center py-6">
        <p className="text-white/40 text-sm italic">
          "The unexamined life is not worth living." — Socrates
        </p>
      </div>
    </div>
  );
}



