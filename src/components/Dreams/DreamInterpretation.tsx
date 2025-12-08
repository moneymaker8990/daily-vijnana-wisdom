import { useState, useEffect } from 'react';
import { updateDream, type DreamEntry, type DreamInterpretation as DreamInterpretationType } from '../../lib/dreamStorage';
import { interpretDream } from '../../lib/dreamAI';

type DreamInterpretationProps = {
  dream: DreamEntry;
  onBack: () => void;
  isPremium?: boolean;
  onUpgrade?: () => void;
};

export function DreamInterpretation({ dream, onBack, isPremium = true, onUpgrade }: DreamInterpretationProps) {
  const [interpretation, setInterpretation] = useState<DreamInterpretationType | null>(dream.interpretation || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateInterpretation = async () => {
    if (!isPremium) {
      onUpgrade?.();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await interpretDream(dream.content, dream.mood);
      setInterpretation(result);
      
      // Save to dream entry
      updateDream(dream.id, { interpretation: result });
    } catch (err) {
      console.error('Failed to interpret dream:', err);
      setError('Failed to generate interpretation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate if no interpretation exists
  useEffect(() => {
    if (!interpretation && isPremium) {
      generateInterpretation();
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">Dream</span>
        </button>
        <h2 className="text-lg font-serif text-white">Interpretation</h2>
        <div className="w-16" />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block w-12 h-12 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mb-4" />
          <p className="text-white/70 mb-2">Analyzing your dream...</p>
          <p className="text-sm text-white/40">Exploring symbols and meanings</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
          <p className="text-red-300 mb-3">{error}</p>
          <button
            onClick={generateInterpretation}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Interpretation Content */}
      {interpretation && !loading && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-2xl p-6 border border-white/10">
            <h3 className="text-xs uppercase tracking-wider text-violet-300/70 mb-3">Summary</h3>
            <p className="text-white/80 leading-relaxed">{interpretation.summary}</p>
          </div>

          {/* Symbols */}
          {interpretation.symbols.length > 0 && (
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xs uppercase tracking-wider text-white/50 mb-4">Key Symbols</h3>
              <div className="space-y-4">
                {interpretation.symbols.map((symbol, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg">
                      🔮
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white capitalize">{symbol.symbol}</h4>
                      <p className="text-sm text-white/60">{symbol.meaning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Psychological Insight */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-xs uppercase tracking-wider text-white/50 mb-3">
              <span className="inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Psychological Insight
              </span>
            </h3>
            <p className="text-white/80 leading-relaxed">{interpretation.psychologicalInsight}</p>
          </div>

          {/* Spiritual Connection */}
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-white/10">
            <h3 className="text-xs uppercase tracking-wider text-amber-300/70 mb-3">
              <span className="inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Spiritual Connection
              </span>
            </h3>
            <p className="text-white/80 leading-relaxed">{interpretation.spiritualConnection}</p>
          </div>

          {/* Action Suggestion */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-xs uppercase tracking-wider text-white/50 mb-3">Suggested Practice</h3>
            <p className="text-white/80 leading-relaxed">{interpretation.actionSuggestion}</p>
          </div>

          {/* Regenerate Button */}
          <button
            onClick={generateInterpretation}
            disabled={loading}
            className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Generate New Interpretation</span>
          </button>

          {/* Timestamp */}
          <p className="text-center text-xs text-white/30">
            Generated {new Date(interpretation.generatedAt).toLocaleString()}
          </p>
        </div>
      )}

      {/* Premium Gate */}
      {!isPremium && !interpretation && !loading && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-lg text-white mb-2">Premium Feature</h3>
          <p className="text-sm text-white/50 max-w-xs mx-auto mb-4">
            Unlock AI-powered dream interpretations with a Premium subscription.
          </p>
          <button
            onClick={onUpgrade}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl text-white font-medium shadow-lg shadow-amber-500/25 hover:scale-105 transition-transform"
          >
            Upgrade to Premium
          </button>
        </div>
      )}
    </div>
  );
}



