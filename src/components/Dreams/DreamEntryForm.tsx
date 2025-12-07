import { useState } from 'react';
import { addDream, updateDream, type DreamEntry } from '../../lib/dreamStorage';

type DreamEntryFormProps = {
  dream?: DreamEntry | null;
  onSave: () => void;
  onCancel: () => void;
};

const MOODS = [
  { id: 'peaceful', label: 'Peaceful', emoji: '😌' },
  { id: 'anxious', label: 'Anxious', emoji: '😰' },
  { id: 'confused', label: 'Confused', emoji: '🤔' },
  { id: 'joyful', label: 'Joyful', emoji: '😊' },
  { id: 'mysterious', label: 'Mysterious', emoji: '🌙' },
  { id: 'neutral', label: 'Neutral', emoji: '😐' },
] as const;

export function DreamEntryForm({ dream, onSave, onCancel }: DreamEntryFormProps) {
  const [title, setTitle] = useState(dream?.title || '');
  const [content, setContent] = useState(dream?.content || '');
  const [date, setDate] = useState(dream?.date || new Date().toISOString().split('T')[0]);
  const [mood, setMood] = useState<DreamEntry['mood']>(dream?.mood);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSaving(true);
    try {
      if (dream) {
        updateDream(dream.id, { title, content, date, mood });
      } else {
        addDream({ title, content, date, mood });
      }
      onSave();
    } catch (error) {
      console.error('Failed to save dream:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">Back</span>
        </button>
        <h2 className="text-lg font-serif text-white">
          {dream ? 'Edit Dream' : 'Record Dream'}
        </h2>
        <div className="w-16" /> {/* Spacer for centering */}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
            Title (optional)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your dream a name..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
            Dream Description
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Describe your dream in as much detail as you can remember..."
            rows={8}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all resize-none"
            required
          />
          <p className="mt-2 text-xs text-white/40">
            Include people, places, emotions, symbols, and any vivid details you remember.
          </p>
        </div>

        {/* Mood */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/50 mb-3">
            How did you feel?
          </label>
          <div className="flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMood(mood === m.id ? undefined : m.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  mood === m.id
                    ? 'bg-violet-500/30 border border-violet-400/50 text-white'
                    : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10'
                }`}
              >
                <span>{m.emoji}</span>
                <span className="text-sm">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!content.trim() || saving}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 rounded-xl text-white font-medium shadow-lg shadow-violet-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : dream ? 'Save Changes' : 'Save Dream'}
          </button>
        </div>
      </form>
    </div>
  );
}

