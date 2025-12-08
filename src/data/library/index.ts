// Library Index - Complete Sacred Texts for Study

export * from './types';
export { VIJNANA_BHAIRAVA_TANTRA } from './vijnanaComplete';
export { TAO_TE_CHING } from './taoComplete';
export { UPANISHADS } from './upanishadsComplete';
export { BHAGAVAD_GITA } from './gitaComplete';
export { ASHTAVAKRA_GITA } from './ashtavakraComplete';
export { YOGA_SUTRAS } from './yogaSutrasComplete';
export { SHIVA_SUTRAS } from './shivaSutrasComplete';

import type { LibraryText, TextTradition } from './types';
import { VIJNANA_BHAIRAVA_TANTRA } from './vijnanaComplete';
import { TAO_TE_CHING } from './taoComplete';
import { UPANISHADS } from './upanishadsComplete';
import { BHAGAVAD_GITA } from './gitaComplete';
import { ASHTAVAKRA_GITA } from './ashtavakraComplete';
import { YOGA_SUTRAS } from './yogaSutrasComplete';
import { SHIVA_SUTRAS } from './shivaSutrasComplete';

// All texts in one array for easy iteration
export const ALL_LIBRARY_TEXTS: LibraryText[] = [
  VIJNANA_BHAIRAVA_TANTRA,
  TAO_TE_CHING,
  UPANISHADS,
  BHAGAVAD_GITA,
  ASHTAVAKRA_GITA,
  YOGA_SUTRAS,
  SHIVA_SUTRAS,
];

// Get text by ID
export function getLibraryText(id: TextTradition): LibraryText | undefined {
  return ALL_LIBRARY_TEXTS.find(text => text.id === id);
}

// Get total verse count across all texts
export function getTotalVerseCount(): number {
  return ALL_LIBRARY_TEXTS.reduce((sum, text) => sum + text.verses.length, 0);
}

// Search across all texts
export function searchLibrary(query: string): { text: LibraryText; verseIndex: number }[] {
  const results: { text: LibraryText; verseIndex: number }[] = [];
  const lowerQuery = query.toLowerCase();
  
  for (const text of ALL_LIBRARY_TEXTS) {
    text.verses.forEach((verse, index) => {
      const searchableText = `${verse.text} ${verse.commentary || ''} ${(verse.keywords || []).join(' ')}`.toLowerCase();
      if (searchableText.includes(lowerQuery)) {
        results.push({ text, verseIndex: index });
      }
    });
  }
  
  return results;
}



