import type { LargeTextSegment } from './largeTextSegments';

/**
 * Phase 1 — Tantrāloka-scale architecture (interfaces only).
 *
 * Phase 2 will implement lazy chapter loading, search indexes, and cache policies.
 * UI must not assume every work fits in a single in-memory `Verse[]`.
 */

export type ChapterRef = {
  workId: string;
  /** Stable within work (e.g. āhnika / chapter index). */
  chapterIndex: number;
  displayTitle?: string;
};

export type SegmentRef = {
  workId: string;
  chapterIndex: number;
  segmentIndex: number;
  canonical_ref?: string;
};

export type ChapterLoadStatus = 'ready' | 'empty' | 'error';

export type ChapterLoadResult = {
  ref: ChapterRef;
  status: ChapterLoadStatus;
  segments: LargeTextSegment[];
  errorMessage?: string;
};

/** Resolve a chapter through an approved backend, static chunk, or CDN adapter. */
export type ChapterLoader = (ref: ChapterRef) => Promise<ChapterLoadResult>;

/** Future: precomputed or lazy-built search hits. */
export type VerseSearchHit = {
  segmentRef: SegmentRef;
  snippet: string;
};

export type WorkSearchIndex = {
  workId: string;
  buildVersion: string;
  hitsByToken: Map<string, VerseSearchHit[]>;
};

export interface LargeWorkManifest {
  workId: string;
  totalChaptersApprox: number;
  totalSegmentsApprox?: number;
  chapterRefs: ChapterRef[];
  preferredLoader?: ChapterLoader;
}
