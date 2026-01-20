/**
 * Core Library - Main Export
 * 
 * Single entry point for the Verse Engine
 */

// Types
export * from './types';
export * from './tags';

// Registry
export { ALL_VERSES, ALL_SOURCES, getVerseCountBySource, getTraditionStats } from './registry';

// Engine API
export {
  getRandomVerse,
  getVersesBySource,
  getVersesByTag,
  getVersesByTags,
  getVerseById,
  searchVerses,
  getVersesByTradition,
  getDailyVerse,
  getVersesByChapter,
  getSourceById,
  getAllSources,
  getSourcesByTradition,
  getVerseCount,
  getTotalVerseCount,
  getAllUsedTags,
  getVersesGroupedByChapter,
} from './engine';




