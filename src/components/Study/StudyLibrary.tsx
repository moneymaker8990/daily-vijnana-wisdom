import { useState, useEffect } from 'react';
import { getAllSources, getVerseCount } from '@core/library/engine';
import { getAllLibraryTexts } from '@core/library/adapter';
import type { Source } from '@core/library/types';
import type { LibraryText } from '@data/library/types';
import { TextReader } from './TextReader';
import { getReadingProgress, type ReadingProgress } from '@lib/readingProgress';

export function StudyLibrary() {
  const [selectedText, setSelectedText] = useState<LibraryText | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sources, setSources] = useState<Source[]>([]);
  const [libraryTexts, setLibraryTexts] = useState<LibraryText[]>([]);
  const [progress, setProgress] = useState<Record<string, ReadingProgress>>({});

  // Load sources and progress on mount
  useEffect(() => {
    const allSources = getAllSources();
    setSources(allSources);
    
    const allTexts = getAllLibraryTexts();
    setLibraryTexts(allTexts);
    
    // Load reading progress for all sources
    const progressMap: Record<string, ReadingProgress> = {};
    allSources.forEach(source => {
      const p = getReadingProgress(source.id);
      if (p) progressMap[source.id] = p;
    });
    setProgress(progressMap);
  }, []);

  // Handle text selection with bookmark resume
  const handleSelectText = (source: Source) => {
    const text = libraryTexts.find(t => t.title === source.name);
    if (text) {
      setSelectedText(text);
    }
  };

  // Get initial verse from bookmark
  const getInitialVerse = (sourceId: string): number => {
    const p = progress[sourceId];
    if (p?.lastVerseIndex !== undefined) {
      return p.lastVerseIndex;
    }
    return 0;
  };

  if (selectedText) {
    // Find the source ID from the selected text
    const source = sources.find(s => s.name === selectedText.title);
    const initialVerse = source ? getInitialVerse(source.id) : 0;
    
    return (
      <TextReader
        text={selectedText}
        onBack={() => setSelectedText(null)}
        initialVerse={initialVerse}
      />
    );
  }

  // Filter sources based on search
  const filteredSources = sources.filter(source => 
    source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    source.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    source.tradition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group sources by tradition
  const sourcesByTradition = filteredSources.reduce((acc, source) => {
    const tradition = source.tradition;
    if (!acc[tradition]) acc[tradition] = [];
    acc[tradition].push(source);
    return acc;
  }, {} as Record<string, Source[]>);

  const traditionOrder = ['Hindu', 'Buddhist', 'Taoist', 'Tantric', 'Zen', 'Sufi', 'ChristianMystic', 'Hermetic'];
  const sortedTraditions = Object.keys(sourcesByTradition).sort(
    (a, b) => traditionOrder.indexOf(a) - traditionOrder.indexOf(b)
  );

  return (
    <div className="space-y-6">
      {/* Subheader - main title is in AppLayout */}
      <div className="text-center pb-4 border-b border-white/10">
        <p className="text-sm text-white/60">
          Complete texts from seven wisdom traditions
        </p>
      </div>

      {/* Search */}
      <div className="relative" role="search">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search texts, traditions, themes..."
          aria-label="Search texts, traditions, and themes"
          className="w-full px-4 py-3 pl-10 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Texts by Tradition */}
      <div className="space-y-8">
        {sortedTraditions.map(tradition => (
          <div key={tradition} className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-violet-300/70 font-medium flex items-center gap-2">
              <span>{getTraditionIcon(tradition)}</span>
              <span>{getTraditionLabel(tradition)}</span>
              <span className="text-white/30">({sourcesByTradition[tradition].length})</span>
            </h3>
            
            <div className="grid gap-3">
              {sourcesByTradition[tradition].map(source => (
                <SourceCard
                  key={source.id}
                  source={source}
                  onSelect={() => handleSelectText(source)}
                  progress={progress[source.id]}
                  actualVerseCount={getVerseCount(source.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="text-center pt-4 border-t border-white/10">
        <p className="text-xs text-white/40">
          {sources.reduce((sum, s) => sum + getVerseCount(s.id), 0)} verses loaded • 
          {' '}{sources.length} sacred texts
        </p>
      </div>
    </div>
  );
}

type SourceCardProps = {
  source: Source;
  onSelect: () => void;
  progress?: ReadingProgress;
  actualVerseCount: number;
};

function SourceCard({ source, onSelect, progress, actualVerseCount }: SourceCardProps) {
  const progressPercent = progress
    ? Math.round((progress.lastVerseIndex / actualVerseCount) * 100)
    : 0;

  return (
    <button
      onClick={onSelect}
      className="w-full text-left bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 border border-white/10 transition-all duration-300 group hover:from-white/15 hover:to-white/10 hover:border-white/20"
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl flex-shrink-0">
          {source.icon || '📜'}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-serif text-white group-hover:text-violet-200 transition-colors truncate">
              {source.name}
            </h3>
          </div>
          <p className="text-xs text-white/50 mb-2 line-clamp-1">
            {source.description}
          </p>

          <div className="flex items-center gap-3 text-xs text-white/40">
            <span>{actualVerseCount} verses</span>
            {source.period && (
              <>
                <span className="text-white/20">•</span>
                <span>{source.period}</span>
              </>
            )}
            {progress && progressPercent > 0 && (
              <>
                <span className="text-white/20">•</span>
                <span className="text-violet-300">{progressPercent}% read</span>
              </>
            )}
          </div>

          {progress && progressPercent > 0 && (
            <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}
        </div>

        <div className="flex-shrink-0 transition-transform group-hover:translate-x-1">
          <svg className="w-5 h-5 text-white/40 group-hover:text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}

function getTraditionIcon(tradition: string): string {
  const icons: Record<string, string> = {
    'Hindu': '🙏',
    'Buddhist': '☸️',
    'Taoist': '☯️',
    'Tantric': '🕉️',
    'Zen': '🌀',
    'Sufi': '🌹',
    'ChristianMystic': '✝️',
    'Hermetic': '⚗️',
  };
  return icons[tradition] || '📜';
}

function getTraditionLabel(tradition: string): string {
  const labels: Record<string, string> = {
    'Hindu': 'Hindu Tradition',
    'Buddhist': 'Buddhist Tradition',
    'Taoist': 'Taoist Tradition',
    'Tantric': 'Tantric Tradition',
    'Zen': 'Zen Tradition',
    'Sufi': 'Sufi Tradition',
    'ChristianMystic': 'Christian Mysticism',
    'Hermetic': 'Hermetic Tradition',
  };
  return labels[tradition] || tradition;
}
