/**
 * Supabase Client
 * 
 * Centralized Supabase client for authentication and database access.
 */

import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const SUPABASE_URL = 'https://coihujjfdhpqfwmibfbi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvaWh1ampmZGhwcWZ3bWliZmJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNTY4MzgsImV4cCI6MjA4MDYzMjgzOH0.tU3rtto0eb61Z6vBFuJMp0OqlQU1UkM1g9UqksSGOYo';

// Create single Supabase client instance
// Using 'any' for now since tables will be created by user running the schema
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Export URL for other uses
export { SUPABASE_URL, SUPABASE_ANON_KEY };

