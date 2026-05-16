import { describe, expect, it } from 'vitest';
import type { CatalogTextSegmentRow } from '@lib/ingestion/publicSegments';
import { loadApprovedChapterSegments } from '@lib/ingestion/segmentChapterLoader';

type QueryResult = {
  data: CatalogTextSegmentRow[] | null;
  error: { message: string } | null;
};

function createSupabaseStub(result: QueryResult) {
  const calls: string[] = [];
  const query = {
    select(columns: string) {
      calls.push(`select:${columns}`);
      return query;
    },
    eq(column: string, value: string | number) {
      calls.push(`eq:${column}:${value}`);
      return query;
    },
    order(column: string, opts: { ascending: boolean }) {
      calls.push(`order:${column}:${opts.ascending}`);
      return query;
    },
    limit(value: number) {
      calls.push(`limit:${value}`);
      return query;
    },
    then(resolve: (value: QueryResult) => void) {
      resolve(result);
    },
  };

  return {
    calls,
    client: {
      from(table: string) {
        calls.push(`from:${table}`);
        return query;
      },
    },
  };
}

const row: CatalogTextSegmentRow = {
  id: 'seg-1',
  version_id: 'version-1',
  work_id: 'tantraloka',
  chapter: 2,
  section: null,
  verse_number: 1,
  sutra_number: null,
  canonical_reference: 'Tantraloka 2.1',
  devanagari: null,
  transliteration: 'atha',
  translation: 'Now...',
  commentary: null,
  content_kind: 'source_text',
  sort_key: '0002.0001',
};

describe('segment chapter loader', () => {
  it('loads approved segments for one chapter through the public RLS-gated query', async () => {
    const stub = createSupabaseStub({ data: [row], error: null });

    const result = await loadApprovedChapterSegments(stub.client, {
      workId: 'tantraloka',
      chapterIndex: 2,
    });

    expect(stub.calls).toEqual([
      'from:catalog_text_segment',
      'select:*',
      'eq:work_id:tantraloka',
      'order:sort_key:true',
      'eq:chapter:2',
    ]);
    expect(result.status).toBe('ready');
    expect(result.ref).toEqual({ workId: 'tantraloka', chapterIndex: 2 });
    expect(result.segments.map((segment) => segment.displayLabel)).toEqual(['Tantraloka 2.1']);
  });

  it('returns an empty state when RLS exposes no rows for the chapter', async () => {
    const stub = createSupabaseStub({ data: [], error: null });

    const result = await loadApprovedChapterSegments(stub.client, {
      workId: 'tantraloka',
      chapterIndex: 2,
    });

    expect(result.status).toBe('empty');
    expect(result.segments).toEqual([]);
  });

  it('returns an error state without throwing when Supabase rejects the read', async () => {
    const stub = createSupabaseStub({ data: null, error: { message: 'permission denied' } });

    const result = await loadApprovedChapterSegments(stub.client, {
      workId: 'tantraloka',
      chapterIndex: 2,
    });

    expect(result.status).toBe('error');
    expect(result.errorMessage).toBe('permission denied');
  });
});
