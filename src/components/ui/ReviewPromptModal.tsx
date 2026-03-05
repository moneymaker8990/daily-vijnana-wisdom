import { useEffect, useRef } from 'react';

type ReviewPromptModalProps = {
  isOpen: boolean;
  onRateNow: () => void;
  onLater: () => void;
  onNoThanks: () => void;
};

export function ReviewPromptModal({
  isOpen,
  onRateNow,
  onLater,
  onNoThanks,
}: ReviewPromptModalProps) {
  const laterRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) laterRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onLater();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onLater]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[96] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-title"
      aria-describedby="review-desc"
    >
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/95 to-indigo-950/95 p-6 shadow-2xl">
        <h2 id="review-title" className="text-lg font-serif text-white mb-2">
          Enjoying MindVanta?
        </h2>
        <p id="review-desc" className="text-sm text-white/65 leading-relaxed mb-5">
          If the app is helping your daily practice, a quick review makes a big difference.
        </p>

        <div className="space-y-2">
          <button
            onClick={onRateNow}
            className="w-full rounded-xl bg-violet-500 hover:bg-violet-400 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition-all"
          >
            Leave a review
          </button>
          <button
            ref={laterRef}
            onClick={onLater}
            className="w-full rounded-xl bg-white/10 hover:bg-white/20 py-2.5 text-sm text-white/80 transition-colors"
          >
            Maybe later
          </button>
          <button
            onClick={onNoThanks}
            className="w-full rounded-xl py-2 text-xs text-white/45 hover:text-white/65 transition-colors"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}
