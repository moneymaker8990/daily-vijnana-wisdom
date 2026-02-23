/**
 * ExplainButton - Button to trigger AI explanation
 * 
 * Shows a lightbulb icon that, when clicked, fetches an AI explanation.
 */

import { useState } from 'react';
import { explainText, type TextExplanation } from '@lib/textExplain';
import { useToast } from '../ui';

type ExplainButtonProps = {
  text: string;
  source: string;
  onExplanation: (explanation: TextExplanation) => void;
  isExpanded?: boolean;
};

export function ExplainButton({ text, source, onExplanation, isExpanded = false }: ExplainButtonProps) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleClick = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const { explanation, isAI } = await explainText(text, source);
      onExplanation(explanation);
      if (!isAI) {
        toast.info('Using offline explanation');
      }
    } catch (error) {
      toast.error('Could not load explanation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`p-2 rounded-lg transition-all ${
        isExpanded
          ? 'text-amber-400 bg-amber-400/10'
          : 'text-white/40 hover:text-white/80 hover:bg-white/10'
      } ${loading ? 'cursor-wait' : ''}`}
      title={loading ? 'Getting explanation...' : 'Explain this text'}
      aria-label={loading ? 'Getting explanation' : 'Explain this text'}
      aria-pressed={isExpanded}
    >
      {loading ? (
        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      )}
    </button>
  );
}



