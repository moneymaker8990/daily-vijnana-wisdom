import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { LibraryText } from '@data/library/types';
import type { VbtPracticeCategory } from '@core/library/types';
import { updateReadingProgress, toggleBookmark, isBookmarked } from '@lib/readingProgress';
import { ALL_SOURCES } from '@core/library/registry';
import { SingleVerseView } from './SingleVerseView';
import { ListView } from './ListView';
import { TableOfContents } from './TableOfContents';
import { IntroductionPanel } from './IntroductionPanel';
import { VBT_CATEGORY_LABELS, VBT_CATEGORY_ORDER } from '@core/library/verses/vbtVersePracticeCategories';

type TextReaderProps = {
  text: LibraryText;
  onBack: () => void;
  initialVerse?: number;
};

function getSourceForText(text: LibraryText) {
  return (
    ALL_SOURCES.find((s) => s.id === text.registrySourceId) ??
    ALL_SOURCES.find((s) => s.name === text.title)
  );
}

export function TextReader({ text, onBack, initialVerse = 0 }: TextReaderProps) {
  const isVbt = text.registrySourceId === 'vijnana-bhairava-tantra';
  const [practiceCategory, setPracticeCategory] = useState<VbtPracticeCategory | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.min(Math.max(0, initialVerse), Math.max(0, text.verses.length - 1))
  );
  const [viewMode, setViewMode] = useState<'single' | 'list'>('single');
  const [showToc, setShowToc] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const verseRef = useRef<HTMLDivElement>(null);

  const displayVerses = useMemo(() => {
    if (!isVbt || practiceCategory === 'all') return text.verses;
    return text.verses.filter((v) => v.practiceCategory === practiceCategory);
  }, [isVbt, practiceCategory, text.verses]);

  const displayText = useMemo(
    (): LibraryText => ({
      ...text,
      verses: displayVerses,
      totalVerses: displayVerses.length,
    }),
    [text, displayVerses]
  );

  const source = getSourceForText(text);
  const sourceId = source?.id || text.registrySourceId || text.title.toLowerCase().replace(/\s+/g, '-');
  const verse = displayText.verses[currentIndex];

  useEffect(() => {
    if (currentIndex >= displayText.verses.length) {
      setCurrentIndex(Math.max(0, displayText.verses.length - 1));
    }
  }, [currentIndex, displayText.verses.length]);

  useEffect(() => {
    if (verse) {
      setBookmarked(isBookmarked(sourceId, verse.id));
    }
  }, [sourceId, verse]);

  useEffect(() => {
    if (verse) {
      const fullIndex = text.verses.findIndex((v) => v.id === verse.id);
      updateReadingProgress(
        sourceId,
        verse.id,
        fullIndex >= 0 ? fullIndex : currentIndex,
        verse.chapter,
        verse.number
      );
    }
  }, [currentIndex, verse, sourceId, text.verses]);

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

  const goToVerseFromFullTextIndex = (fullIndex: number) => {
    const id = text.verses[fullIndex]?.id;
    if (!id) return goToVerse(0);
    const idx = displayVerses.findIndex((v) => v.id === id);
    if (idx >= 0) {
      goToVerse(idx);
    } else {
      setPracticeCategory('all');
      goToVerse(fullIndex);
    }
  };

  const goNext = () => {
    if (currentIndex < displayText.verses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const onCategoryChange = (cat: VbtPracticeCategory | 'all') => {
    setPracticeCategory(cat);
    setCurrentIndex(0);
    setShowToc(false);
  };

  const showTocButton = !(isVbt && practiceCategory !== 'all');

  return (
    <div className="space-y-4">
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
          {(source?.historicalIntro || source?.pedagogicalNote) && (
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

          {showTocButton && (
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
          )}
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-serif text-white">{text.title}</h2>
        <p className="text-sm text-white/50">{text.subtitle}</p>
        {isVbt && !showIntro && (
          <p className="mt-2 text-xs text-white/45 max-w-xl mx-auto leading-relaxed">
            <span className="text-violet-300/80">Study</span> the verses and introduction.
            <span className="text-emerald-300/80"> Practice</span> uses category filters and the contemplative sections on
            each verse (app commentary—not alternate translations).
          </p>
        )}
        {(source?.historicalIntro || source?.pedagogicalNote) && !showIntro && (
          <button
            onClick={() => setShowIntro(true)}
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 transition-colors hover:bg-white/10 hover:text-white/80"
          >
            <span aria-hidden="true">i</span>
            <span>Read the historical introduction</span>
          </button>
        )}
      </div>

      {isVbt && !showIntro && (
        <div className="space-y-2">
          <p className="text-xs text-white/45 text-center md:text-left">Practice focus</p>
          <div
            className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1"
            role="tablist"
            aria-label="Vijñāna Bhairava practice categories"
          >
            <button
              type="button"
              role="tab"
              aria-selected={practiceCategory === 'all'}
              onClick={() => onCategoryChange('all')}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                practiceCategory === 'all'
                  ? 'bg-violet-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/15'
              }`}
            >
              All
            </button>
            {VBT_CATEGORY_ORDER.map((cat) => {
              const count = text.verses.filter((v) => v.practiceCategory === cat).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={practiceCategory === cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    practiceCategory === cat
                      ? 'bg-violet-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/15'
                  }`}
                >
                  {VBT_CATEGORY_LABELS[cat]} ({count})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {showIntro && source && (source.historicalIntro || source.pedagogicalNote) && (
        <IntroductionPanel
          intro={source.historicalIntro}
          source={source}
          onClose={() => setShowIntro(false)}
        />
      )}

      {!showIntro && showToc && showTocButton && (
        <TableOfContents
          text={text}
          currentIndex={Math.max(0, text.verses.findIndex((v) => v.id === verse?.id))}
          onSelect={goToVerseFromFullTextIndex}
          onClose={() => setShowToc(false)}
        />
      )}

      {!showIntro && !showToc && displayText.verses.length === 0 && (
        <p className="text-center text-sm text-white/55 py-8">No verses match this practice focus.</p>
      )}

      {!showIntro &&
        !showToc &&
        displayText.verses.length > 0 &&
        (viewMode === 'single' ? (
          <SingleVerseView
            verse={verse}
            text={displayText}
            index={currentIndex}
            total={displayText.verses.length}
            onPrev={goPrev}
            onNext={goNext}
            verseRef={verseRef}
            bookmarked={bookmarked}
            onToggleBookmark={handleToggleBookmark}
          />
        ) : (
          <ListView text={displayText} currentIndex={currentIndex} onSelect={goToVerse} />
        ))}
    </div>
  );
}
