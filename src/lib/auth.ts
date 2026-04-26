/**
 * Authentication Helpers
 *
 * Wrapper functions for Supabase auth operations.
 */

import { supabase } from './supabase';
import type { User, Session, AuthError, AuthChangeEvent } from '@supabase/supabase-js';

export type AuthUser = User;
export type AuthSession = Session;

/**
 * Base URL for OAuth and password-reset redirects.
 * Must be your real app (Vercel/custom domain), never the Supabase project URL — otherwise after
 * Google sign-in the browser opens `*.supabase.co` and shows "No API key found in request".
 */
function getAuthRedirectOrigin(): string {
  const trim = (s: string) => s.trim().replace(/\/+$/, '');
  const fromEnv = import.meta.env.VITE_APP_BASE_URL;
  let base: string;
  if (typeof fromEnv === 'string' && fromEnv.trim().length > 0) {
    base = trim(fromEnv);
  } else {
    base = typeof window !== 'undefined' ? window.location.origin : '';
  }
  try {
    const { hostname } = new URL(base || 'https://invalid');
    if (hostname.endsWith('.supabase.co')) {
      if (import.meta.env.DEV) {
        console.warn(
          '[auth] VITE_APP_BASE_URL must be your app URL (e.g. https://your-app.vercel.app), not *.supabase.co. Using current origin.'
        );
      }
      return typeof window !== 'undefined' ? window.location.origin : base;
    }
  } catch {
    return typeof window !== 'undefined' ? window.location.origin : base;
  }
  return base || (typeof window !== 'undefined' ? window.location.origin : '');
}

export interface AuthResult {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

/**
 * Sign up with email and password
 */
export async function signUpWithEmail(email: string, password: string): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return {
    user: data.user,
    session: data.session,
    error,
  };
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return {
    user: data.user,
    session: data.session,
    error,
  };
}

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle(): Promise<{ error: AuthError | null }> {
  const origin = getAuthRedirectOrigin();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // Full app URL; query/hash tokens are appended by Supabase Auth
      redirectTo: origin ? `${origin}/` : undefined,
    },
  });

  return { error };
}

/**
 * Sign out
 */
export async function signOut(): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<User | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Get current session
 */
export async function getCurrentSession(): Promise<Session | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

/**
 * Reset password
 */
export async function resetPassword(email: string): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getAuthRedirectOrigin()}/reset-password`,
  });
  return { error };
}

/**
 * Update password
 */
export async function updatePassword(newPassword: string): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  return { error };
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(
  callback: (event: AuthChangeEvent, user: User | null, session: Session | null) => void
) {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(_event, session?.user ?? null, session);
  });

  return subscription;
}

