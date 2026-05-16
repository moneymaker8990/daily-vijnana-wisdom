import type { SupabaseClient } from '@supabase/supabase-js';
import type { ChapterRef, ChapterLoadResult } from '@core/catalog/largeWorkArchitecture';
import { mapCatalogTextSegmentRows } from '@core/catalog/largeTextSegments';
import { fetchApprovedSegmentsForWork } from './publicSegments';

export async function loadApprovedChapterSegments(
  supabase: SupabaseClient,
  ref: ChapterRef
): Promise<ChapterLoadResult> {
  const { data, error } = await fetchApprovedSegmentsForWork(supabase, ref.workId, {
    chapter: ref.chapterIndex,
  });

  if (error) {
    return {
      ref,
      status: 'error',
      segments: [],
      errorMessage: error.message,
    };
  }

  const segments = mapCatalogTextSegmentRows(data ?? []);

  return {
    ref,
    status: segments.length > 0 ? 'ready' : 'empty',
    segments,
  };
}
