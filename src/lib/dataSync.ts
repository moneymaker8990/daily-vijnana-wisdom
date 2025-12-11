/**
 * Data Sync Layer
 * 
 * Syncs data between localStorage (offline) and Supabase (cloud).
 * - When signed in: saves to both localStorage and cloud
 * - When signed out: only uses localStorage
 * - On sign in: merges localStorage data with cloud data
 */

import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

// ============= JOURNAL ENTRIES =============

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
    // Return localStorage data only
    const stored = localStorage.getItem('stillpoint_journal_entries');
    return stored ? JSON.parse(stored) : [];
  }

  // Fetch from cloud
  const { data: cloudEntries, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching journal entries:', error);
    // Fall back to localStorage
    const stored = localStorage.getItem('stillpoint_journal_entries');
    return stored ? JSON.parse(stored) : [];
  }

  // Transform cloud format to app format
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

  // Update localStorage with cloud data
  localStorage.setItem('stillpoint_journal_entries', JSON.stringify(entries));

  return entries;
}

export async function saveJournalEntry(
  user: User | null,
  entry: JournalEntrySync
): Promise<void> {
  // Always save to localStorage
  const stored = localStorage.getItem('stillpoint_journal_entries');
  const entries: JournalEntrySync[] = stored ? JSON.parse(stored) : [];
  const existingIndex = entries.findIndex(e => e.id === entry.id);
  
  if (existingIndex >= 0) {
    entries[existingIndex] = entry;
  } else {
    entries.unshift(entry);
  }
  localStorage.setItem('stillpoint_journal_entries', JSON.stringify(entries));

  // If signed in, also save to cloud
  if (user) {
    const { error } = await supabase
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

    if (error) {
      console.error('Error saving journal entry to cloud:', error);
    }
  }
}

export async function deleteJournalEntry(
  user: User | null,
  entryId: string
): Promise<void> {
  // Remove from localStorage
  const stored = localStorage.getItem('stillpoint_journal_entries');
  const entries: JournalEntrySync[] = stored ? JSON.parse(stored) : [];
  const filtered = entries.filter(e => e.id !== entryId);
  localStorage.setItem('stillpoint_journal_entries', JSON.stringify(filtered));

  // If signed in, also remove from cloud
  if (user) {
    const { error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', entryId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting journal entry from cloud:', error);
    }
  }
}

// ============= DREAM ENTRIES =============

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
    const stored = localStorage.getItem('stillpoint_dreams');
    return stored ? JSON.parse(stored) : [];
  }

  const { data: cloudEntries, error } = await supabase
    .from('dream_entries')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching dream entries:', error);
    const stored = localStorage.getItem('stillpoint_dreams');
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

  localStorage.setItem('stillpoint_dreams', JSON.stringify(entries));
  return entries;
}

export async function saveDreamEntry(
  user: User | null,
  entry: DreamEntrySync
): Promise<void> {
  // Save to localStorage
  const stored = localStorage.getItem('stillpoint_dreams');
  const entries: DreamEntrySync[] = stored ? JSON.parse(stored) : [];
  const existingIndex = entries.findIndex(e => e.id === entry.id);
  
  if (existingIndex >= 0) {
    entries[existingIndex] = entry;
  } else {
    entries.unshift(entry);
  }
  localStorage.setItem('stillpoint_dreams', JSON.stringify(entries));

  // If signed in, save to cloud
  if (user) {
    const { error } = await supabase
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

    if (error) {
      console.error('Error saving dream entry to cloud:', error);
    }
  }
}

export async function deleteDreamEntry(
  user: User | null,
  entryId: string
): Promise<void> {
  const stored = localStorage.getItem('stillpoint_dreams');
  const entries: DreamEntrySync[] = stored ? JSON.parse(stored) : [];
  const filtered = entries.filter(e => e.id !== entryId);
  localStorage.setItem('stillpoint_dreams', JSON.stringify(filtered));

  if (user) {
    const { error } = await supabase
      .from('dream_entries')
      .delete()
      .eq('id', entryId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting dream entry from cloud:', error);
    }
  }
}

// ============= FAVORITES =============

export interface FavoriteSync {
  dayNumber: number;
  source: string;
  title: string;
  text: string;
  savedAt: string;
}

export async function syncFavorites(user: User | null): Promise<FavoriteSync[]> {
  if (!user) {
    const stored = localStorage.getItem('stillpoint_favorites');
    return stored ? JSON.parse(stored) : [];
  }

  const { data: cloudFavorites, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching favorites:', error);
    const stored = localStorage.getItem('stillpoint_favorites');
    return stored ? JSON.parse(stored) : [];
  }

  const favorites: FavoriteSync[] = (cloudFavorites || []).map(f => ({
    dayNumber: f.day_number,
    source: f.source,
    title: f.title,
    text: f.text,
    savedAt: f.created_at,
  }));

  localStorage.setItem('stillpoint_favorites', JSON.stringify(favorites));
  return favorites;
}

export async function saveFavorite(
  user: User | null,
  favorite: FavoriteSync
): Promise<void> {
  const stored = localStorage.getItem('stillpoint_favorites');
  const favorites: FavoriteSync[] = stored ? JSON.parse(stored) : [];
  
  if (!favorites.some(f => f.dayNumber === favorite.dayNumber && f.source === favorite.source)) {
    favorites.unshift(favorite);
    localStorage.setItem('stillpoint_favorites', JSON.stringify(favorites));
  }

  if (user) {
    const { error } = await supabase
      .from('favorites')
      .upsert({
        user_id: user.id,
        day_number: favorite.dayNumber,
        source: favorite.source,
        title: favorite.title,
        text: favorite.text,
      });

    if (error) {
      console.error('Error saving favorite to cloud:', error);
    }
  }
}

export async function removeFavorite(
  user: User | null,
  dayNumber: number,
  source: string
): Promise<void> {
  const stored = localStorage.getItem('stillpoint_favorites');
  const favorites: FavoriteSync[] = stored ? JSON.parse(stored) : [];
  const filtered = favorites.filter(f => !(f.dayNumber === dayNumber && f.source === source));
  localStorage.setItem('stillpoint_favorites', JSON.stringify(filtered));

  if (user) {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('day_number', dayNumber)
      .eq('source', source);

    if (error) {
      console.error('Error removing favorite from cloud:', error);
    }
  }
}

// ============= STUDY PROGRESS =============

export interface StudyProgressSync {
  courseId: string;
  currentLesson: string | null;
  completedLessons: string[];
  startedAt: string;
}

export async function syncStudyProgress(user: User | null): Promise<StudyProgressSync[]> {
  if (!user) {
    const stored = localStorage.getItem('stillpoint_study_progress');
    return stored ? JSON.parse(stored) : [];
  }

  const { data: cloudProgress, error } = await supabase
    .from('study_progress')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    console.error('Error fetching study progress:', error);
    const stored = localStorage.getItem('stillpoint_study_progress');
    return stored ? JSON.parse(stored) : [];
  }

  const progress: StudyProgressSync[] = (cloudProgress || []).map(p => ({
    courseId: p.course_id,
    currentLesson: p.current_lesson,
    completedLessons: p.completed_lessons || [],
    startedAt: p.started_at,
  }));

  localStorage.setItem('stillpoint_study_progress', JSON.stringify(progress));
  return progress;
}

export async function saveStudyProgress(
  user: User | null,
  progress: StudyProgressSync
): Promise<void> {
  const stored = localStorage.getItem('stillpoint_study_progress');
  const allProgress: StudyProgressSync[] = stored ? JSON.parse(stored) : [];
  const existingIndex = allProgress.findIndex(p => p.courseId === progress.courseId);
  
  if (existingIndex >= 0) {
    allProgress[existingIndex] = progress;
  } else {
    allProgress.push(progress);
  }
  localStorage.setItem('stillpoint_study_progress', JSON.stringify(allProgress));

  if (user) {
    const { error } = await supabase
      .from('study_progress')
      .upsert({
        user_id: user.id,
        course_id: progress.courseId,
        current_lesson: progress.currentLesson,
        completed_lessons: progress.completedLessons,
        started_at: progress.startedAt,
      });

    if (error) {
      console.error('Error saving study progress to cloud:', error);
    }
  }
}

// ============= USER PREFERENCES =============

export interface UserPreferencesSync {
  currentDay: number;
  textSize: string;
  notificationEnabled: boolean;
  notificationTime: string | null;
}

export async function syncUserPreferences(user: User | null): Promise<UserPreferencesSync> {
  if (!user) {
    // Load from localStorage
    const storedState = localStorage.getItem('vijnana_user_state');
    const storedTextSize = localStorage.getItem('stillpoint_textsize');
    const storedNotifications = localStorage.getItem('stillpoint_notification_settings');
    
    return {
      currentDay: storedState ? JSON.parse(storedState).currentDay : 1,
      textSize: storedTextSize || 'medium',
      notificationEnabled: storedNotifications ? JSON.parse(storedNotifications).enabled : false,
      notificationTime: storedNotifications ? JSON.parse(storedNotifications).time : null,
    };
  }

  const { data, error } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error || !data) {
    // No cloud preferences, return localStorage values
    const storedState = localStorage.getItem('vijnana_user_state');
    return {
      currentDay: storedState ? JSON.parse(storedState).currentDay : 1,
      textSize: localStorage.getItem('stillpoint_textsize') || 'medium',
      notificationEnabled: false,
      notificationTime: null,
    };
  }

  const prefs: UserPreferencesSync = {
    currentDay: data.current_day,
    textSize: data.text_size,
    notificationEnabled: data.notification_enabled,
    notificationTime: data.notification_time,
  };

  // Update localStorage with cloud data
  localStorage.setItem('vijnana_user_state', JSON.stringify({ currentDay: prefs.currentDay }));
  localStorage.setItem('stillpoint_textsize', prefs.textSize);
  localStorage.setItem('stillpoint_notification_settings', JSON.stringify({
    enabled: prefs.notificationEnabled,
    time: prefs.notificationTime,
  }));

  return prefs;
}

export async function saveUserPreferences(
  user: User | null,
  prefs: Partial<UserPreferencesSync>
): Promise<void> {
  // Always update localStorage
  if (prefs.currentDay !== undefined) {
    localStorage.setItem('vijnana_user_state', JSON.stringify({ currentDay: prefs.currentDay }));
  }
  if (prefs.textSize !== undefined) {
    localStorage.setItem('stillpoint_textsize', prefs.textSize);
  }
  if (prefs.notificationEnabled !== undefined || prefs.notificationTime !== undefined) {
    const current = localStorage.getItem('stillpoint_notification_settings');
    const currentParsed = current ? JSON.parse(current) : { enabled: false, time: null };
    localStorage.setItem('stillpoint_notification_settings', JSON.stringify({
      enabled: prefs.notificationEnabled ?? currentParsed.enabled,
      time: prefs.notificationTime ?? currentParsed.time,
    }));
  }

  if (user) {
    const { error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: user.id,
        current_day: prefs.currentDay,
        text_size: prefs.textSize,
        notification_enabled: prefs.notificationEnabled,
        notification_time: prefs.notificationTime,
      });

    if (error) {
      console.error('Error saving user preferences to cloud:', error);
    }
  }
}

// ============= INITIAL SYNC ON LOGIN =============

/**
 * Sync all data when user logs in.
 * Merges localStorage data with cloud data, preferring newer data.
 */
export async function syncAllOnLogin(user: User): Promise<void> {
  console.log('Starting full data sync for user:', user.email);
  
  try {
    // Upload any localStorage data that doesn't exist in cloud
    await uploadLocalDataToCloud(user);
    
    // Then fetch latest from cloud (will update localStorage)
    await Promise.all([
      syncJournalEntries(user),
      syncDreamEntries(user),
      syncFavorites(user),
      syncStudyProgress(user),
      syncUserPreferences(user),
    ]);
    
    console.log('Data sync completed successfully');
  } catch (error) {
    console.error('Error during data sync:', error);
  }
}

/**
 * Upload local data to cloud on first login
 */
async function uploadLocalDataToCloud(user: User): Promise<void> {
  // Upload journal entries
  const localJournals = localStorage.getItem('stillpoint_journal_entries');
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

  // Upload dream entries
  const localDreams = localStorage.getItem('stillpoint_dreams');
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

  // Upload favorites
  const localFavorites = localStorage.getItem('stillpoint_favorites');
  if (localFavorites) {
    const favorites: FavoriteSync[] = JSON.parse(localFavorites);
    for (const fav of favorites) {
      await supabase.from('favorites').upsert({
        user_id: user.id,
        day_number: fav.dayNumber,
        source: fav.source,
        title: fav.title,
        text: fav.text,
      });
    }
  }

  // Upload study progress
  const localProgress = localStorage.getItem('stillpoint_study_progress');
  if (localProgress) {
    const progress: StudyProgressSync[] = JSON.parse(localProgress);
    for (const p of progress) {
      await supabase.from('study_progress').upsert({
        user_id: user.id,
        course_id: p.courseId,
        current_lesson: p.currentLesson,
        completed_lessons: p.completedLessons,
        started_at: p.startedAt,
      });
    }
  }
}

