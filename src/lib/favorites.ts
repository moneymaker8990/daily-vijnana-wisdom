import { supabase } from './supabase';
import { STORAGE_KEYS } from '@lib/constants';

export type FavoriteItem = {
  id: string;
  dayNumber: number;
  title: string;
  text: string;
  source: string;
  savedAt: number;
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

// Sync favorite to Supabase
async function syncAddToCloud(item: FavoriteItem): Promise<void> {
  const userId = await getCurrentUserId();
  if (!userId) return;

  try {
    await supabase.from('favorites').upsert({
      user_id: userId,
      day_number: item.dayNumber,
      source: item.source,
      title: item.title,
      text: item.text,
    });
  } catch (error) {
    // Sync failed silently
  }
}

// Remove favorite from Supabase
async function syncRemoveFromCloud(dayNumber: number, source: string): Promise<void> {
  const userId = await getCurrentUserId();
  if (!userId) return;

  try {
    await supabase.from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('day_number', dayNumber)
      .eq('source', source);
  } catch (error) {
    // Remove sync failed silently
  }
}

export function getFavorites(): FavoriteItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addFavorite(item: Omit<FavoriteItem, 'id' | 'savedAt'>): FavoriteItem {
  const favorites = getFavorites();
  const newItem: FavoriteItem = {
    ...item,
    id: `${item.dayNumber}-${item.source}-${Date.now()}`,
    savedAt: Date.now(),
  };
  favorites.unshift(newItem);
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  
  // Sync to cloud in background
  syncAddToCloud(newItem);
  
  return newItem;
}

export function removeFavorite(id: string): void {
  const favorites = getFavorites();
  const toRemove = favorites.find(f => f.id === id);
  const filtered = favorites.filter((f) => f.id !== id);
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filtered));
  
  // Sync removal to cloud
  if (toRemove) {
    syncRemoveFromCloud(toRemove.dayNumber, toRemove.source);
  }
}

export function isFavorite(dayNumber: number, source: string, text: string): boolean {
  const favorites = getFavorites();
  return favorites.some(
    (f) => f.dayNumber === dayNumber && f.source === source && f.text === text
  );
}

export function toggleFavorite(item: Omit<FavoriteItem, 'id' | 'savedAt'>): boolean {
  const existing = getFavorites().find(
    (f) => f.dayNumber === item.dayNumber && f.source === item.source && f.text === item.text
  );
  
  if (existing) {
    removeFavorite(existing.id);
    return false;
  } else {
    addFavorite(item);
    return true;
  }
}








