import { useState, useEffect } from 'react';
import { 
  addJournalEntry, 
  updateJournalEntry, 
  type JournalEntry, 
  type MoodType 
} from '../../lib/journalStorage';
import { 
  getRandomPrompt, 
  getDailyPrompt, 
  moodInfo, 
  type JournalPrompt 
} from '../../data/journalPrompts';

type JournalEntryFormProps = {
  entry?: JournalEntry | null;
  onSave: () => void;
  onCancel: () => void;
  initialPrompt?: JournalPrompt | null;
};

const SUGGESTED_TAGS = [
  'morning', 'evening', 'meditation', 'insight', 'dream', 
  'goal', 'challenge', 'victory', 'lesson', 'prayer'
];

export function JournalEntryForm({ entry, onSave, onCancel, initialPrompt }: JournalEntryFormProps) {
  const [title, setTitle] = useState(entry?.title || '');
  const [content, setContent] = useState(entry?.content || '');
  const [gratitudes, setGratitudes] = useState<string[]>(
    entry?.gratitudes || ['', '', '']
  );
  const [mood, setMood] = useState<MoodType>(entry?.mood || 'neutral');
  const [moodIntensity, setMoodIntensity] = useState(entry?.moodIntensity || 3);
  const [tags, setTags] = useState<string[]>(entry?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState<JournalPrompt | null>(
    initialPrompt || null
  );
  const [isPrivate, setIsPrivate] = useState(entry?.isPrivate ?? false);
  const [_showPromptPicker, _setShowPromptPicker] = useState(false);

  useEffect(() => {
    if (!currentPrompt && !entry) {
      setCurrentPrompt(getDailyPrompt());
    }
  }, [currentPrompt, entry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      return;
    }

    const filteredGratitudes = gratitudes.filter(g => g.trim());
    
    if (entry) {
      updateJournalEntry(entry.id, {
        title: title.trim() || undefined,
        content: content.trim(),
        gratitudes: filteredGratitudes,
        mood,
        moodIntensity,
        tags,
        isPrivate,
        prompt: currentPrompt?.text,
      });
    } else {
      addJournalEntry({
        date: new Date().toISOString(),
        title: title.trim() || undefined,
        content: content.trim(),
        gratitudes: filteredGratitudes,
        mood,
        moodIntensity,
        tags,
        isPrivate,
        prompt: currentPrompt?.text,
      });
    }
    
    onSave();
  };

  const updateGratitude = (index: number, value: string) => {
    const newGratitudes = [...gratitudes];
    newGratitudes[index] = value;
    setGratitudes(newGratitudes);
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
    }
    setTagInput('');
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput) {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  const newRandomPrompt = () => {
    setCurrentPrompt(getRandomPrompt());
    _setShowPromptPicker(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>
        <h2 className="text-lg font-serif text-white">
          {entry ? 'Edit Entry' : 'New Entry'}
        </h2>
        <div className="w-16" />
      </div>

      {/* Daily Prompt Card */}
      {currentPrompt && !entry && (
        <div className="relative bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-2xl p-5 border border-violet-400/20">
          <div className="absolute top-3 right-3">
            <button
              type="button"
              onClick={newRandomPrompt}
              className="p-2 text-white/40 hover:text-white/80 hover:bg-white/10 rounded-full transition-all"
              title="Get new prompt"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">💭</span>
            <div>
              <p className="text-sm text-violet-300/70 mb-1">Today's Prompt</p>
              <p className="text-white font-serif text-lg leading-relaxed">
                {currentPrompt.text}
              </p>
              {currentPrompt.followUp && (
                <p className="text-white/50 text-sm mt-2 italic">
                  {currentPrompt.followUp}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Title (optional) */}
      <div>
        <label className="block text-sm text-white/60 mb-2">
          Title <span className="text-white/40">(optional)</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your entry a title..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-400/50 focus:ring-1 focus:ring-violet-400/25 transition-all"
        />
      </div>

      {/* Mood Selection */}
      <div>
        <label className="block text-sm text-white/60 mb-3">How are you feeling?</label>
        <div className="grid grid-cols-4 gap-2">
          {(Object.entries(moodInfo) as [MoodType, typeof moodInfo.peaceful][]).map(([key, info]) => (
            <button
              key={key}
              type="button"
              onClick={() => setMood(key)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                mood === key
                  ? `${info.color} scale-105`
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <span className="text-xl">{info.icon}</span>
              <span className="text-xs text-white/70">{info.label}</span>
            </button>
          ))}
        </div>
        
        {/* Mood Intensity */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/40">Intensity</span>
            <span className="text-sm text-white/60">{moodIntensity}/5</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={moodIntensity}
            onChange={(e) => setMoodIntensity(Number(e.target.value))}
            className="w-full accent-violet-500"
          />
        </div>
      </div>

      {/* Gratitudes */}
      <div>
        <label className="block text-sm text-white/60 mb-3">
          <span className="flex items-center gap-2">
            <span>🙏</span>
            <span>Three things you're grateful for</span>
          </span>
        </label>
        <div className="space-y-2">
          {gratitudes.map((gratitude, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-500/20 text-amber-300 text-xs">
                {index + 1}
              </span>
              <input
                type="text"
                value={gratitude}
                onChange={(e) => updateGratitude(index, e.target.value)}
                placeholder={`Gratitude ${index + 1}...`}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 transition-all"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div>
        <label className="block text-sm text-white/60 mb-2">Your reflections</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts, feelings, and reflections..."
          rows={8}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-400/50 focus:ring-1 focus:ring-violet-400/25 transition-all resize-none"
          required
        />
        <div className="flex justify-between mt-2 text-xs text-white/40">
          <span>{content.split(/\s+/).filter(w => w.length > 0).length} words</span>
          <span>{content.length} characters</span>
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm text-white/60 mb-2">Tags</label>
        
        {/* Current tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-white transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}
        
        {/* Tag input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Add a tag..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-violet-400/50 transition-all"
          />
          <button
            type="button"
            onClick={() => tagInput && addTag(tagInput)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors"
          >
            Add
          </button>
        </div>
        
        {/* Suggested tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {SUGGESTED_TAGS.filter(t => !tags.includes(t)).slice(0, 6).map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => addTag(tag)}
              className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-white/50 hover:text-white/80 transition-all"
            >
              + {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Privacy toggle */}
      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-lg">🔒</span>
          <div>
            <p className="text-white text-sm">Private Entry</p>
            <p className="text-white/40 text-xs">Only you can see this entry</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsPrivate(!isPrivate)}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            isPrivate ? 'bg-violet-500' : 'bg-white/20'
          }`}
        >
          <span
            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
              isPrivate ? 'left-7' : 'left-1'
            }`}
          />
        </button>
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!content.trim()}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-medium shadow-lg shadow-violet-500/25 transition-all"
        >
          {entry ? 'Save Changes' : 'Save Entry'}
        </button>
      </div>
    </form>
  );
}

