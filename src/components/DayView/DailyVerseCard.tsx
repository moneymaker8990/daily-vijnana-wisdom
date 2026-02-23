/**
 * DailyVerseCard - Shows a daily verse from the Sacred Library
 *
 * Uses getDailyVerse() for deterministic, day-based selection.
 * Distinct emerald/teal gradient to differentiate from the violet sacred text cards.
 */

import { useState } from 'react';
import { getDailyVerse, getSourceById } from '@core/library/engine';

type DailyVerseCardProps = {
  dayNumber: number;
  onOpenLibrary?: () => void;
};

export function DailyVerseCard({ dayNumber, onOpenLibrary }: DailyVerseCardProps) {
  const [showCommentary, setShowCommentary] = useState(false);

  const verse = getDailyVerse(dayNumber);
  if (!verse) return null;

  const source = getSourceById(verse.sourceId);

  return (
    <section className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-emerald-400/15">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[10px] sm:text-xs font-medium text-emerald-300/70 uppercase tracking-[0.15em]">
          Daily Verse
        </h3>
        {source && (
          <span className="text-[10px] text-white/40">
            {source.icon || '📜'} {source.tradition}
          </span>
        )}
      </div>

      {/* Source name */}
      <p className="text-xs text-emerald-200/60 mb-2">
        {verse.sourceName}
        {verse.chapter && ` · ${typeof verse.chapter === 'number' ? `Ch. ${verse.chapter}` : verse.chapter}`}
        {verse.verseNumber && `:${verse.verseNumber}`}
      </p>

      {/* Verse text */}
      <p
        className="text-sm sm:text-base text-white/90 leading-relaxed italic text-center font-serif py-2"
        style={{ overflowWrap: 'break-word' }}
      >
        "{verse.text}"
      </p>

      {/* Commentary toggle */}
      {verse.commentary && (
        <div className="mt-3">
          <button
            onClick={() => setShowCommentary(!showCommentary)}
            className="text-xs text-emerald-300/60 hover:text-emerald-300/90 transition-colors flex items-center gap-1"
          >
            <svg
              className={`w-3 h-3 transition-transform ${showCommentary ? 'rotate-90' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Commentary
          </button>
          {showCommentary && (
            <p className="mt-2 text-xs text-white/50 leading-relaxed pl-4 border-l-2 border-emerald-500/20">
              {verse.commentary}
            </p>
          )}
        </div>
      )}

      {/* Library link */}
      {onOpenLibrary && (
        <button
          onClick={onOpenLibrary}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-xs text-emerald-300/70 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg border border-emerald-400/10 transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          Explore in Sacred Library
        </button>
      )}
    </section>
  );
}
