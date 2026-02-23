/**
 * OfflineIndicator - Connection status banner
 *
 * Shows a subtle amber banner when the device is offline.
 * Flashes green briefly on reconnection.
 */

import { useState, useEffect } from 'react';

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => {
      setIsOffline(false);
      setShowReconnected(true);
      setTimeout(() => setShowReconnected(false), 2500);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isOffline && !showReconnected) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-0 left-0 right-0 z-[110] text-center py-1.5 text-xs font-medium animate-slideDown ${
        isOffline
          ? 'bg-amber-500/90 text-amber-950'
          : 'bg-emerald-500/90 text-emerald-950'
      }`}
    >
      {isOffline ? 'You are offline — some features may be unavailable' : 'Back online'}
    </div>
  );
}
