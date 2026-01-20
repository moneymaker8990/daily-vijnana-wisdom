import { useState, useEffect } from 'react';
import type { LibraryText, LibraryVerse } from '@data/library/types';
import { FavoriteButton } from '../Favorites/FavoriteButton';
import { ShareButton } from '../Share/ShareButton';
import { ExplainButton, ExplainPanel } from '../Explain';
import type { TextExplanation } from '@lib/textExplain';

export type SingleVerseViewProps = {
  verse: LibraryVerse;
  text: LibraryText;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  verseRef: React.RefObject<HTMLDivElement | null>;
  bookmarked: boolean;
  onToggleBookmark: () => void;
};

export function SingleVerseView({
  verse,
  text,
  index,
  total,
  onPrev,
  onNext,
  verseRef,
  bookmarked,
  onToggleBookmark,
}: SingleVerseViewProps) {
  const [explanation, setExplanation] = useState<TextExplanation | null>(null);

  // Clear explanation when verse changes
  useEffect(() => {
    setExplanation(null);
  }, [verse.id]);

  return (
    <div className="space-y-6" ref={verseRef}>
      {/* Progress bar */}
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      {/* Verse number */}
      <div className="text-center">
        <span className="inline-block px-4 py-1 bg-white/10 rounded-full text-xs text-white/60">
          {verse.section && `${verse.section.charAt(0).toUpperCase() + verse.section.slice(1)} • `}
          Verse {verse.number} of {total}
        </span>
      </div>

      {/* Verse Content */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/10">
        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-serif italic">
          "{verse.text}"
        </p>

        {verse.commentary && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <h4 className="text-xs uppercase tracking-wider text-violet-300/70 mb-2">Commentary</h4>
            <p className="text-sm md:text-base text-white/70 leading-relaxed">{verse.commentary}</p>
          </div>
        )}

        {verse.keywords && verse.keywords.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {verse.keywords.map((keyword) => (
              <span key={keyword} className="text-xs px-2 py-1 bg-white/5 rounded-full text-white/40">
                {keyword}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex items-center justify-end gap-2">
          <ExplainButton
            text={verse.text}
            source={text.title}
            onExplanation={setExplanation}
            isExpanded={explanation !== null}
          />
          <button
            onClick={onToggleBookmark}
            className={`p-2 rounded-lg transition-colors ${
              bookmarked
                ? 'text-amber-400 bg-amber-400/10'
                : 'text-white/40 hover:text-white/80 hover:bg-white/10'
            }`}
            title={bookmarked ? 'Remove bookmark' : 'Bookmark this verse'}
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this verse'}
            aria-pressed={bookmarked}
          >
            <svg
              className="w-5 h-5"
              fill={bookmarked ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
          <FavoriteButton
            dayNumber={verse.number}
            source={text.title}
            title={`${text.title} - Verse ${verse.number}`}
            text={verse.text}
          />
          <ShareButton
            text={verse.text}
            title={`${text.title} - Verse ${verse.number}`}
            source={text.title}
            dayNumber={verse.number}
          />
        </div>

        {/* AI Explanation Panel */}
        {explanation && <ExplainPanel explanation={explanation} onClose={() => setExplanation(null)} />}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={index === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            index === 0
              ? 'text-white/20 cursor-not-allowed'
              : 'text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">Previous</span>
        </button>

        <button
          onClick={onNext}
          disabled={index === total - 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            index === total - 1
              ? 'text-white/20 cursor-not-allowed'
              : 'text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          <span className="text-sm">Next</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
