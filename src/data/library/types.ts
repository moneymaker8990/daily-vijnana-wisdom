// Types for the Study Library

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
};

export type ChapterInfo = { number: number; title: string; verseCount: number };
export type SectionInfo = { id: string; title: string; verseCount: number };

export type LibraryText = {
  id: string;
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





