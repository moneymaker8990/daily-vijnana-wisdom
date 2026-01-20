/**
 * Verse Engine API
 * 
 * All queries for sacred text content go through these helper functions.
 * This is the single API the entire app uses to access verses.
 */

import type { Verse, Source, VerseFilter, Tradition } from './types';
import { ALL_VERSES, ALL_SOURCES } from './registry';

/**
 * Get a random verse matching the given filter
 */
export function getRandomVerse(filter?: VerseFilter): Verse | null {
  let pool = ALL_VERSES;

  if (filter?.tradition) {
    const traditions = Array.isArray(filter.tradition)
      ? filter.tradition
      : [filter.tradition];
    pool = pool.filter(v => traditions.includes(v.tradition));
  }

  if (filter?.tags?.length) {
    pool = pool.filter(v =>
      filter.tags!.some(tag => v.tags.includes(tag))
    );
  }

  if (filter?.sourceId) {
    pool = pool.filter(v => v.sourceId === filter.sourceId);
  }

  if (filter?.difficulty) {
    const { min = 1, max = 5 } = filter.difficulty;
    pool = pool.filter(v =>
      (v.difficulty ?? 3) >= min && (v.difficulty ?? 3) <= max
    );
  }

  if (filter?.query) {
    const q = filter.query.toLowerCase();
    pool = pool.filter(v =>
      v.text.toLowerCase().includes(q) ||
      v.commentary?.toLowerCase().includes(q)
    );
  }

  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Get all verses from a specific source
 */
export function getVersesBySource(sourceId: string): Verse[] {
  return ALL_VERSES.filter(v => v.sourceId === sourceId);
}

/**
 * Get all verses with a specific tag
 */
export function getVersesByTag(tag: string): Verse[] {
  return ALL_VERSES.filter(v => v.tags.includes(tag));
}

/**
 * Get all verses matching multiple tags (OR logic)
 */
export function getVersesByTags(tags: string[]): Verse[] {
  return ALL_VERSES.filter(v =>
    tags.some(tag => v.tags.includes(tag))
  );
}

/**
 * Get a specific verse by ID
 */
export function getVerseById(id: string): Verse | null {
  return ALL_VERSES.find(v => v.id === id) ?? null;
}

/**
 * Search verses by text content
 */
export function searchVerses(query: string): Verse[] {
  const q = query.toLowerCase();
  return ALL_VERSES.filter(v =>
    v.text.toLowerCase().includes(q) ||
    v.commentary?.toLowerCase().includes(q) ||
    v.sourceName.toLowerCase().includes(q) ||
    v.tags.some(tag => tag.toLowerCase().includes(q))
  );
}

/**
 * Get verses by tradition
 */
export function getVersesByTradition(tradition: Tradition | Tradition[]): Verse[] {
  const traditions = Array.isArray(tradition) ? tradition : [tradition];
  return ALL_VERSES.filter(v => traditions.includes(v.tradition));
}

/**
 * Get a deterministic "daily verse" for a given day number
 * Uses a seeded selection to ensure the same verse for the same day
 */
export function getDailyVerse(dayNumber: number, sourceId?: string): Verse | null {
  let pool = sourceId
    ? ALL_VERSES.filter(v => v.sourceId === sourceId)
    : ALL_VERSES;
  
  if (!pool.length) return null;
  
  // Simple seeded random based on day number
  const index = dayNumber % pool.length;
  return pool[index];
}

/**
 * Get verses for a chapter within a source
 */
export function getVersesByChapter(sourceId: string, chapter: string | number): Verse[] {
  return ALL_VERSES.filter(v =>
    v.sourceId === sourceId && v.chapter === chapter
  );
}

/**
 * Get source metadata by ID
 */
export function getSourceById(sourceId: string): Source | null {
  return ALL_SOURCES.find(s => s.id === sourceId) ?? null;
}

/**
 * Get all sources
 */
export function getAllSources(): Source[] {
  return ALL_SOURCES;
}

/**
 * Get sources by tradition
 */
export function getSourcesByTradition(tradition: Tradition | Tradition[]): Source[] {
  const traditions = Array.isArray(tradition) ? tradition : [tradition];
  return ALL_SOURCES.filter(s => traditions.includes(s.tradition));
}

/**
 * Get verse count for a source
 */
export function getVerseCount(sourceId: string): number {
  return ALL_VERSES.filter(v => v.sourceId === sourceId).length;
}

/**
 * Get total verse count across all sources
 */
export function getTotalVerseCount(): number {
  return ALL_VERSES.length;
}

/**
 * Get all unique tags used across all verses
 */
export function getAllUsedTags(): string[] {
  const tagSet = new Set<string>();
  ALL_VERSES.forEach(v => v.tags.forEach(tag => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

/**
 * Get verses grouped by chapter for a source
 */
export function getVersesGroupedByChapter(sourceId: string): Map<string | number, Verse[]> {
  const verses = getVersesBySource(sourceId);
  const grouped = new Map<string | number, Verse[]>();
  
  verses.forEach(v => {
    const chapter = v.chapter ?? 'uncategorized';
    if (!grouped.has(chapter)) {
      grouped.set(chapter, []);
    }
    grouped.get(chapter)!.push(v);
  });
  
  return grouped;
}




