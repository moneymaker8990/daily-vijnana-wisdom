import { useState, useEffect, useRef } from 'react';
import { searchLibrary, type LibraryText } from '../../data/library';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSelectText: (text: LibraryText) => void;
};

export function SearchBar({ value, onChange, onSelectText }: SearchBarProps) {
  const [results, setResults] = useState<ReturnType<typeof searchLibrary>>([]);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.length >= 2) {
      const searchResults = searchLibrary(value).slice(0, 10);
      setResults(searchResults);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [value]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (text: LibraryText, _verseIndex: number) => {
    onSelectText(text);
    setShowResults(false);
    onChange('');
  };

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search all sacred texts..."
          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
        />
        {value && (
          <button
            onClick={() => {
              onChange('');
              setShowResults(false);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white/80 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {showResults && results.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute z-20 w-full mt-2 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="max-h-80 overflow-y-auto">
            {results.map((result) => (
              <button
                key={`${result.text.id}-${result.verseIndex}`}
                onClick={() => handleSelect(result.text, result.verseIndex)}
                className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-b-0"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-violet-300/80">
                    {result.text.title}
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="text-xs text-white/40">
                    Verse {result.text.verses[result.verseIndex].number}
                  </span>
                </div>
                <p className="text-sm text-white/70 line-clamp-2">
                  {result.text.verses[result.verseIndex].text}
                </p>
              </button>
            ))}
          </div>
          <div className="px-4 py-2 bg-white/5 text-xs text-white/40 text-center">
            {results.length} results found
          </div>
        </div>
      )}

      {/* No results */}
      {showResults && value.length >= 2 && results.length === 0 && (
        <div className="absolute z-20 w-full mt-2 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <p className="text-sm text-white/50">No verses found matching "{value}"</p>
        </div>
      )}
    </div>
  );
}


