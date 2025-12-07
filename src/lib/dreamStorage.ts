// Dream Journal Local Storage

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

const STORAGE_KEY = 'vijnana_dreams';

export function loadDreams(): DreamEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load dreams:', e);
  }
  return [];
}

export function saveDreams(dreams: DreamEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dreams));
  } catch (e) {
    console.error('Failed to save dreams:', e);
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
  return dreams[index];
}

export function deleteDream(id: string): boolean {
  const dreams = loadDreams();
  const filtered = dreams.filter(d => d.id !== id);
  if (filtered.length === dreams.length) return false;
  saveDreams(filtered);
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


