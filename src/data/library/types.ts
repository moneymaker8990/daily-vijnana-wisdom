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

export type LibraryText = {
  id: TextTradition;
  title: string;
  subtitle: string;
  description: string;
  origin: string;
  totalVerses: number;
  chapters?: { number: number; title: string; verseCount: number }[];
  sections?: { id: string; title: string; verseCount: number }[];
  verses: LibraryVerse[];
};

export type ReadingProgress = {
  textId: TextTradition;
  lastReadVerse: number;
  bookmarkedVerses: number[];
  completedVerses: number[];
};


