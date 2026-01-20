/**
 * Favorites Sync
 */

import { supabase } from '../supabase';
import type { User } from '@supabase/supabase-js';
import { STORAGE_KEYS } from '@lib/constants';

export interface FavoriteSync {
  dayNumber: number;
  source: string;
  title: string;
  text: string;
  savedAt: string;
}

export async function syncFavorites(user: User | null): Promise<FavoriteSync[]> {
  if (!user) {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return stored ? JSON.parse(stored) : [];
  }

  const { data: cloudFavorites, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return stored ? JSON.parse(stored) : [];
  }

  const favorites: FavoriteSync[] = (cloudFavorites || []).map(f => ({
    dayNumber: f.day_number,
    source: f.source,
    title: f.title,
    text: f.text,
    savedAt: f.created_at,
  }));

  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  return favorites;
}

export async function saveFavorite(
  user: User | null,
  favorite: FavoriteSync
): Promise<void> {
  const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
  const favorites: FavoriteSync[] = stored ? JSON.parse(stored) : [];

  if (!favorites.some(f => f.dayNumber === favorite.dayNumber && f.source === favorite.source)) {
    favorites.unshift(favorite);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }

  if (user) {
    await supabase
      .from('favorites')
      .upsert({
        user_id: user.id,
        day_number: favorite.dayNumber,
        source: favorite.source,
        title: favorite.title,
        text: favorite.text,
      });
  }
}

export async function removeFavorite(
  user: User | null,
  dayNumber: number,
  source: string
): Promise<void> {
  const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
  const favorites: FavoriteSync[] = stored ? JSON.parse(stored) : [];
  const filtered = favorites.filter(f => !(f.dayNumber === dayNumber && f.source === source));
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filtered));

  if (user) {
    await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('day_number', dayNumber)
      .eq('source', source);
  }
}

export async function uploadLocalFavorites(user: User): Promise<void> {
  const localFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
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
}
