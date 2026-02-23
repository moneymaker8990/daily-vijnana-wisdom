/**
 * Dream Pattern Analysis Engine
 *
 * Scans all dreams for recurring symbols, mood distribution, and tag frequency.
 */

import type { DreamEntry } from './dreamStorage';
import { DREAM_SYMBOLS } from './dreamAI';

export type DreamPatternAnalysis = {
  totalDreams: number;
  dreamsThisMonth: number;
  topTags: { tag: string; count: number }[];
  recurringSymbols: { word: string; meaning: string; count: number }[];
  moodDistribution: { mood: string; count: number; percentage: number }[];
};

/** Detect symbols from DREAM_SYMBOLS that appear in 2+ dreams */
export function detectRecurringSymbols(
  dreams: DreamEntry[],
): { word: string; meaning: string; count: number }[] {
  const symbolCounts = new Map<string, { meaning: string; count: number }>();

  // Sort by word length desc so multi-word phrases match first
  const sorted = [...DREAM_SYMBOLS].sort((a, b) => b.word.length - a.word.length);

  for (const dream of dreams) {
    const lower = dream.content.toLowerCase();
    // Track which symbols appear in this dream (avoid double-counting)
    const found = new Set<string>();

    for (const sym of sorted) {
      if (lower.includes(sym.word) && !found.has(sym.word)) {
        found.add(sym.word);
        const existing = symbolCounts.get(sym.word);
        if (existing) {
          existing.count++;
        } else {
          symbolCounts.set(sym.word, { meaning: sym.meaning, count: 1 });
        }
      }
    }
  }

  // Only return symbols in 2+ dreams, sorted by count desc
  return Array.from(symbolCounts.entries())
    .filter(([_, v]) => v.count >= 2)
    .map(([word, v]) => ({ word, meaning: v.meaning, count: v.count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

/** Suggest tags for a dream based on content matching against DREAM_SYMBOLS */
export function suggestTags(content: string): string[] {
  if (!content.trim()) return [];

  const lower = content.toLowerCase();
  const sorted = [...DREAM_SYMBOLS].sort((a, b) => b.word.length - a.word.length);

  const matches: string[] = [];
  for (const sym of sorted) {
    if (lower.includes(sym.word) && !matches.includes(sym.word)) {
      matches.push(sym.word);
      if (matches.length >= 5) break;
    }
  }

  return matches;
}

/** Full pattern analysis across all dreams */
export function analyzeDreamPatterns(dreams: DreamEntry[]): DreamPatternAnalysis {
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const dreamsThisMonth = dreams.filter(d => {
    const date = new Date(d.date);
    return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
  }).length;

  // Tag frequency
  const tagCounts = new Map<string, number>();
  for (const dream of dreams) {
    for (const tag of dream.tags ?? []) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }
  const topTags = Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  // Mood distribution
  const moodCounts = new Map<string, number>();
  for (const dream of dreams) {
    if (dream.mood) {
      moodCounts.set(dream.mood, (moodCounts.get(dream.mood) ?? 0) + 1);
    }
  }
  const totalWithMood = Array.from(moodCounts.values()).reduce((a, b) => a + b, 0);
  const moodDistribution = Array.from(moodCounts.entries())
    .map(([mood, count]) => ({
      mood,
      count,
      percentage: totalWithMood > 0 ? Math.round((count / totalWithMood) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    totalDreams: dreams.length,
    dreamsThisMonth,
    topTags,
    recurringSymbols: detectRecurringSymbols(dreams),
    moodDistribution,
  };
}
