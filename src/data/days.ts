import type { DailyEntry } from '../lib/types';
import { VIJNANA_PHASE_ENTRIES } from './entries/vijnanaPhase';
import { UPANISHAD_PHASE_ENTRIES } from './entries/upanishadPhase';
import { GITA_PHASE_ENTRIES } from './entries/gitaPhase';
import { TAO_PHASE_ENTRIES } from './entries/taoPhase';
import { ASHTAVAKRA_PHASE_ENTRIES } from './entries/ashtavakraPhase';
import { YOGA_SUTRAS_PHASE_ENTRIES } from './entries/yogaSutrasPhase';
import { SHIVA_SUTRAS_PHASE_ENTRIES } from './entries/shivaSutrasPhase';

// Combine all phases into a single 365-day journey
export const DAILY_ENTRIES: DailyEntry[] = [
  ...VIJNANA_PHASE_ENTRIES,       // Days 1-112
  ...UPANISHAD_PHASE_ENTRIES,     // Days 113-168
  ...GITA_PHASE_ENTRIES,          // Days 169-210
  ...TAO_PHASE_ENTRIES,           // Days 211-260
  ...ASHTAVAKRA_PHASE_ENTRIES,    // Days 261-300
  ...YOGA_SUTRAS_PHASE_ENTRIES,   // Days 301-330
  ...SHIVA_SUTRAS_PHASE_ENTRIES,  // Days 331-365
].sort((a, b) => a.dayNumber - b.dayNumber);

// Verify we have exactly 365 days
if (DAILY_ENTRIES.length !== 365) {
  console.warn(`Expected 365 daily entries, but got ${DAILY_ENTRIES.length}`);
}
