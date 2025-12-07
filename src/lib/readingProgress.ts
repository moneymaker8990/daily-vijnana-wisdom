/**
 * Reading Progress System
 * 
 * Tracks user's reading progress across sacred texts using localStorage.
 * Provides bookmarking and progress persistence.
 */

export type ReadingProgress = {
  sourceId: string;
  lastVerseId: string;
  lastVerseIndex: number;
  chapter?: string | number;
  verseNumber?: string | number;
  lastRead: string; // ISO timestamp
  bookmarkedVerses: string[]; // Array of verse IDs
  completedVerses: string[]; // Array of verse IDs user has marked as read
};

const STORAGE_KEY = 'stillpoint_reading_progress';

/**
 * Load all reading progress from localStorage
 */
function loadAllProgress(): Record<string, ReadingProgress> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load reading progress:', e);
  }
  return {};
}

/**
 * Save all reading progress to localStorage
 */
function saveAllProgress(progress: Record<string, ReadingProgress>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save reading progress:', e);
  }
}

/**
 * Get reading progress for a specific source
 */
export function getReadingProgress(sourceId: string): ReadingProgress | null {
  const all = loadAllProgress();
  return all[sourceId] || null;
}

/**
 * Update reading progress for a source
 */
export function updateReadingProgress(
  sourceId: string,
  verseId: string,
  verseIndex: number,
  chapter?: string | number,
  verseNumber?: string | number
): void {
  const all = loadAllProgress();
  const existing = all[sourceId] || {
    sourceId,
    lastVerseId: '',
    lastVerseIndex: 0,
    bookmarkedVerses: [],
    completedVerses: [],
    lastRead: new Date().toISOString(),
  };

  all[sourceId] = {
    ...existing,
    lastVerseId: verseId,
    lastVerseIndex: verseIndex,
    chapter,
    verseNumber,
    lastRead: new Date().toISOString(),
  };

  saveAllProgress(all);
}

/**
 * Toggle bookmark for a verse
 */
export function toggleBookmark(sourceId: string, verseId: string): boolean {
  const all = loadAllProgress();
  const existing = all[sourceId] || {
    sourceId,
    lastVerseId: verseId,
    lastVerseIndex: 0,
    bookmarkedVerses: [],
    completedVerses: [],
    lastRead: new Date().toISOString(),
  };

  const index = existing.bookmarkedVerses.indexOf(verseId);
  const isBookmarked = index === -1;

  if (isBookmarked) {
    existing.bookmarkedVerses.push(verseId);
  } else {
    existing.bookmarkedVerses.splice(index, 1);
  }

  all[sourceId] = existing;
  saveAllProgress(all);

  return isBookmarked;
}

/**
 * Check if a verse is bookmarked
 */
export function isBookmarked(sourceId: string, verseId: string): boolean {
  const progress = getReadingProgress(sourceId);
  return progress?.bookmarkedVerses.includes(verseId) ?? false;
}

/**
 * Get all bookmarked verses for a source
 */
export function getBookmarkedVerses(sourceId: string): string[] {
  const progress = getReadingProgress(sourceId);
  return progress?.bookmarkedVerses ?? [];
}

/**
 * Mark a verse as completed
 */
export function markVerseCompleted(sourceId: string, verseId: string): void {
  const all = loadAllProgress();
  const existing = all[sourceId] || {
    sourceId,
    lastVerseId: verseId,
    lastVerseIndex: 0,
    bookmarkedVerses: [],
    completedVerses: [],
    lastRead: new Date().toISOString(),
  };

  if (!existing.completedVerses.includes(verseId)) {
    existing.completedVerses.push(verseId);
  }

  all[sourceId] = existing;
  saveAllProgress(all);
}

/**
 * Get completion percentage for a source
 */
export function getCompletionPercentage(sourceId: string, totalVerses: number): number {
  const progress = getReadingProgress(sourceId);
  if (!progress || totalVerses === 0) return 0;
  return Math.round((progress.completedVerses.length / totalVerses) * 100);
}

/**
 * Get all sources with reading progress
 */
export function getAllReadingProgress(): Record<string, ReadingProgress> {
  return loadAllProgress();
}

/**
 * Clear reading progress for a source
 */
export function clearReadingProgress(sourceId: string): void {
  const all = loadAllProgress();
  delete all[sourceId];
  saveAllProgress(all);
}

/**
 * Clear all reading progress
 */
export function clearAllReadingProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Get recently read sources, sorted by last read time
 */
export function getRecentlyRead(limit = 5): ReadingProgress[] {
  const all = loadAllProgress();
  return Object.values(all)
    .sort((a, b) => new Date(b.lastRead).getTime() - new Date(a.lastRead).getTime())
    .slice(0, limit);
}

