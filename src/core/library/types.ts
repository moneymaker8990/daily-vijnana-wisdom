/**
 * Core Verse Engine Types
 * 
 * Every sacred text in the app becomes an array of Verse objects.
 * One type, one registry, one engine - tags as semantic glue.
 */

export type Tradition =
  | 'Hindu'
  | 'Buddhist'
  | 'Taoist'
  | 'Tantric'
  | 'Zen'
  | 'Sufi'
  | 'ChristianMystic'
  | 'Hermetic';

/**
 * The core Verse type - every sacred text passage uses this structure
 */
export type Verse = {
  /** Unique identifier: 'gita-2-47', 'tao-1', 'dhammapada-1-1' */
  id: string;
  
  /** Source text identifier: 'bhagavad-gita', 'tao-te-ching' */
  sourceId: string;
  
  /** Human-readable source name: 'Bhagavad Gita' */
  sourceName: string;
  
  /** The spiritual tradition this text belongs to */
  tradition: Tradition;
  
  /** Chapter number or name (optional for some texts) */
  chapter?: string | number;
  
  /** Verse number within chapter */
  verseNumber?: string | number;
  
  /** The actual text content */
  text: string;
  
  /** Translator attribution (for public domain texts) */
  translator?: string;
  
  /** Semantic tags for cross-tradition connections */
  tags: string[];
  
  /** Difficulty level 1-5 (1=accessible, 5=advanced) */
  difficulty?: number;
  
  /** Optional commentary or explanation */
  commentary?: string;
};

/**
 * Historical introduction for a sacred text
 */
export type HistoricalIntro = {
  /** Where and when the text originated */
  origin: string;
  
  /** Who wrote or compiled the text */
  author: string;
  
  /** Why this text matters in the spiritual tradition */
  significance: string;
  
  /** Guidance on approaching this text */
  howToRead: string;
};

/**
 * Metadata about a sacred text source
 */
export type Source = {
  /** Unique identifier matching Verse.sourceId */
  id: string;
  
  /** Human-readable name */
  name: string;
  
  /** The tradition this text belongs to */
  tradition: Tradition;
  
  /** Total number of verses in this text */
  totalVerses: number;
  
  /** Brief description of the text */
  description: string;
  
  /** Original language */
  originalLanguage?: string;
  
  /** Approximate date or period */
  period?: string;
  
  /** Primary translator used */
  translator?: string;
  
  /** Icon/emoji for UI display */
  icon?: string;
  
  /** Rich historical context for the text */
  historicalIntro?: HistoricalIntro;
};

/**
 * Filter options for querying verses
 */
export type VerseFilter = {
  /** Filter by tradition(s) */
  tradition?: Tradition | Tradition[];
  
  /** Filter by semantic tags (OR match) */
  tags?: string[];
  
  /** Filter by specific source */
  sourceId?: string;
  
  /** Filter by difficulty range */
  difficulty?: {
    min?: number;
    max?: number;
  };
  
  /** Text search query */
  query?: string;
};

/**
 * Reading bookmark to track progress in a text
 */
export type ReadingBookmark = {
  /** Source text ID */
  sourceId: string;
  
  /** Last read verse ID */
  lastVerseId: string;
  
  /** Chapter number for display */
  chapter?: string | number;
  
  /** Verse number for display */
  verseNumber?: string | number;
  
  /** When this bookmark was last updated */
  timestamp: string;
};


