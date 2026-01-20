import { useState } from 'react';
import type { DreamEntry } from '@lib/dreamStorage';
import { DreamInterpretation } from './DreamInterpretation';

type DreamDetailProps = {
  dream: DreamEntry;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function DreamDetail({ dream, onBack, onEdit, onDelete }: DreamDetailProps) {
  const [showInterpretation, setShowInterpretation] = useState(false);

  const moodEmojis = {
    peaceful: '😌',
    anxious: '😰',
    confused: '🤔',
    joyful: '😊',
    mysterious: '🌙',
    neutral: '😐',
  };

  const formattedDate = new Date(dream.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  if (showInterpretation) {
    return (
      <DreamInterpretation
        dream={dream}
        onBack={() => setShowInterpretation(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">Dreams</span>
        </button>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Edit"
            aria-label="Edit dream"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            title="Delete"
            aria-label="Delete dream"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dream Content */}
      <div className="space-y-4">
        {/* Title & Date */}
        <div className="text-center">
          <h2 className="text-2xl font-serif text-white mb-2">
            {dream.title || 'Untitled Dream'}
          </h2>
          <p className="text-sm text-white/50">{formattedDate}</p>
        </div>

        {/* Mood */}
        {dream.mood && (
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
              <span className="text-lg">{moodEmojis[dream.mood]}</span>
              <span className="text-sm text-white/70 capitalize">{dream.mood}</span>
            </span>
          </div>
        )}

        {/* Content */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/10">
          <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
            {dream.content}
          </p>
        </div>

        {/* AI Interpretation Button */}
        <button
          onClick={() => setShowInterpretation(true)}
          className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 hover:from-violet-500/30 hover:to-indigo-500/30 border border-violet-500/30 hover:border-violet-500/50 rounded-xl transition-all group"
        >
          <svg className="w-6 h-6 text-violet-300 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <div className="text-left">
            <span className="block text-white font-medium">
              {dream.interpretation ? 'View Interpretation' : 'Get AI Interpretation'}
            </span>
            <span className="block text-xs text-white/50">
              {dream.interpretation
                ? 'See symbols, insights, and spiritual connections'
                : 'Discover the deeper meaning of your dream'}
            </span>
          </div>
        </button>

        {/* Existing Interpretation Preview */}
        {dream.interpretation && (
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h4 className="text-xs uppercase tracking-wider text-violet-300/70 mb-2">Interpretation Preview</h4>
            <p className="text-sm text-white/70 line-clamp-3">
              {dream.interpretation.summary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}





