/**
 * Journal Entries Sync
 */

import { supabase } from '../supabase';
import type { User } from '@supabase/supabase-js';
import { STORAGE_KEYS } from '@lib/constants';

export interface JournalEntrySync {
  id: string;
  title?: string;
  content: string;
  mood?: string;
  moodIntensity?: number;
  gratitudes?: string[];
  tags?: string[];
  prompt?: string;
  isPrivate?: boolean;
  date: string;
}

export async function syncJournalEntries(user: User | null): Promise<JournalEntrySync[]> {
  if (!user) {
    const stored = localStorage.getItem(STORAGE_KEYS.JOURNAL);
    return stored ? JSON.parse(stored) : [];
  }

  const { data: cloudEntries, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    const stored = localStorage.getItem(STORAGE_KEYS.JOURNAL);
    return stored ? JSON.parse(stored) : [];
  }

  const entries: JournalEntrySync[] = (cloudEntries || []).map(e => ({
    id: e.id,
    title: e.title || undefined,
    content: e.content,
    mood: e.mood || undefined,
    moodIntensity: e.mood_intensity || undefined,
    gratitudes: e.gratitudes || undefined,
    tags: e.tags || undefined,
    prompt: e.prompt || undefined,
    isPrivate: e.is_private,
    date: e.created_at,
  }));

  localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries));
  return entries;
}

export async function saveJournalEntry(
  user: User | null,
  entry: JournalEntrySync
): Promise<void> {
  const stored = localStorage.getItem(STORAGE_KEYS.JOURNAL);
  const entries: JournalEntrySync[] = stored ? JSON.parse(stored) : [];
  const existingIndex = entries.findIndex(e => e.id === entry.id);

  if (existingIndex >= 0) {
    entries[existingIndex] = entry;
  } else {
    entries.unshift(entry);
  }
  localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries));

  if (user) {
    await supabase
      .from('journal_entries')
      .upsert({
        id: entry.id,
        user_id: user.id,
        title: entry.title || null,
        content: entry.content,
        mood: entry.mood || null,
        mood_intensity: entry.moodIntensity || null,
        gratitudes: entry.gratitudes || [],
        tags: entry.tags || [],
        prompt: entry.prompt || null,
        is_private: entry.isPrivate || false,
        created_at: entry.date,
      });
  }
}

export async function deleteJournalEntry(
  user: User | null,
  entryId: string
): Promise<void> {
  const stored = localStorage.getItem(STORAGE_KEYS.JOURNAL);
  const entries: JournalEntrySync[] = stored ? JSON.parse(stored) : [];
  const filtered = entries.filter(e => e.id !== entryId);
  localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(filtered));

  if (user) {
    await supabase
      .from('journal_entries')
      .delete()
      .eq('id', entryId)
      .eq('user_id', user.id);
  }
}

export async function uploadLocalJournalEntries(user: User): Promise<void> {
  const localJournals = localStorage.getItem(STORAGE_KEYS.JOURNAL);
  if (localJournals) {
    const entries: JournalEntrySync[] = JSON.parse(localJournals);
    for (const entry of entries) {
      await supabase.from('journal_entries').upsert({
        id: entry.id,
        user_id: user.id,
        title: entry.title || null,
        content: entry.content,
        mood: entry.mood || null,
        mood_intensity: entry.moodIntensity || null,
        gratitudes: entry.gratitudes || [],
        tags: entry.tags || [],
        prompt: entry.prompt || null,
        is_private: entry.isPrivate || false,
        created_at: entry.date,
      });
    }
  }
}
