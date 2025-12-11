/**
 * UserMenu - User avatar and dropdown menu
 * 
 * Shows sign-in button or user menu based on auth state.
 */

import { useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { AuthModal } from './AuthModal';

export function UserMenu() {
  const { user, loading, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
    );
  }

  if (!user) {
    return (
      <>
        <button
          onClick={() => setShowAuthModal(true)}
          className="px-3 py-1.5 bg-violet-500/20 border border-violet-500/30 rounded-lg text-violet-300 text-sm font-medium hover:bg-violet-500/30 transition-all"
        >
          Sign In
        </button>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </>
    );
  }

  // Get user initials or first letter of email
  const displayName = user.user_metadata?.full_name || user.email || 'User';
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  const avatarUrl = user.user_metadata?.avatar_url;

  const handleSignOut = async () => {
    setShowMenu(false);
    await logout();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-colors"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-8 h-8 rounded-full border border-white/20"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xs font-medium">
            {initials}
          </div>
        )}
      </button>

      {/* Dropdown menu */}
      {showMenu && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900/95 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
          {/* User info */}
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-sm text-white font-medium truncate">{displayName}</p>
            <p className="text-xs text-white/50 truncate">{user.email}</p>
          </div>

          {/* Menu items */}
          <div className="py-1">
            <button
              onClick={() => {
                setShowMenu(false);
                // Could open settings/profile page
              }}
              className="w-full px-4 py-2 text-left text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </button>
            
            <button
              onClick={() => {
                setShowMenu(false);
                // Could open sync status
              }}
              className="w-full px-4 py-2 text-left text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Sync Status
            </button>
          </div>

          {/* Sign out */}
          <div className="border-t border-white/10 py-1">
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-3"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

