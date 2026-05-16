import type { SupabaseClient } from '@supabase/supabase-js';

export type CatalogTextSegmentRow = {
  id: string;
  version_id: string;
  work_id: string;
  chapter: number | null;
  section: string | null;
  verse_number: number | null;
  sutra_number: number | null;
  canonical_reference: string | null;
  devanagari: string | null;
  transliteration: string | null;
  translation: string | null;
  commentary: string | null;
  content_kind: string;
  sort_key: string;
};

/**
 * Load segments visible to the current Supabase client (anon or user).
 * RLS only returns rows tied to versions with both commercial + display approval.
 */
export async function fetchApprovedSegmentsForWork(
  supabase: SupabaseClient,
  workId: string,
  opts?: { chapter?: number; limit?: number }
) {
  let q = supabase
    .from('catalog_text_segment')
    .select('*')
    .eq('work_id', workId)
    .order('sort_key', { ascending: true });

  if (opts?.chapter != null) {
    q = q.eq('chapter', opts.chapter);
  }
  if (opts?.limit != null) {
    q = q.limit(opts.limit);
  }

  return q;
}
