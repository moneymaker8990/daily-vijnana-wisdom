/**
 * Supabase Client
 *
 * Centralized Supabase client for authentication and database access.
 */

import { createClient } from '@supabase/supabase-js';

// Supabase configuration from environment variables
// Falls back to placeholder values to prevent app crash (features requiring Supabase will fail gracefully)
const PLACEHOLDER_SUPABASE_URL = 'https://placeholder.supabase.co';
const PLACEHOLDER_SUPABASE_ANON_KEY = 'placeholder-key';

/** Trim; strip one pair of surrounding quotes (common Vercel copy-paste mistakes). */
function normalizeSupabaseEnv(raw: string): string {
  let s = raw.trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

// Bad env values break the Edge gateway (401). normalizeSupabaseEnv reduces foot-guns.
const SUPABASE_URL = normalizeSupabaseEnv(
  String(import.meta.env.VITE_SUPABASE_URL || PLACEHOLDER_SUPABASE_URL)
);
const SUPABASE_ANON_KEY = normalizeSupabaseEnv(
  String(import.meta.env.VITE_SUPABASE_ANON_KEY || PLACEHOLDER_SUPABASE_ANON_KEY)
);
/** Trailing slash on project URL breaks `/functions/v1/...` joins in some envs. */
const SUPABASE_ORIGIN = SUPABASE_URL.replace(/\/+$/, '');

// Check if Supabase is properly configured
export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const hyperProcessorUrl = `${SUPABASE_ORIGIN}/functions/v1/hyper-processor`;

export function getSupabaseFunctionHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    apikey: SUPABASE_ANON_KEY,
  };
}

// Create single Supabase client instance
export const supabase = createClient(SUPABASE_ORIGIN, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // GoTrue + Google return `?code=`; the client must use PKCE so the code verifier
    // is stored and the code can be exchanged. `implicit` (the JS default) never
    // stores a verifier, so OAuth completion silently fails or errors.
    flowType: 'pkce',
  },
});

/**
 * Public AI edge function — same code path as Spiritual Guide (avoids raw fetch / header gaps).
 */
export async function invokeHyperProcessor<T>(body: Record<string, unknown>): Promise<{ data: T | null; error: unknown }> {
  const { data, error } = await supabase.functions.invoke<T>('hyper-processor', {
    body,
    headers: getSupabaseFunctionHeaders() as Record<string, string>,
    timeout: 30_000,
  });
  return { data, error };
}

// Export URL for other uses (prefer supabaseApiOrigin for joining `/functions/v1/...` paths)
export { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_ORIGIN as supabaseApiOrigin };

