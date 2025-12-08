import { useState, useEffect, useRef, useCallback } from 'react';
import type { LibraryText, LibraryVerse } from '../../data/library/types';
import { FavoriteButton } from '../Favorites/FavoriteButton';
import { ShareButton } from '../Share/ShareButton';
import { ExplainButton, ExplainPanel } from '../Explain';
import { updateReadingProgress, toggleBookmark, isBookmarked, getReadingProgress } from '../../lib/readingProgress';
import { ALL_SOURCES } from '../../core/library/registry';
import type { HistoricalIntro } from '../../core/library/types';
import type { TextExplanation } from '../../lib/textExplain';

type TextReaderProps = {
  text: LibraryText;
  onBack: () => void;
  initialVerse?: number;
};

// Helper to get source data from text title - uses registry for accurate mapping
function getSource(title: string) {
  return ALL_SOURCES.find(s => s.name === title);
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
      updateReadingProgress(
        sourceId,
        verse.id,
        currentIndex,
        verse.chapter,
        verse.number
      );
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
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>

          {/* TOC Toggle */}
          <button
            onClick={() => setShowToc(!showToc)}
            className={`p-2 rounded-lg transition-colors ${
              showToc ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80'
            }`}
            title="Table of contents"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <IntroductionPanel
          intro={source.historicalIntro}
          source={source}
          onClose={() => setShowIntro(false)}
        />
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
      {!showIntro && !showToc && (
        viewMode === 'single' ? (
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
          <ListView
            text={text}
            currentIndex={currentIndex}
            onSelect={goToVerse}
          />
        )
      )}
    </div>
  );
}

type SingleVerseViewProps = {
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

function SingleVerseView({ verse, text, index, total, onPrev, onNext, verseRef, bookmarked, onToggleBookmark }: SingleVerseViewProps) {
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
            <p className="text-sm md:text-base text-white/70 leading-relaxed">
              {verse.commentary}
            </p>
          </div>
        )}

        {verse.keywords && verse.keywords.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {verse.keywords.map((keyword) => (
              <span
                key={keyword}
                className="text-xs px-2 py-1 bg-white/5 rounded-full text-white/40"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex items-center justify-end gap-2">
          {/* Explain Button */}
          <ExplainButton
            text={verse.text}
            source={text.title}
            onExplanation={setExplanation}
            isExpanded={explanation !== null}
          />
          {/* Bookmark Button */}
          <button
            onClick={onToggleBookmark}
            className={`p-2 rounded-lg transition-colors ${
              bookmarked 
                ? 'text-amber-400 bg-amber-400/10' 
                : 'text-white/40 hover:text-white/80 hover:bg-white/10'
            }`}
            title={bookmarked ? 'Remove bookmark' : 'Bookmark this verse'}
          >
            <svg 
              className="w-5 h-5" 
              fill={bookmarked ? 'currentColor' : 'none'} 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
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
        {explanation && (
          <ExplainPanel
            explanation={explanation}
            onClose={() => setExplanation(null)}
          />
        )}
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
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

type ListViewProps = {
  text: LibraryText;
  currentIndex: number;
  onSelect: (index: number) => void;
};

function ListView({ text, currentIndex, onSelect }: ListViewProps) {
  return (
    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
      {text.verses.map((verse, index) => (
        <button
          key={verse.id}
          onClick={() => onSelect(index)}
          className={`w-full text-left p-4 rounded-xl transition-all ${
            index === currentIndex
              ? 'bg-gradient-to-r from-violet-500/20 to-indigo-500/20 border border-violet-500/30'
              : 'bg-white/5 border border-white/10 hover:bg-white/10'
          }`}
        >
          <div className="flex items-start gap-3">
            <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
              index === currentIndex ? 'bg-violet-500/30 text-violet-200' : 'bg-white/10 text-white/50'
            }`}>
              {verse.number}
            </span>
            <p className="text-sm text-white/80 line-clamp-2">
              {verse.text}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

type TableOfContentsProps = {
  text: LibraryText;
  currentIndex: number;
  onSelect: (index: number) => void;
  onClose: () => void;
};

function TableOfContents({ text, currentIndex, onSelect, onClose }: TableOfContentsProps) {
  const sections = text.sections || text.chapters;

  if (!sections) {
    return (
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <p className="text-sm text-white/60 text-center">
          This text does not have chapters or sections.
        </p>
        <button
          onClick={onClose}
          className="w-full mt-3 py-2 text-sm text-white/60 hover:text-white transition-colors"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2 max-h-[60vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-white/70">Contents</h3>
        <button
          onClick={onClose}
          className="p-1 text-white/40 hover:text-white/80 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {sections.map((section, sectionIndex) => {
        // Find the first verse index for this section
        const sectionId = 'id' in section ? section.id : undefined;
        const sectionNumber = 'number' in section ? section.number : undefined;
        
        let startIndex = 0;
        if (sectionId) {
          startIndex = text.verses.findIndex(v => v.section === sectionId);
        } else if (sectionNumber) {
          startIndex = text.verses.findIndex(v => v.chapter === sectionNumber);
        }
        
        const isActive = currentIndex >= startIndex && 
          (sectionIndex === sections.length - 1 || 
           currentIndex < (sections[sectionIndex + 1] as any).number ? 
             text.verses.findIndex(v => v.chapter === (sections[sectionIndex + 1] as any).number) :
             text.verses.findIndex(v => v.section === (sections[sectionIndex + 1] as any).id)
          );

        return (
          <button
            key={sectionId || sectionNumber}
            onClick={() => onSelect(startIndex >= 0 ? startIndex : 0)}
            className={`w-full text-left p-3 rounded-lg transition-all ${
              isActive
                ? 'bg-violet-500/20 border border-violet-500/30'
                : 'bg-white/5 border border-transparent hover:bg-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/80">
                {'title' in section ? section.title : `Chapter ${sectionNumber}`}
              </span>
              <span className="text-xs text-white/40">
                {section.verseCount} verses
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

type IntroductionPanelProps = {
  intro: HistoricalIntro;
  source: { name: string; period?: string; originalLanguage?: string; icon?: string };
  onClose: () => void;
};

function IntroductionPanel({ intro, source, onClose }: IntroductionPanelProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('origin');

  const sections = [
    { id: 'origin', title: 'Origins', icon: '🌍', content: intro.origin },
    { id: 'author', title: 'Author & Transmission', icon: '✍️', content: intro.author },
    { id: 'significance', title: 'Significance', icon: '💎', content: intro.significance },
    { id: 'howToRead', title: 'How to Read', icon: '📖', content: intro.howToRead },
  ];

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-2xl p-6 border border-violet-500/30">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-3xl mb-2 block">{source.icon || '📜'}</span>
            <h3 className="text-lg font-serif text-white mb-1">About This Text</h3>
            <div className="flex items-center gap-3 text-xs text-white/50">
              {source.period && <span>{source.period}</span>}
              {source.originalLanguage && (
                <>
                  <span className="text-white/20">•</span>
                  <span>{source.originalLanguage}</span>
                </>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white/80 transition-colors rounded-lg hover:bg-white/10"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expandable Sections */}
      <div className="space-y-2">
        {sections.map((section) => (
          <div
            key={section.id}
            className="rounded-xl overflow-hidden border border-white/10"
          >
            <button
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
              className={`w-full flex items-center justify-between p-4 transition-colors ${
                expandedSection === section.id ? 'bg-white/10' : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-2 text-sm font-medium text-white">
                <span>{section.icon}</span>
                <span>{section.title}</span>
              </span>
              <svg
                className={`w-5 h-5 text-white/50 transition-transform ${
                  expandedSection === section.id ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedSection === section.id && (
              <div className="p-4 bg-white/5 border-t border-white/10">
                <p className="text-sm text-white/80 leading-relaxed">
                  {section.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Begin Reading Button */}
      <button
        onClick={onClose}
        className="w-full py-3 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 rounded-xl text-white font-medium shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.02]"
      >
        Begin Reading
      </button>
    </div>
  );
}


