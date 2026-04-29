// Types for the Study Library

import type {
  VbtPracticeCategory,
  VerseContentKind,
  TranslationReaderNote,
} from '@core/library/types';

export type TextTradition =
  | 'vijnana'
  | 'tao'
  | 'upanishads'
  | 'gita'
  | 'ashtavakra'
  | 'yogaSutras'
  | 'shivaSutras';

export type LibraryVerse = {
  id: string;
  number: number;
  chapter?: number;
  section?: string;
  text: string;
  commentary?: string;
  keywords?: string[];
  practiceCategory?: VbtPracticeCategory;
  plainLanguage?: string;
  translationReaderNote?: TranslationReaderNote;
  practiceInstructions?: string;
  reflectionPrompt?: string;
  modernLifeApplication?: string;
  journalQuestion?: string;
  contentKind?: VerseContentKind;
};

export type ChapterInfo = { number: number; title: string; verseCount: number };
export type SectionInfo = { id: string; title: string; verseCount: number };

export type LibraryText = {
  id: string;
  /** Stable id from ALL_SOURCES (for progress, filters, metadata lookup) */
  registrySourceId: string;
  title: string;
  subtitle: string;
  description: string;
  origin: string;
  totalVerses: number;
  chapters?: ChapterInfo[];
  sections?: SectionInfo[];
  verses: LibraryVerse[];
};

export type ReadingProgress = {
  textId: string;
  lastReadVerse: number;
  bookmarkedVerses: number[];
  completedVerses: number[];
};





