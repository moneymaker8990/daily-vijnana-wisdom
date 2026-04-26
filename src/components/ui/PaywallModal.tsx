import { useEffect, useRef } from 'react';
import { isNativePlatform } from '../../lib/subscription';

type PaywallModalProps = {
  isOpen: boolean;
  triggerContext?: string;
  isBusy?: boolean;
  isSignedIn?: boolean;
  onActivate: () => void;
  onRestore: () => void;
  onSignIn?: () => void;
  onClose: () => void;
};

export function PaywallModal({
  isOpen,
  triggerContext: _triggerContext,
  isBusy = false,
  isSignedIn = true,
  onActivate,
  onRestore,
  onSignIn,
  onClose,
}: PaywallModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const isWeb = !isNativePlatform();
  const needsSignIn = isWeb && !isSignedIn;

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="paywall-title"
      aria-describedby="paywall-desc"
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/95 to-indigo-950/95 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="paywall-title" className="text-xl font-serif text-white mb-2">
          Unlock MindVanta Premium
        </h2>
        <p id="paywall-desc" className="text-sm text-white/65 leading-relaxed mb-4">
          Continue with deeper study pathways, full sacred library access, and advanced dream insights.
        </p>

        <div className="space-y-2 mb-5 text-sm text-white/70">
          <div>- Full study pathway access</div>
          <div>- Complete sacred library collection</div>
          <div>- Advanced dream interpretation depth</div>
          <div>- Cross-device continuity</div>
        </div>

        {isWeb && !needsSignIn && (
          <p className="text-xs text-white/55 leading-relaxed mb-4 border border-white/10 rounded-xl px-3 py-2.5 bg-white/5">
            <span className="text-emerald-400/90 font-medium">7-day free trial</span>
            {' — '}
            Checkout will ask for a card; you are not charged until the trial ends. Cancel before the trial
            ends to avoid being charged.
          </p>
        )}

        {needsSignIn && (
          <p className="text-xs text-amber-400/80 mb-4">
            Sign in to subscribe and unlock premium features.
          </p>
        )}

        <div className="flex gap-3">
          <button
            ref={closeRef}
            onClick={onClose}
            disabled={isBusy}
            className="flex-1 rounded-xl bg-white/10 hover:bg-white/20 py-2.5 text-sm text-white/80 transition-colors"
          >
            Not now
          </button>

          {needsSignIn ? (
            <button
              onClick={onSignIn}
              disabled={isBusy}
              className="flex-1 rounded-xl bg-violet-500 hover:bg-violet-400 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition-all"
            >
              Sign in
            </button>
          ) : (
            <button
              onClick={onActivate}
              disabled={isBusy}
              className="flex-1 rounded-xl bg-violet-500 hover:bg-violet-400 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition-all"
            >
              {isBusy ? 'Processing...' : 'Upgrade'}
            </button>
          )}
        </div>
        <button
          onClick={onRestore}
          disabled={isBusy}
          className="w-full mt-3 text-xs text-white/55 hover:text-white/75 transition-colors"
        >
          {isBusy ? 'Please wait...' : 'Restore purchases'}
        </button>
      </div>
    </div>
  );
}
