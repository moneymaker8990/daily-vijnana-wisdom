import { describe, expect, it } from 'vitest';
import type { CatalogTextSegmentRow } from '@lib/ingestion/publicSegments';
import { mapCatalogTextSegmentRow, mapCatalogTextSegmentRows } from '@core/catalog/largeTextSegments';

function segmentRow(overrides: Partial<CatalogTextSegmentRow> = {}): CatalogTextSegmentRow {
  return {
    id: 'segment-1',
    version_id: 'version-1',
    work_id: 'tantraloka',
    chapter: 2,
    section: null,
    verse_number: 4,
    sutra_number: null,
    canonical_reference: 'Tantraloka 2.4',
    devanagari: null,
    transliteration: 'atha',
    translation: 'Now the teaching opens.',
    commentary: null,
    content_kind: 'source_text',
    sort_key: '0002.0004',
    ...overrides,
  };
}

describe('large text segment mapping', () => {
  it('uses canonical references as display labels when present', () => {
    const segment = mapCatalogTextSegmentRow(segmentRow(), 0);

    expect(segment).toMatchObject({
      id: 'segment-1',
      versionId: 'version-1',
      workId: 'tantraloka',
      chapterIndex: 2,
      segmentIndex: 0,
      displayLabel: 'Tantraloka 2.4',
      contentKind: 'source_text',
      sortKey: '0002.0004',
    });
  });

  it('falls back to chapter and verse labels without canonical references', () => {
    const segment = mapCatalogTextSegmentRow(segmentRow({ canonical_reference: null, verse_number: 7 }), 2);

    expect(segment.displayLabel).toBe('Chapter 2 · Verse 7');
    expect(segment.segmentIndex).toBe(2);
  });

  it('falls back to section, sutra, and stable segment labels', () => {
    expect(
      mapCatalogTextSegmentRow(
        segmentRow({ canonical_reference: null, section: 'Invocation', verse_number: null }),
        0
      ).displayLabel
    ).toBe('Chapter 2 · Invocation');

    expect(
      mapCatalogTextSegmentRow(
        segmentRow({ canonical_reference: null, sutra_number: 5, verse_number: null }),
        1
      ).displayLabel
    ).toBe('Chapter 2 · Sutra 5');

    expect(
      mapCatalogTextSegmentRow(
        segmentRow({ canonical_reference: null, chapter: null, verse_number: null, sutra_number: null }),
        3
      ).displayLabel
    ).toBe('Unchaptered · Segment 4');
  });

  it('preserves nullable text fields and maps arrays with stable indexes', () => {
    const rows = [
      segmentRow({ id: 'segment-1', devanagari: 'Devi', translation: null }),
      segmentRow({ id: 'segment-2', transliteration: null, commentary: 'Original commentary.' }),
    ];

    expect(mapCatalogTextSegmentRows(rows)).toEqual([
      expect.objectContaining({
        id: 'segment-1',
        segmentIndex: 0,
        devanagari: 'Devi',
        translation: null,
      }),
      expect.objectContaining({
        id: 'segment-2',
        segmentIndex: 1,
        transliteration: null,
        commentary: 'Original commentary.',
      }),
    ]);
  });
});
