import { useState, useCallback, useEffect } from 'react';
import { addDream, updateDream, type DreamEntry } from '@lib/dreamStorage';
import { suggestTags } from '@lib/dreamPatterns';
import { VoiceDictationButton } from '../VoiceDictation';

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
  const [tags, setTags] = useState<string[]>(dream?.tags ?? []);
  const [tagInput, setTagInput] = useState('');
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  // Auto-suggest tags when content changes
  useEffect(() => {
    const suggested = suggestTags(content).filter(t => !tags.includes(t));
    setTagSuggestions(suggested);
  }, [content, tags]);

  const addTag = (tag: string) => {
    const trimmed = tag.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      setTags(prev => [...prev, trimmed]);
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  // Voice dictation handler - appends to content with proper spacing
  const handleVoiceTranscript = useCallback((transcript: string) => {
    setContent(prev => {
      const trimmed = prev.trim();
      if (!trimmed) return transcript;
      // Add space between existing content and new transcript
      return trimmed + ' ' + transcript;
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSaving(true);
    try {
      if (dream) {
        updateDream(dream.id, { title, content, date, mood, tags });
      } else {
        addDream({ title, content, date, mood, tags });
      }
      onSave();
    } catch (error) {
      // Dream save failed silently
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
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs uppercase tracking-wider text-white/50">
              Dream Description
            </label>
            <VoiceDictationButton
              onTranscript={handleVoiceTranscript}
              label="Speak"
              className="scale-90"
            />
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Describe your dream in as much detail as you can remember... or tap the microphone to speak"
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

        {/* Tags */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
            Tags
          </label>

          {/* Auto-suggested tags */}
          {tagSuggestions.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className="text-xs text-white/30">Suggested:</span>
              {tagSuggestions.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => addTag(s)}
                  className="px-2 py-0.5 text-xs bg-violet-500/15 text-violet-300/70 border border-violet-400/20 rounded-full hover:bg-violet-500/25 transition-colors"
                >
                  + {s}
                </button>
              ))}
            </div>
          )}

          {/* Selected tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-violet-500/20 text-violet-300 rounded-full text-xs"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-violet-300/50 hover:text-white ml-0.5"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}

          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Add a tag (Enter or comma to add)..."
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
          />
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



