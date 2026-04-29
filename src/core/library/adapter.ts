/**
 * Adapter: Bridge between Verse Engine and Legacy Library Types
 * 
 * Converts the new Verse/Source types to the LibraryText format
 * used by existing UI components (TextReader, etc.)
 */

import type { Verse, Source } from './types';
import type { LibraryText, LibraryVerse } from '@data/library/types';
import { getVersesBySource, getAllSources, getVersesGroupedByChapter } from './engine';

/**
 * Convert a single Verse to LibraryVerse format
 */
function verseToLibraryVerse(verse: Verse, index: number): LibraryVerse {
  return {
    id: verse.id,
    number: index + 1, // 1-indexed for display
    chapter: typeof verse.chapter === 'number' ? verse.chapter : undefined,
    section: typeof verse.chapter === 'string' ? verse.chapter : undefined,
    text: verse.text,
    commentary: verse.commentary,
    keywords: verse.tags,
    practiceCategory: verse.practiceCategory,
    plainLanguage: verse.plainLanguage,
    translationReaderNote: verse.translationReaderNote,
    practiceInstructions: verse.practiceInstructions,
    reflectionPrompt: verse.reflectionPrompt,
    modernLifeApplication: verse.modernLifeApplication,
    journalQuestion: verse.journalQuestion,
    contentKind: verse.contentKind,
  };
}

const SHIVA_SUTRA_CHAPTER_TITLES: Record<number, string> = {
  1: 'Śāmbhavopāya — Direct path of awareness',
  2: 'Śāktopāya — Energy, mantra, and refined thought',
  3: 'Āṇavopāya — Embodied path of breath, body, and method',
};

function chapterTitleForSource(sourceId: string, chapterNum: number): string {
  if (sourceId === 'shiva-sutras') {
    return SHIVA_SUTRA_CHAPTER_TITLES[chapterNum] ?? `Chapter ${chapterNum}`;
  }
  return `Chapter ${chapterNum}`;
}

/**
 * Convert a Source + its verses to LibraryText format
 */
export function sourceToLibraryText(source: Source): LibraryText {
  const verses = getVersesBySource(source.id);
  const grouped = getVersesGroupedByChapter(source.id);
  
  // Build chapters or sections based on grouping
  const chapters: { number: number; title: string; verseCount: number }[] = [];
  const sections: { id: string; title: string; verseCount: number }[] = [];
  
  // Determine if we have numeric chapters or string sections
  let hasNumericChapters = false;
  grouped.forEach((_, key) => {
    if (typeof key === 'number') hasNumericChapters = true;
  });
  
  if (hasNumericChapters) {
    // Sort by chapter number
    const sortedChapters = Array.from(grouped.entries())
      .filter(([key]) => typeof key === 'number')
      .sort(([a], [b]) => (a as number) - (b as number));
    
    sortedChapters.forEach(([chapterNum, chapterVerses]) => {
      const n = chapterNum as number;
      chapters.push({
        number: n,
        title: chapterTitleForSource(source.id, n),
        verseCount: chapterVerses.length,
      });
    });
  } else {
    // Use string sections
    grouped.forEach((sectionVerses, sectionId) => {
      sections.push({
        id: String(sectionId),
        title: String(sectionId),
        verseCount: sectionVerses.length,
      });
    });
  }
  
  // Map tradition to legacy id format
  const traditionToId: Record<string, string> = {
    'Hindu': 'gita',
    'Taoist': 'tao',
    'Buddhist': 'dhammapada',
    'Tantric': 'vijnana',
    'Zen': 'zen',
    'Sufi': 'rumi',
    'ChristianMystic': 'cloud',
    'Hermetic': 'hermetic',
  };
  
  const legacyId = source.id.includes('-') 
    ? source.id.split('-')[0] 
    : traditionToId[source.tradition] || source.id;
  
  return {
    id: legacyId,
    registrySourceId: source.id,
    title: source.name,
    subtitle: source.subtitle ?? source.period ?? '',
    description: source.description,
    origin: `${source.originalLanguage || ''} ${source.period || ''}`.trim(),
    totalVerses: source.totalVerses,
    chapters: chapters.length > 0 ? chapters : undefined,
    sections: sections.length > 0 && chapters.length === 0 ? sections : undefined,
    verses: verses.map((v, i) => verseToLibraryVerse(v, i)),
  };
}

/**
 * Get all sources as LibraryText array
 */
export function getAllLibraryTexts(): LibraryText[] {
  return getAllSources().map(source => sourceToLibraryText(source));
}

/**
 * Get a specific source as LibraryText
 */
export function getLibraryText(sourceId: string): LibraryText | null {
  const sources = getAllSources();
  const source = sources.find(s => s.id === sourceId);
  if (!source) return null;
  return sourceToLibraryText(source);
}




