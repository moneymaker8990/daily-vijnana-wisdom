import { useState, useEffect } from 'react';
import { loadDreams, deleteDream, type DreamEntry } from '../../lib/dreamStorage';
import { DreamEntryForm } from './DreamEntryForm';
import { DreamDetail } from './DreamDetail';

type DreamJournalProps = {
  isPremium?: boolean;
  onUpgrade?: () => void;
};

export function DreamJournal({ isPremium = true, onUpgrade }: DreamJournalProps) {
  const [dreams, setDreams] = useState<DreamEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDream, setEditingDream] = useState<DreamEntry | null>(null);
  const [viewingDream, setViewingDream] = useState<DreamEntry | null>(null);

  useEffect(() => {
    setDreams(loadDreams());
  }, []);

  const handleSave = () => {
    setDreams(loadDreams());
    setShowForm(false);
    setEditingDream(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this dream?')) {
      deleteDream(id);
      setDreams(loadDreams());
      setViewingDream(null);
    }
  };

  if (viewingDream) {
    return (
      <DreamDetail
        dream={viewingDream}
        onBack={() => setViewingDream(null)}
        onEdit={() => {
          setEditingDream(viewingDream);
          setShowForm(true);
          setViewingDream(null);
        }}
        onDelete={() => handleDelete(viewingDream.id)}
        isPremium={isPremium}
        onUpgrade={onUpgrade}
      />
    );
  }

  if (showForm) {
    return (
      <DreamEntryForm
        dream={editingDream}
        onSave={handleSave}
        onCancel={() => {
          setShowForm(false);
          setEditingDream(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center pb-4 border-b border-white/10">
        <h2 className="text-2xl md:text-3xl font-serif text-white mb-2">
          Dream Journal
        </h2>
        <p className="text-sm text-white/60">
          Record and explore the wisdom of your dreams
        </p>
      </div>

      {/* Add Dream Button */}
      <button
        onClick={() => setShowForm(true)}
        className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 border border-white/10 hover:border-white/20 rounded-xl transition-all group"
      >
        <span className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full group-hover:scale-110 transition-transform">
          <svg className="w-5 h-5 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </span>
        <div className="text-left">
          <span className="block text-white font-medium">Record a Dream</span>
          <span className="block text-xs text-white/50">Capture before it fades</span>
        </div>
      </button>

      {/* Dreams List */}
      {dreams.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
            <svg className="w-10 h-10 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </div>
          <h3 className="text-lg text-white/70 mb-2">No dreams recorded yet</h3>
          <p className="text-sm text-white/40 max-w-xs mx-auto">
            Start capturing your dreams to discover patterns and receive AI-powered interpretations.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {dreams.map((dream) => (
            <DreamCard
              key={dream.id}
              dream={dream}
              onClick={() => setViewingDream(dream)}
            />
          ))}
        </div>
      )}

      {/* Stats */}
      {dreams.length > 0 && (
        <div className="text-center pt-4 border-t border-white/10">
          <p className="text-xs text-white/40">
            {dreams.length} dream{dreams.length !== 1 ? 's' : ''} recorded
          </p>
        </div>
      )}
    </div>
  );
}

type DreamCardProps = {
  dream: DreamEntry;
  onClick: () => void;
};

function DreamCard({ dream, onClick }: DreamCardProps) {
  const moodEmojis = {
    peaceful: '😌',
    anxious: '😰',
    confused: '🤔',
    joyful: '😊',
    mysterious: '🌙',
    neutral: '😐',
  };

  const formattedDate = new Date(dream.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all group"
    >
      <div className="flex items-start gap-3">
        {/* Mood indicator */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg">
          {dream.mood ? moodEmojis[dream.mood] : '🌙'}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-white truncate">
              {dream.title || 'Untitled Dream'}
            </h3>
            <span className="text-xs text-white/40 flex-shrink-0 ml-2">
              {formattedDate}
            </span>
          </div>
          <p className="text-sm text-white/60 line-clamp-2">
            {dream.content}
          </p>
          {dream.interpretation && (
            <div className="mt-2 flex items-center gap-1 text-xs text-violet-300/70">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>Interpreted</span>
            </div>
          )}
        </div>

        {/* Arrow */}
        <svg className="w-5 h-5 text-white/30 group-hover:text-white/60 flex-shrink-0 transition-all group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}

