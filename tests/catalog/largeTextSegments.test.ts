import { describe, expect, it } from 'vitest';
import type { CatalogTextSegmentRow } from '@lib/ingestion/publicSegments';
import {
  mapCatalogTextSegmentRow,
  mapCatalogTextSegmentRows,
} from '@core/catalog/largeTextSegments';

const baseRow: CatalogTextSegmentRow = {
  id: 'seg-1',
  version_id: 'version-1',
  work_id: 'tantraloka',
  chapter: 3,
  section: 'opening',
  verse_number: 12,
  sutra_number: null,
  canonical_reference: 'Tantraloka 3.12',
  devanagari: 'देवनागरी',
  transliteration: 'devanagari',
  translation: 'A clear translation.',
  commentary: 'A short note.',
  content_kind: 'source_text',
  sort_key: '0003.0012',
};

describe('large text segments', () => {
  it('normalizes Supabase segment rows into reader segments without using LibraryVerse', () => {
    const segment = mapCatalogTextSegmentRow(baseRow, 4);

    expect(segment).toEqual({
      id: 'seg-1',
      versionId: 'version-1',
      workId: 'tantraloka',
      chapterIndex: 3,
      segmentIndex: 4,
      section: 'opening',
      verseNumber: 12,
      sutraNumber: null,
      canonicalRef: 'Tantraloka 3.12',
      displayLabel: 'Tantraloka 3.12',
      devanagari: 'देवनागरी',
      transliteration: 'devanagari',
      translation: 'A clear translation.',
      commentary: 'A short note.',
      contentKind: 'source_text',
      sortKey: '0003.0012',
    });
  });

  it('falls back to a stable display label when canonical reference is missing', () => {
    const segment = mapCatalogTextSegmentRow(
      {
        ...baseRow,
        canonical_reference: null,
        verse_number: null,
        sutra_number: 5,
      },
      1
    );

    expect(segment.displayLabel).toBe('Chapter 3 · Sutra 5');
  });

  it('preserves database ordering when mapping rows', () => {
    const segments = mapCatalogTextSegmentRows([
      { ...baseRow, id: 'seg-a', sort_key: '0001.0001' },
      { ...baseRow, id: 'seg-b', sort_key: '0001.0002' },
    ]);

    expect(segments.map((segment) => segment.segmentIndex)).toEqual([0, 1]);
    expect(segments.map((segment) => segment.id)).toEqual(['seg-a', 'seg-b']);
  });
});
