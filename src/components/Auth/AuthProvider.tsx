/**
 * AuthProvider - React context for authentication state
 * 
 * Provides auth state and methods to the entire app.
 */

import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from 'react';
import { supabase } from '@lib/supabase';
import {
  type AuthUser,
  type AuthSession,
  onAuthStateChange,
  signInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
  signOut,
  resetPassword,
} from '@lib/auth';
import { syncAllOnLogin } from '@lib/dataSync';

interface AuthContextType {
  user: AuthUser | null;
  session: AuthSession | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signInGoogle: () => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);
  const initializedRef = useRef(false);
  const currentUserIdRef = useRef<string | null>(null);

  // Initialize auth state — use getSession() only (not getUser in parallel with getSession).
  // After OAuth, the session is established from the URL on first getSession; getUser() can
  // briefly disagree and leave the app looking signed-out.
  useEffect(() => {
    let cancelled = false;
    const initAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (cancelled) return;
        if (error) {
          return;
        }
        setSession(session);
        setUser(session?.user ?? null);
        currentUserIdRef.current = session?.user?.id ?? null;
        initializedRef.current = true;
        if (session?.user) {
          void syncAllOnLogin(session.user);
        }
      } catch {
        // Auth initialization error handled silently
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void initAuth();

    // Subscribe to auth changes
    const subscription = onAuthStateChange((event, newUser, newSession) => {
      const previousUserId = currentUserIdRef.current;
      const nextUserId = newUser?.id ?? null;

      currentUserIdRef.current = nextUserId;
      setUser(newUser);
      setSession(newSession);
      setLoading(false);
      
      if (!initializedRef.current) {
        return;
      }

      const shouldSync =
        Boolean(newUser) &&
        nextUserId !== previousUserId &&
        (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED');

      // Sync data only on real login/account transitions, not every repeated auth callback.
      if (newUser && shouldSync) {
        void syncAllOnLogin(newUser);
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const result = await signInWithEmail(email, password);
    if (result.error) {
      return { error: result.error.message };
    }
    return { error: null };
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const result = await signUpWithEmail(email, password);
    if (result.error) {
      return { error: result.error.message };
    }
    return { error: null };
  }, []);

  const signInGoogle = useCallback(async () => {
    const result = await signInWithGoogle();
    if (result.error) {
      return { error: result.error.message };
    }
    return { error: null };
  }, []);

  const logout = useCallback(async () => {
    await signOut();
    setUser(null);
    setSession(null);
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    const result = await resetPassword(email);
    if (result.error) {
      return { error: result.error.message };
    }
    return { error: null };
  }, []);

  const value: AuthContextType = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signInGoogle,
    logout,
    forgotPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

