import type { JournalPrompt } from '@data/journalPrompts';

export type DailyPromptCardProps = {
  prompt: JournalPrompt;
  onStart: () => void;
};

export function DailyPromptCard({ prompt, onStart }: DailyPromptCardProps) {
  return (
    <button
      onClick={onStart}
      className="w-full text-left bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl p-5 border border-amber-400/20 hover:border-amber-400/40 transition-all group"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">✨</span>
        <div className="flex-1">
          <p className="text-sm text-amber-300/70 mb-1">Today's Prompt</p>
          <p className="text-white font-serif leading-relaxed">
            {prompt.text}
          </p>
          <p className="mt-3 text-sm text-amber-300/60 flex items-center gap-1 group-hover:text-amber-300 transition-colors">
            <span>Start writing</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </p>
        </div>
      </div>
    </button>
  );
}
