/**
 * Toast Notification System
 *
 * Context-based toast with success/error/info variants.
 * Glass-morphism styling matching the app's design.
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type ToastVariant = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextType {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast(): ToastContextType {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

const VARIANT_STYLES: Record<ToastVariant, string> = {
  success: 'bg-emerald-500/15 border-emerald-400/30 text-emerald-200',
  error: 'bg-red-500/15 border-red-400/30 text-red-200',
  info: 'bg-violet-500/15 border-violet-400/30 text-violet-200',
};

const VARIANT_ICONS: Record<ToastVariant, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, variant: ToastVariant) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts(prev => {
      const next = [...prev, { id, message, variant }];
      // Max 3 visible
      return next.slice(-3);
    });

    const duration = variant === 'error' ? 6000 : 4000;
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const ctx: ToastContextType = {
    success: useCallback((msg: string) => addToast(msg, 'success'), [addToast]),
    error: useCallback((msg: string) => addToast(msg, 'error'), [addToast]),
    info: useCallback((msg: string) => addToast(msg, 'info'), [addToast]),
  };

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      {/* Toast container — fixed above tab nav */}
      <div className="fixed bottom-24 left-0 right-0 z-[100] flex flex-col items-center gap-2 pointer-events-none px-4">
        {toasts.map(toast => (
          <div
            key={toast.id}
            role="status"
            aria-live="polite"
            className={`pointer-events-auto max-w-sm w-full px-4 py-3 rounded-xl border backdrop-blur-xl shadow-lg flex items-center gap-3 animate-slideUp ${VARIANT_STYLES[toast.variant]}`}
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
              {VARIANT_ICONS[toast.variant]}
            </span>
            <p className="text-sm leading-snug">{toast.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
