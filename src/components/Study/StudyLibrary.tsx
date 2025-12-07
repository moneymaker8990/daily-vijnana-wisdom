import { useState } from 'react';
import { ALL_LIBRARY_TEXTS, type LibraryText } from '../../data/library';
import { TextReader } from './TextReader';
import { SearchBar } from './SearchBar';

type StudyLibraryProps = {
  isPremium?: boolean;
  onUpgrade?: () => void;
};

export function StudyLibrary({ isPremium = true, onUpgrade }: StudyLibraryProps) {
  const [selectedText, setSelectedText] = useState<LibraryText | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (selectedText) {
    return (
      <TextReader
        text={selectedText}
        onBack={() => setSelectedText(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center pb-4 border-b border-white/10">
        <h2 className="text-2xl md:text-3xl font-serif text-white mb-2">
          Sacred Library
        </h2>
        <p className="text-sm text-white/60">
          Complete texts from seven wisdom traditions
        </p>
      </div>

      {/* Search */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onSelectText={setSelectedText}
      />

      {/* Text Grid */}
      <div className="grid gap-4">
        {ALL_LIBRARY_TEXTS.map((text) => (
          <TextCard
            key={text.id}
            text={text}
            onSelect={() => setSelectedText(text)}
            locked={!isPremium && text.id !== 'vijnana'}
            onUpgrade={onUpgrade}
          />
        ))}
      </div>

      {/* Stats */}
      <div className="text-center pt-4 border-t border-white/10">
        <p className="text-xs text-white/40">
          {ALL_LIBRARY_TEXTS.reduce((sum, t) => sum + t.verses.length, 0)} verses across {ALL_LIBRARY_TEXTS.length} sacred texts
        </p>
      </div>
    </div>
  );
}

type TextCardProps = {
  text: LibraryText;
  onSelect: () => void;
  locked?: boolean;
  onUpgrade?: () => void;
};

function TextCard({ text, onSelect, locked, onUpgrade }: TextCardProps) {
  const icons: Record<string, string> = {
    vijnana: '🕉️',
    tao: '☯️',
    upanishads: '🔥',
    gita: '⚔️',
    ashtavakra: '👁️',
    yogaSutras: '🧘',
    shivaSutras: '🔱',
  };

  return (
    <button
      onClick={locked ? onUpgrade : onSelect}
      className={`w-full text-left bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-5 border border-white/10 transition-all duration-300 group ${
        locked 
          ? 'opacity-60 cursor-not-allowed' 
          : 'hover:from-white/15 hover:to-white/10 hover:border-white/20'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="text-3xl flex-shrink-0">
          {icons[text.id] || '📜'}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-serif text-white group-hover:text-violet-200 transition-colors truncate">
              {text.title}
            </h3>
            {locked && (
              <span className="flex-shrink-0 text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">
                Premium
              </span>
            )}
          </div>
          <p className="text-sm text-white/60 mb-2">
            {text.subtitle}
          </p>
          <p className="text-xs text-white/40 line-clamp-2">
            {text.description}
          </p>
          <div className="flex items-center gap-4 mt-3 text-xs text-white/50">
            <span>{text.totalVerses} verses</span>
            <span className="text-white/30">•</span>
            <span>{text.origin}</span>
          </div>
        </div>

        {/* Arrow */}
        <div className={`flex-shrink-0 transition-transform ${locked ? '' : 'group-hover:translate-x-1'}`}>
          {locked ? (
            <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white/40 group-hover:text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}

