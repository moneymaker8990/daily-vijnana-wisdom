const FAVORITES_KEY = 'vijnana_favorites';

export type FavoriteItem = {
  id: string;
  dayNumber: number;
  title: string;
  text: string;
  source: string;
  savedAt: number;
};

export function getFavorites(): FavoriteItem[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
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
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return newItem;
}

export function removeFavorite(id: string): void {
  const favorites = getFavorites().filter((f) => f.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
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





