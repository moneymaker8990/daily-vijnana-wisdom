import { useState, useEffect, useRef, useCallback } from 'react';
import type { LibraryText } from '@data/library/types';
import { updateReadingProgress, toggleBookmark, isBookmarked, getReadingProgress } from '@lib/readingProgress';
import { ALL_SOURCES } from '@core/library/registry';
import { SingleVerseView } from './SingleVerseView';
import { ListView } from './ListView';
import { TableOfContents } from './TableOfContents';
import { IntroductionPanel } from './IntroductionPanel';

type TextReaderProps = {
  text: LibraryText;
  onBack: () => void;
  initialVerse?: number;
};

// Helper to get source data from text title - uses registry for accurate mapping
function getSource(title: string) {
  return ALL_SOURCES.find((s) => s.name === title);
}

export function TextReader({ text, onBack, initialVerse = 0 }: TextReaderProps) {
  const [currentIndex, setCurrentIndex] = useState(initialVerse);
  const [viewMode, setViewMode] = useState<'single' | 'list'>('single');
  const [showToc, setShowToc] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const verseRef = useRef<HTMLDivElement>(null);

  const source = getSource(text.title);
  const sourceId = source?.id || text.title.toLowerCase().replace(/\s+/g, '-');
  const verse = text.verses[currentIndex];

  // Show intro automatically on first visit (when no reading progress exists)
  useEffect(() => {
    const progress = getReadingProgress(sourceId);
    if (!progress && source?.historicalIntro) {
      setShowIntro(true);
    }
  }, [sourceId, source]);

  // Check bookmark status on mount and when verse changes
  useEffect(() => {
    if (verse) {
      setBookmarked(isBookmarked(sourceId, verse.id));
    }
  }, [sourceId, verse]);

  // Save reading progress when index changes
  useEffect(() => {
    if (verse) {
      updateReadingProgress(sourceId, verse.id, currentIndex, verse.chapter, verse.number);
    }
  }, [currentIndex, verse, sourceId]);

  useEffect(() => {
    if (viewMode === 'single' && verseRef.current) {
      verseRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentIndex, viewMode]);

  const handleToggleBookmark = useCallback(() => {
    if (verse) {
      const newState = toggleBookmark(sourceId, verse.id);
      setBookmarked(newState);
    }
  }, [sourceId, verse]);

  const goToVerse = (index: number) => {
    setCurrentIndex(index);
    setShowToc(false);
    setViewMode('single');
  };

  const goNext = () => {
    if (currentIndex < text.verses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">Library</span>
        </button>

        <div className="flex items-center gap-2">
          {/* About/Intro Toggle */}
          {source?.historicalIntro && (
            <button
              onClick={() => setShowIntro(!showIntro)}
              className={`p-2 rounded-lg transition-colors ${
                showIntro ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80'
              }`}
              title="About this text"
              aria-label="About this text"
              aria-pressed={showIntro}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          )}

          {/* View Toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'single' ? 'list' : 'single')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80'
            }`}
            title={viewMode === 'single' ? 'Show all verses' : 'Single verse view'}
            aria-label={viewMode === 'single' ? 'Show all verses' : 'Single verse view'}
            aria-pressed={viewMode === 'list'}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </button>

          {/* TOC Toggle */}
          <button
            onClick={() => setShowToc(!showToc)}
            className={`p-2 rounded-lg transition-colors ${
              showToc ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80'
            }`}
            title="Table of contents"
            aria-label="Table of contents"
            aria-pressed={showToc}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-serif text-white">{text.title}</h2>
        <p className="text-sm text-white/50">{text.subtitle}</p>
      </div>

      {/* Historical Introduction */}
      {showIntro && source?.historicalIntro && (
        <IntroductionPanel intro={source.historicalIntro} source={source} onClose={() => setShowIntro(false)} />
      )}

      {/* Table of Contents */}
      {!showIntro && showToc && (
        <TableOfContents
          text={text}
          currentIndex={currentIndex}
          onSelect={goToVerse}
          onClose={() => setShowToc(false)}
        />
      )}

      {/* Main Content */}
      {!showIntro &&
        !showToc &&
        (viewMode === 'single' ? (
          <SingleVerseView
            verse={verse}
            text={text}
            index={currentIndex}
            total={text.verses.length}
            onPrev={goPrev}
            onNext={goNext}
            verseRef={verseRef}
            bookmarked={bookmarked}
            onToggleBookmark={handleToggleBookmark}
          />
        ) : (
          <ListView text={text} currentIndex={currentIndex} onSelect={goToVerse} />
        ))}
    </div>
  );
}
