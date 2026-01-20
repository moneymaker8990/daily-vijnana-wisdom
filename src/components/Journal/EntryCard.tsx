import type { JournalEntry } from '@lib/journalStorage';
import { moodInfo } from '@data/journalPrompts';

export type EntryCardProps = {
  entry: JournalEntry;
  onClick: () => void;
};

export function EntryCard({ entry, onClick }: EntryCardProps) {
  const mood = moodInfo[entry.mood] || moodInfo.neutral;

  const formattedDate = new Date(entry.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const isToday = new Date(entry.date).toDateString() === new Date().toDateString();
  const isYesterday = new Date(entry.date).toDateString() === new Date(Date.now() - 86400000).toDateString();

  const dateLabel = isToday ? 'Today' : isYesterday ? 'Yesterday' : formattedDate;

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all group"
    >
      <div className="flex items-start gap-3">
        {/* Mood indicator */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${mood.color} flex items-center justify-center text-lg border`}>
          {mood.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-white truncate">
              {entry.title || dateLabel}
            </h3>
            <span className="text-xs text-white/40 flex-shrink-0 ml-2">
              {entry.title ? dateLabel : ''}
            </span>
          </div>

          {/* Gratitudes preview */}
          {entry.gratitudes.length > 0 && (
            <div className="flex items-center gap-1 mb-1 text-amber-300/60 text-xs">
              <span>🙏</span>
              <span>{entry.gratitudes.length} gratitude{entry.gratitudes.length !== 1 ? 's' : ''}</span>
            </div>
          )}

          <p className="text-sm text-white/60 line-clamp-2">
            {entry.content}
          </p>

          {/* Tags */}
          {entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {entry.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs text-violet-300/60">
                  #{tag}
                </span>
              ))}
              {entry.tags.length > 3 && (
                <span className="text-xs text-white/30">+{entry.tags.length - 3}</span>
              )}
            </div>
          )}
        </div>

        {/* Arrow */}
        <svg className="w-5 h-5 text-white/30 group-hover:text-white/60 flex-shrink-0 transition-all group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}
