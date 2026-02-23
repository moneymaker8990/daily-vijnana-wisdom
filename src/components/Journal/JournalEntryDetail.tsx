import { type JournalEntry } from '@lib/journalStorage';
import { moodInfo } from '@data/journalPrompts';

type JournalEntryDetailProps = {
  entry: JournalEntry;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function JournalEntryDetail({ entry, onBack, onEdit, onDelete }: JournalEntryDetailProps) {
  const mood = moodInfo[entry.mood] || moodInfo.neutral;
  
  const formattedDate = new Date(entry.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const formattedTime = new Date(entry.createdAt).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            title="Edit"
            aria-label="Edit entry"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
            title="Delete"
            aria-label="Delete entry"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Date & Mood Header */}
      <div className="text-center pb-4 border-b border-white/10">
        <p className="text-white/40 text-sm mb-1">{formattedTime}</p>
        <h1 className="text-xl font-serif text-white mb-3">
          {entry.title || formattedDate}
        </h1>
        {entry.title && (
          <p className="text-white/50 text-sm">{formattedDate}</p>
        )}
        
        {/* Mood Badge */}
        <div className={`inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full border ${mood.color}`}>
          <span className="text-xl">{mood.icon}</span>
          <span className="text-white/80 text-sm">
            Feeling {mood.label.toLowerCase()} ({entry.moodIntensity}/5)
          </span>
        </div>
      </div>

      {/* Prompt used */}
      {entry.prompt && (
        <div className="bg-violet-500/10 rounded-xl p-4 border border-violet-400/20">
          <div className="flex items-start gap-3">
            <span className="text-lg">💭</span>
            <div>
              <p className="text-xs text-violet-300/60 mb-1">Prompt</p>
              <p className="text-white/80 italic">{entry.prompt}</p>
            </div>
          </div>
        </div>
      )}

      {/* Gratitudes */}
      {entry.gratitudes.length > 0 && (
        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl p-4 border border-amber-400/20">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🙏</span>
            <h3 className="text-sm font-medium text-amber-300">Gratitudes</h3>
          </div>
          <div className="space-y-2">
            {entry.gratitudes.map((gratitude, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-amber-500/20 text-amber-300 text-xs flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <p className="text-white/80 text-sm">{gratitude}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white/5 rounded-xl p-5 border border-white/10">
        <p className="text-white/90 leading-relaxed whitespace-pre-wrap">
          {entry.content}
        </p>
      </div>

      {/* Tags */}
      {entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {entry.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
        <div className="text-center">
          <p className="text-2xl font-light text-white">{entry.wordCount}</p>
          <p className="text-xs text-white/40">Words written</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-light text-white">
            {Math.ceil(entry.wordCount / 200)} min
          </p>
          <p className="text-xs text-white/40">Reading time</p>
        </div>
      </div>

      {/* Privacy indicator */}
      {entry.isPrivate && (
        <div className="flex items-center justify-center gap-2 text-white/40 text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Private entry</span>
        </div>
      )}
    </div>
  );
}



