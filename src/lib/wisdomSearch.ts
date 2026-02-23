/**
 * Wisdom Search Engine
 *
 * Client-side full-text search across all 365 daily entries.
 * Searches theme, all 25 tradition text + commentary fields, reflection, prayer, and action.
 */

import type { DailyEntry } from './types';

export type WisdomSearchResult = {
  dayNumber: number;
  theme: string;
  section: string;
  snippet: string;
};

/** All searchable text fields with human-readable section names */
const TEXT_FIELDS: [keyof DailyEntry, string][] = [
  ['vijnanaText', 'Vijnana Bhairava Tantra'],
  ['taoText', 'Tao Te Ching'],
  ['artOfWarText', 'The Art of War'],
  ['upanishadText', 'Upanishads'],
  ['gitaText', 'Bhagavad Gita'],
  ['ashtavakraText', 'Ashtavakra Gita'],
  ['yogaSutraText', 'Yoga Sutras'],
  ['shivaSutraText', 'Shiva Sutras'],
  ['dhammapadaText', 'Dhammapada'],
  ['rumiText', 'Rumi'],
  ['zenKoanText', 'Zen Koan'],
  ['zhuangziText', 'Zhuangzi'],
  ['rigVedaText', 'Rig Veda'],
  ['cloudOfUnknowingText', 'Cloud of Unknowing'],
  ['prajnaparamitaText', 'Heart Sutra'],
  ['suttaNipataText', 'Sutta Nipata'],
  ['avadhutaGitaText', 'Avadhuta Gita'],
  ['vivekachudamaniText', 'Vivekachudamani'],
  ['naradaBhaktiText', 'Narada Bhakti Sutra'],
  ['yogaVasisthaText', 'Yoga Vasistha'],
  ['conferenceOfBirdsText', 'Conference of the Birds'],
  ['darkNightText', 'Dark Night of the Soul'],
  ['corpusHermeticumText', 'Corpus Hermeticum'],
  ['kybalionText', 'The Kybalion'],
  ['imitationOfChristText', 'Imitation of Christ'],
  ['stoicMeditationsText', 'Meditations (Marcus Aurelius)'],
  ['stoicDiscoursesText', 'Discourses (Epictetus)'],
  ['stoicLettersText', 'Letters to Lucilius (Seneca)'],
];

const COMMENTARY_FIELDS: [keyof DailyEntry, string][] = [
  ['vijnanaCommentary', 'Vijnana Bhairava Commentary'],
  ['taoCommentary', 'Tao Te Ching Commentary'],
  ['artOfWarCommentary', 'Art of War Commentary'],
  ['upanishadCommentary', 'Upanishads Commentary'],
  ['gitaCommentary', 'Bhagavad Gita Commentary'],
  ['ashtavakraCommentary', 'Ashtavakra Gita Commentary'],
  ['yogaSutraCommentary', 'Yoga Sutras Commentary'],
  ['shivaSutraCommentary', 'Shiva Sutras Commentary'],
  ['dhammapadaCommentary', 'Dhammapada Commentary'],
  ['rumiCommentary', 'Rumi Commentary'],
  ['zenKoanCommentary', 'Zen Koan Commentary'],
  ['zhuangziCommentary', 'Zhuangzi Commentary'],
  ['rigVedaCommentary', 'Rig Veda Commentary'],
  ['cloudOfUnknowingCommentary', 'Cloud of Unknowing Commentary'],
  ['prajnaparamitaCommentary', 'Heart Sutra Commentary'],
  ['suttaNipataCommentary', 'Sutta Nipata Commentary'],
  ['avadhutaGitaCommentary', 'Avadhuta Gita Commentary'],
  ['vivekachudamaniCommentary', 'Vivekachudamani Commentary'],
  ['naradaBhaktiCommentary', 'Narada Bhakti Commentary'],
  ['yogaVasisthaCommentary', 'Yoga Vasistha Commentary'],
  ['conferenceOfBirdsCommentary', 'Conference of the Birds Commentary'],
  ['darkNightCommentary', 'Dark Night Commentary'],
  ['corpusHermeticumCommentary', 'Corpus Hermeticum Commentary'],
  ['kybalionCommentary', 'Kybalion Commentary'],
  ['imitationOfChristCommentary', 'Imitation of Christ Commentary'],
  ['stoicMeditationsCommentary', 'Meditations Commentary'],
  ['stoicDiscoursesCommentary', 'Discourses Commentary'],
  ['stoicLettersCommentary', 'Letters Commentary'],
];

/** Extract a snippet centered on the query match */
export function extractSnippet(text: string, query: string, contextChars = 50): string {
  const lower = text.toLowerCase();
  const qLower = query.toLowerCase();
  const idx = lower.indexOf(qLower);

  if (idx === -1) return text.slice(0, contextChars * 2 + query.length) + '...';

  const start = Math.max(0, idx - contextChars);
  const end = Math.min(text.length, idx + query.length + contextChars);

  let snippet = '';
  if (start > 0) snippet += '...';
  snippet += text.slice(start, end);
  if (end < text.length) snippet += '...';

  return snippet;
}

/** Search all entries for the given query. Returns max 20 results sorted by relevance. */
export function searchWisdom(query: string, entries: DailyEntry[]): WisdomSearchResult[] {
  if (!query || query.trim().length < 2) return [];

  const q = query.trim().toLowerCase();
  const results: (WisdomSearchResult & { priority: number })[] = [];

  for (const entry of entries) {
    // 1. Theme match (highest priority)
    if (entry.theme.toLowerCase().includes(q)) {
      results.push({
        dayNumber: entry.dayNumber,
        theme: entry.theme,
        section: 'Theme',
        snippet: extractSnippet(entry.theme, query),
        priority: 0,
      });
    }

    // 2. Reflection match
    if (entry.integratedReflectionBody?.toLowerCase().includes(q)) {
      results.push({
        dayNumber: entry.dayNumber,
        theme: entry.theme,
        section: 'Integrated Reflection',
        snippet: extractSnippet(entry.integratedReflectionBody, query),
        priority: 1,
      });
    }

    // 3. Prayer match
    if (entry.prayer?.toLowerCase().includes(q)) {
      results.push({
        dayNumber: entry.dayNumber,
        theme: entry.theme,
        section: 'Prayer',
        snippet: extractSnippet(entry.prayer, query),
        priority: 1,
      });
    }

    // 4. Daily action match
    if (entry.dailyAction?.toLowerCase().includes(q)) {
      results.push({
        dayNumber: entry.dayNumber,
        theme: entry.theme,
        section: 'Daily Action',
        snippet: extractSnippet(entry.dailyAction, query),
        priority: 1,
      });
    }

    // 5. Text fields (priority 2)
    for (const [field, name] of TEXT_FIELDS) {
      const value = entry[field];
      if (typeof value === 'string' && value.toLowerCase().includes(q)) {
        results.push({
          dayNumber: entry.dayNumber,
          theme: entry.theme,
          section: name,
          snippet: extractSnippet(value, query),
          priority: 2,
        });
        break; // Only first text match per entry to avoid flooding
      }
    }

    // 6. Commentary fields (priority 3)
    for (const [field, name] of COMMENTARY_FIELDS) {
      const value = entry[field];
      if (typeof value === 'string' && value.toLowerCase().includes(q)) {
        results.push({
          dayNumber: entry.dayNumber,
          theme: entry.theme,
          section: name,
          snippet: extractSnippet(value, query),
          priority: 3,
        });
        break;
      }
    }
  }

  // Sort by priority, then deduplicate by day (keep highest priority per day)
  results.sort((a, b) => a.priority - b.priority || a.dayNumber - b.dayNumber);

  // Deduplicate: keep max 2 results per day
  const seen = new Map<number, number>();
  const deduped = results.filter(r => {
    const count = seen.get(r.dayNumber) ?? 0;
    if (count >= 2) return false;
    seen.set(r.dayNumber, count + 1);
    return true;
  });

  return deduped.slice(0, 20);
}
