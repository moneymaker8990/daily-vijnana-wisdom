import type { DailyEntry } from './types';
import { DAILY_ENTRIES } from '../data/days';

export interface DailyEntryDataSource {
  getEntryByDay(day: number): Promise<DailyEntry | null>;
  getAllEntries(): Promise<DailyEntry[]>;
  getTodayEntry(today: Date): Promise<DailyEntry>;
}

export class LocalDailyEntryDataSource implements DailyEntryDataSource {
  async getEntryByDay(day: number): Promise<DailyEntry | null> {
    return DAILY_ENTRIES.find((d) => d.dayNumber === day) ?? null;
  }

  async getAllEntries(): Promise<DailyEntry[]> {
    return DAILY_ENTRIES;
  }

  async getTodayEntry(today: Date): Promise<DailyEntry> {
    // Map calendar day-of-year to a dayNumber in range 1..DAILY_ENTRIES.length
    const startOfYear = new Date(today.getFullYear(), 0, 0).getTime();
    const diff = today.getTime() - startOfYear;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24)); // 1..366

    const length = DAILY_ENTRIES.length;
    const dayNumber = ((dayOfYear - 1) % length) + 1;

    const entry = await this.getEntryByDay(dayNumber);
    if (!entry) {
      throw new Error(`No entry found for dayNumber ${dayNumber}`);
    }
    return entry;
  }
}

let dataSource: DailyEntryDataSource = new LocalDailyEntryDataSource();

export const getDataSource = () => dataSource;

// Future use: when Supabase is added, we can call setDataSource(new SupabaseDailyEntryDataSource())
export const setDataSource = (ds: DailyEntryDataSource) => {
  dataSource = ds;
};

/**
 * FUTURE SUPABASE SCHEMA (for later, do not implement now):
 *
 * Table: days
 *  - id (uuid)
 *  - day_number (int)
 *  - theme (text)
 *  - integrated_reflection_title (text)
 *  - integrated_reflection_body (text)
 *  - prayer (text)
 *  - daily_action (text)
 *  - meditation_title (text)
 *  - meditation_steps (text[])  // Supabase array
 *  - meditation_minutes (int)
 *
 * Table: tradition_passages
 *  - id (uuid)
 *  - source (enum: VIJNANA, TAO, ART_OF_WAR, UPANISHAD, GITA)
 *  - ref (text)
 *  - text (text)
 *
 * Table: day_tradition_links
 *  - id (uuid)
 *  - day_id (uuid, fk -> days.id)
 *  - tradition_id (uuid, fk -> tradition_passages.id)
 *  - role (enum: PRIMARY_VIJNANA, PRIMARY_TAO, PRIMARY_ART_OF_WAR, PRIMARY_UPANISHAD, PRIMARY_GITA)
 */




