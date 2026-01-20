// Dream Journal Local Storage with Supabase Sync Support

import { supabase } from './supabase';
import { STORAGE_KEYS } from '@lib/constants';

export type DreamEntry = {
  id: string;
  date: string; // ISO date string
  content: string;
  title?: string;
  mood?: 'peaceful' | 'anxious' | 'confused' | 'joyful' | 'mysterious' | 'neutral';
  symbols?: string[];
  interpretation?: DreamInterpretation;
  createdAt: string;
  updatedAt: string;
};

export type DreamInterpretation = {
  summary: string;
  symbols: { symbol: string; meaning: string }[];
  psychologicalInsight: string;
  spiritualConnection: string;
  actionSuggestion: string;
  generatedAt: string;
};


// Get current user ID (if logged in)
async function getCurrentUserId(): Promise<string | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id || null;
  } catch {
    return null;
  }
}

// Sync dream entry to Supabase (fire and forget)
async function syncToCloud(entry: DreamEntry): Promise<void> {
  const userId = await getCurrentUserId();
  if (!userId) return;

  try {
    await supabase.from('dream_entries').upsert({
      id: entry.id,
      user_id: userId,
      title: entry.title || null,
      content: entry.content,
      date: entry.date,
      mood: entry.mood || null,
      interpretation: entry.interpretation || null,
    });
  } catch (error) {
    // Sync failed silently
  }
}

// Delete from Supabase
async function deleteFromCloud(entryId: string): Promise<void> {
  const userId = await getCurrentUserId();
  if (!userId) return;

  try {
    await supabase.from('dream_entries')
      .delete()
      .eq('id', entryId)
      .eq('user_id', userId);
  } catch (error) {
    // Delete sync failed silently
  }
}

export function loadDreams(): DreamEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DREAMS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    // Load failed, return empty array
  }
  return [];
}

/**
 * Load dream entries from Supabase (for logged in users)
 * Call this on login to sync cloud data to local
 */
export async function loadDreamsFromCloud(): Promise<DreamEntry[]> {
  const userId = await getCurrentUserId();
  if (!userId) return loadDreams();

  try {
    const { data, error } = await supabase
      .from('dream_entries')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (error) throw error;

    const entries: DreamEntry[] = (data || []).map(e => ({
      id: e.id,
      date: e.date,
      content: e.content,
      title: e.title || undefined,
      mood: e.mood || undefined,
      interpretation: e.interpretation as DreamInterpretation | undefined,
      createdAt: e.created_at,
      updatedAt: e.updated_at || e.created_at,
    }));

    // Update localStorage with cloud data
    saveDreams(entries);
    return entries;
  } catch (error) {
    return loadDreams();
  }
}

export function saveDreams(dreams: DreamEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.DREAMS, JSON.stringify(dreams));
  } catch (e) {
    // Save failed silently
  }
}

export function addDream(dream: Omit<DreamEntry, 'id' | 'createdAt' | 'updatedAt'>): DreamEntry {
  const dreams = loadDreams();
  const now = new Date().toISOString();
  const newDream: DreamEntry = {
    ...dream,
    id: `dream-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: now,
    updatedAt: now,
  };
  dreams.unshift(newDream); // Add to beginning
  saveDreams(dreams);
  
  // Sync to cloud in background
  syncToCloud(newDream);
  
  return newDream;
}

export function updateDream(id: string, updates: Partial<DreamEntry>): DreamEntry | null {
  const dreams = loadDreams();
  const index = dreams.findIndex(d => d.id === id);
  if (index === -1) return null;
  
  dreams[index] = {
    ...dreams[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveDreams(dreams);
  
  // Sync to cloud in background
  syncToCloud(dreams[index]);
  
  return dreams[index];
}

export function deleteDream(id: string): boolean {
  const dreams = loadDreams();
  const filtered = dreams.filter(d => d.id !== id);
  if (filtered.length === dreams.length) return false;
  saveDreams(filtered);
  
  // Delete from cloud in background
  deleteFromCloud(id);
  
  return true;
}

export function getDreamById(id: string): DreamEntry | null {
  const dreams = loadDreams();
  return dreams.find(d => d.id === id) || null;
}

export function getDreamsByMonth(year: number, month: number): DreamEntry[] {
  const dreams = loadDreams();
  return dreams.filter(d => {
    const date = new Date(d.date);
    return date.getFullYear() === year && date.getMonth() === month;
  });
}

export function getRecentDreams(count: number = 10): DreamEntry[] {
  return loadDreams().slice(0, count);
}





