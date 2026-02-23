/**
 * WisdomSearch - Full-screen search modal for all 365 days
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { searchWisdom, type WisdomSearchResult } from '@lib/wisdomSearch';
import type { DailyEntry } from '@lib/types';

type WisdomSearchProps = {
  entries: DailyEntry[];
  onGoToDay: (day: number) => void;
  onClose: () => void;
};

export function WisdomSearch({ entries, onGoToDay, onClose }: WisdomSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<WisdomSearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleSearch = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setResults(searchWisdom(value, entries));
      }, 300);
    },
    [entries],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleResultClick = (dayNumber: number) => {
    onGoToDay(dayNumber);
    onClose();
  };

  /** Highlight matched text in snippet */
  const highlightSnippet = (snippet: string) => {
    if (!query.trim()) return snippet;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = snippet.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-violet-400/30 text-white rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 bg-black/20 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close search"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
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
              value={query}
              onChange={handleChange}
              placeholder="Search across 365 days of sacred wisdom..."
              className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all text-sm"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setResults([]);
                  inputRef.current?.focus();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4">
        {!query.trim() ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-white/50 text-sm">Search across 365 days of sacred wisdom</p>
            <p className="text-white/30 text-xs mt-2">
              Try "surrender", "impermanence", "awareness", or any theme
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/50 text-sm">No results found for "{query}"</p>
            <p className="text-white/30 text-xs mt-2">Try different keywords</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-white/40 mb-2">
              {results.length} result{results.length !== 1 ? 's' : ''}
            </p>
            {results.map((result, i) => (
              <button
                key={`${result.dayNumber}-${result.section}-${i}`}
                onClick={() => handleResultClick(result.dayNumber)}
                className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl p-4 transition-all group"
              >
                <div className="flex items-start gap-3">
                  {/* Day number badge */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-500/20 border border-violet-400/30 flex items-center justify-center">
                    <span className="text-xs font-medium text-violet-300">{result.dayNumber}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate">{result.theme}</h4>
                    <p className="text-xs text-violet-300/70 mt-0.5">{result.section}</p>
                    <p className="text-xs text-white/50 mt-1.5 leading-relaxed line-clamp-2">
                      {highlightSnippet(result.snippet)}
                    </p>
                  </div>

                  <svg
                    className="w-4 h-4 text-white/20 group-hover:text-white/50 flex-shrink-0 mt-1 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
