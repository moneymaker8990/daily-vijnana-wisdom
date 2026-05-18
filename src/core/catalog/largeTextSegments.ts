import type { CatalogTextSegmentRow } from '@lib/ingestion/publicSegments';

export type LargeTextSegment = {
  id: string;
  versionId: string;
  workId: string;
  chapterIndex: number | null;
  segmentIndex: number;
  section: string | null;
  verseNumber: number | null;
  sutraNumber: number | null;
  canonicalRef: string | null;
  displayLabel: string;
  devanagari: string | null;
  transliteration: string | null;
  translation: string | null;
  commentary: string | null;
  contentKind: string;
  sortKey: string;
};

function formatFallbackDisplayLabel(row: CatalogTextSegmentRow, segmentIndex: number): string {
  const chapter = row.chapter != null ? `Chapter ${row.chapter}` : 'Unchaptered';
  if (row.verse_number != null) return `${chapter} · Verse ${row.verse_number}`;
  if (row.sutra_number != null) return `${chapter} · Sutra ${row.sutra_number}`;
  if (row.section) return `${chapter} · ${row.section}`;
  return `${chapter} · Segment ${segmentIndex + 1}`;
}

export function mapCatalogTextSegmentRow(
  row: CatalogTextSegmentRow,
  segmentIndex: number
): LargeTextSegment {
  return {
    id: row.id,
    versionId: row.version_id,
    workId: row.work_id,
    chapterIndex: row.chapter,
    segmentIndex,
    section: row.section,
    verseNumber: row.verse_number,
    sutraNumber: row.sutra_number,
    canonicalRef: row.canonical_reference,
    displayLabel: row.canonical_reference ?? formatFallbackDisplayLabel(row, segmentIndex),
    devanagari: row.devanagari,
    transliteration: row.transliteration,
    translation: row.translation,
    commentary: row.commentary,
    contentKind: row.content_kind,
    sortKey: row.sort_key,
  };
}

export function mapCatalogTextSegmentRows(rows: CatalogTextSegmentRow[]): LargeTextSegment[] {
  return rows.map((row, index) => mapCatalogTextSegmentRow(row, index));
}
