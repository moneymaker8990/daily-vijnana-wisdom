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
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || PLACEHOLDER_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || PLACEHOLDER_SUPABASE_ANON_KEY;

// Check if Supabase is properly configured
export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const hyperProcessorUrl = `${SUPABASE_URL}/functions/v1/hyper-processor`;

export function getSupabaseFunctionHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    apikey: SUPABASE_ANON_KEY,
  };
}

// Create single Supabase client instance
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Export URL for other uses
export { SUPABASE_URL, SUPABASE_ANON_KEY };

