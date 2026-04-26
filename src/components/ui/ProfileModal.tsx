import { useEffect, useRef, useState } from 'react';
import type { AuthUser } from '../../lib/auth';
import { type EntitlementState, getEntitlementState } from '../../lib/subscription';

type ProfileModalProps = {
  isOpen: boolean;
  user: AuthUser;
  onClose: () => void;
};

function formatSyncedAt(iso?: string): string {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function sourceLabel(source: EntitlementState['source']): string {
  switch (source) {
    case 'stripe':
      return 'Web (Stripe)';
    case 'revenuecat':
      return 'App Store / Google Play';
    case 'scaffold':
      return 'Development';
    default:
      return '—';
  }
}

export function ProfileModal({ isOpen, user, onClose }: ProfileModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [entitlement, setEntitlement] = useState<EntitlementState>(() => getEntitlementState());

  useEffect(() => {
    if (!isOpen) return;
    setEntitlement(getEntitlementState());
  }, [isOpen]);

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

  const displayName = user.user_metadata?.full_name || user.email || 'User';
  const avatarUrl = user.user_metadata?.avatar_url;

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-title"
      aria-describedby="profile-desc"
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/95 to-indigo-950/95 p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4 mb-5">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt=""
              className="w-14 h-14 rounded-full border border-white/20 flex-shrink-0"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-lg font-medium flex-shrink-0">
              {displayName
                .split(' ')
                .map((n: string) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </div>
          )}
          <div className="min-w-0">
            <h2 id="profile-title" className="text-xl font-serif text-white truncate">
              {displayName}
            </h2>
            <p id="profile-desc" className="text-sm text-white/60 break-all">
              {user.email}
            </p>
            <p className="text-xs text-white/40 mt-1 font-mono truncate" title={user.id}>
              ID: {user.id}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm border-t border-white/10 pt-5">
          <div>
            <p className="text-xs uppercase tracking-wide text-white/45 mb-1">Plan</p>
            <p className="text-white/90 capitalize">{entitlement.tier}</p>
            {entitlement.tier === 'premium' && entitlement.source && (
              <p className="text-white/55 text-xs mt-0.5">{sourceLabel(entitlement.source)}</p>
            )}
            {entitlement.tier === 'free' && (
              <p className="text-white/50 text-xs mt-2 leading-relaxed">
                Subscription status updates when you sign in and after checkout or restore purchases.
              </p>
            )}
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-white/45 mb-1">Last entitlement sync</p>
            <p className="text-white/85">{formatSyncedAt(entitlement.lastSyncedAt)}</p>
          </div>
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="w-full mt-6 rounded-xl bg-white/10 hover:bg-white/20 py-2.5 text-sm text-white/90 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
