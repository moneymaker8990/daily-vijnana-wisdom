/**
 * ConfirmModal - Themed confirmation dialog
 *
 * Replaces native confirm() with glass-morphism styled modal.
 * Supports 'danger' and 'default' variants.
 */

import { useEffect, useRef } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'default';
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Auto-focus cancel button for safety
  useEffect(() => {
    if (isOpen) cancelRef.current?.focus();
  }, [isOpen]);

  // Escape key to cancel
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const confirmStyles =
    variant === 'danger'
      ? 'bg-red-500 hover:bg-red-400 shadow-red-500/25'
      : 'bg-violet-500 hover:bg-violet-400 shadow-violet-500/25';

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-message"
    >
      <div
        className="relative w-full max-w-sm bg-gradient-to-br from-slate-900/95 to-indigo-950/95 rounded-2xl border border-white/10 shadow-2xl p-6 space-y-4"
        onClick={e => e.stopPropagation()}
      >
        <h2 id="confirm-title" className="text-lg font-serif text-white">{title}</h2>
        <p id="confirm-message" className="text-sm text-white/60 leading-relaxed">{message}</p>

        <div className="flex gap-3 pt-2">
          <button
            ref={cancelRef}
            onClick={onCancel}
            className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-white/80 text-sm transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-xl text-white text-sm font-medium shadow-lg transition-all ${confirmStyles}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
