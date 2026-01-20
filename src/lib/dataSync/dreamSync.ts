/**
 * Dream Entries Sync
 */

import { supabase } from '../supabase';
import type { User } from '@supabase/supabase-js';
import { STORAGE_KEYS } from '@lib/constants';

export interface DreamEntrySync {
  id: string;
  title?: string;
  content: string;
  date: string;
  mood?: string;
  interpretation?: {
    summary: string;
    symbols: Array<{ symbol: string; meaning: string }>;
    psychologicalInsight: string;
    spiritualConnection: string;
    actionSuggestion: string;
    generatedAt: string;
  };
}

export async function syncDreamEntries(user: User | null): Promise<DreamEntrySync[]> {
  if (!user) {
    const stored = localStorage.getItem(STORAGE_KEYS.DREAMS);
    return stored ? JSON.parse(stored) : [];
  }

  const { data: cloudEntries, error } = await supabase
    .from('dream_entries')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false });

  if (error) {
    const stored = localStorage.getItem(STORAGE_KEYS.DREAMS);
    return stored ? JSON.parse(stored) : [];
  }

  const entries: DreamEntrySync[] = (cloudEntries || []).map(e => ({
    id: e.id,
    title: e.title || undefined,
    content: e.content,
    date: e.date,
    mood: e.mood || undefined,
    interpretation: e.interpretation as DreamEntrySync['interpretation'],
  }));

  localStorage.setItem(STORAGE_KEYS.DREAMS, JSON.stringify(entries));
  return entries;
}

export async function saveDreamEntry(
  user: User | null,
  entry: DreamEntrySync
): Promise<void> {
  const stored = localStorage.getItem(STORAGE_KEYS.DREAMS);
  const entries: DreamEntrySync[] = stored ? JSON.parse(stored) : [];
  const existingIndex = entries.findIndex(e => e.id === entry.id);

  if (existingIndex >= 0) {
    entries[existingIndex] = entry;
  } else {
    entries.unshift(entry);
  }
  localStorage.setItem(STORAGE_KEYS.DREAMS, JSON.stringify(entries));

  if (user) {
    await supabase
      .from('dream_entries')
      .upsert({
        id: entry.id,
        user_id: user.id,
        title: entry.title || null,
        content: entry.content,
        date: entry.date,
        mood: entry.mood || null,
        interpretation: entry.interpretation || null,
      });
  }
}

export async function deleteDreamEntry(
  user: User | null,
  entryId: string
): Promise<void> {
  const stored = localStorage.getItem(STORAGE_KEYS.DREAMS);
  const entries: DreamEntrySync[] = stored ? JSON.parse(stored) : [];
  const filtered = entries.filter(e => e.id !== entryId);
  localStorage.setItem(STORAGE_KEYS.DREAMS, JSON.stringify(filtered));

  if (user) {
    await supabase
      .from('dream_entries')
      .delete()
      .eq('id', entryId)
      .eq('user_id', user.id);
  }
}

export async function uploadLocalDreamEntries(user: User): Promise<void> {
  const localDreams = localStorage.getItem(STORAGE_KEYS.DREAMS);
  if (localDreams) {
    const entries: DreamEntrySync[] = JSON.parse(localDreams);
    for (const entry of entries) {
      await supabase.from('dream_entries').upsert({
        id: entry.id,
        user_id: user.id,
        title: entry.title || null,
        content: entry.content,
        date: entry.date,
        mood: entry.mood || null,
        interpretation: entry.interpretation || null,
      });
    }
  }
}
