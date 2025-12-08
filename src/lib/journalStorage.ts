// Journal Local Storage

export type MoodType = 'peaceful' | 'grateful' | 'inspired' | 'reflective' | 'anxious' | 'sad' | 'joyful' | 'neutral';

export type JournalEntry = {
  id: string;
  date: string; // ISO date string
  title?: string;
  content: string;
  gratitudes: string[]; // Up to 3 things you're grateful for
  mood: MoodType;
  moodIntensity: number; // 1-5
  prompt?: string; // The writing prompt used, if any
  tags: string[];
  isPrivate: boolean;
  wordCount: number;
  createdAt: string;
  updatedAt: string;
};

export type JournalStats = {
  totalEntries: number;
  currentStreak: number;
  longestStreak: number;
  totalWords: number;
  avgWordsPerEntry: number;
  moodDistribution: Record<MoodType, number>;
  mostUsedTags: { tag: string; count: number }[];
  entriesByMonth: Record<string, number>;
  journalingDays: string[]; // ISO date strings of days with entries
};

const STORAGE_KEY = 'vijnana_journal';
const STATS_KEY = 'vijnana_journal_stats';

export function loadJournalEntries(): JournalEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load journal entries:', e);
  }
  return [];
}

export function saveJournalEntries(entries: JournalEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    // Update stats whenever entries change
    updateStats(entries);
  } catch (e) {
    console.error('Failed to save journal entries:', e);
  }
}

export function addJournalEntry(entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt' | 'wordCount'>): JournalEntry {
  const entries = loadJournalEntries();
  const now = new Date().toISOString();
  const wordCount = entry.content.split(/\s+/).filter(word => word.length > 0).length;
  
  const newEntry: JournalEntry = {
    ...entry,
    id: `journal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    wordCount,
    createdAt: now,
    updatedAt: now,
  };
  
  entries.unshift(newEntry);
  saveJournalEntries(entries);
  return newEntry;
}

export function updateJournalEntry(id: string, updates: Partial<JournalEntry>): JournalEntry | null {
  const entries = loadJournalEntries();
  const index = entries.findIndex(e => e.id === id);
  if (index === -1) return null;
  
  const wordCount = updates.content 
    ? updates.content.split(/\s+/).filter(word => word.length > 0).length 
    : entries[index].wordCount;
  
  entries[index] = {
    ...entries[index],
    ...updates,
    wordCount,
    updatedAt: new Date().toISOString(),
  };
  
  saveJournalEntries(entries);
  return entries[index];
}

export function deleteJournalEntry(id: string): boolean {
  const entries = loadJournalEntries();
  const filtered = entries.filter(e => e.id !== id);
  if (filtered.length === entries.length) return false;
  saveJournalEntries(filtered);
  return true;
}

export function getJournalEntryById(id: string): JournalEntry | null {
  const entries = loadJournalEntries();
  return entries.find(e => e.id === id) || null;
}

export function getEntriesByDate(date: string): JournalEntry[] {
  const entries = loadJournalEntries();
  const targetDate = date.split('T')[0];
  return entries.filter(e => e.date.split('T')[0] === targetDate);
}

export function getEntriesByTag(tag: string): JournalEntry[] {
  const entries = loadJournalEntries();
  return entries.filter(e => e.tags.includes(tag));
}

export function getEntriesByMood(mood: MoodType): JournalEntry[] {
  const entries = loadJournalEntries();
  return entries.filter(e => e.mood === mood);
}

export function searchEntries(query: string): JournalEntry[] {
  const entries = loadJournalEntries();
  const lowerQuery = query.toLowerCase();
  return entries.filter(e => 
    e.content.toLowerCase().includes(lowerQuery) ||
    (e.title?.toLowerCase().includes(lowerQuery)) ||
    e.gratitudes.some(g => g.toLowerCase().includes(lowerQuery)) ||
    e.tags.some(t => t.toLowerCase().includes(lowerQuery))
  );
}

export function getAllTags(): string[] {
  const entries = loadJournalEntries();
  const tagSet = new Set<string>();
  entries.forEach(e => e.tags.forEach(t => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

// Streak calculation
function calculateStreak(entries: JournalEntry[]): { current: number; longest: number } {
  if (entries.length === 0) return { current: 0, longest: 0 };
  
  // Get unique dates with entries
  const datesWithEntries = new Set(
    entries.map(e => e.date.split('T')[0])
  );
  const sortedDates = Array.from(datesWithEntries).sort().reverse();
  
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  
  // Check if user has entry today or yesterday (streak is still active)
  const streakActive = sortedDates[0] === today || sortedDates[0] === yesterday;
  
  // Calculate streaks
  for (let i = 0; i < sortedDates.length; i++) {
    if (i === 0) {
      tempStreak = 1;
    } else {
      const current = new Date(sortedDates[i]);
      const previous = new Date(sortedDates[i - 1]);
      const diffDays = (previous.getTime() - current.getTime()) / 86400000;
      
      if (diffDays === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
  }
  
  longestStreak = Math.max(longestStreak, tempStreak);
  currentStreak = streakActive ? tempStreak : 0;
  
  // If today's entry exists, count from today
  if (sortedDates[0] === today) {
    currentStreak = 1;
    for (let i = 1; i < sortedDates.length; i++) {
      const current = new Date(sortedDates[i]);
      const previous = new Date(sortedDates[i - 1]);
      const diffDays = (previous.getTime() - current.getTime()) / 86400000;
      if (diffDays === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  } else if (sortedDates[0] === yesterday) {
    currentStreak = 1;
    for (let i = 1; i < sortedDates.length; i++) {
      const current = new Date(sortedDates[i]);
      const previous = new Date(sortedDates[i - 1]);
      const diffDays = (previous.getTime() - current.getTime()) / 86400000;
      if (diffDays === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }
  
  return { current: currentStreak, longest: longestStreak };
}

function updateStats(entries: JournalEntry[]): void {
  const moodDistribution: Record<MoodType, number> = {
    peaceful: 0,
    grateful: 0,
    inspired: 0,
    reflective: 0,
    anxious: 0,
    sad: 0,
    joyful: 0,
    neutral: 0,
  };
  
  const tagCounts: Record<string, number> = {};
  const entriesByMonth: Record<string, number> = {};
  let totalWords = 0;
  
  entries.forEach(entry => {
    moodDistribution[entry.mood]++;
    totalWords += entry.wordCount;
    
    entry.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    
    const month = entry.date.substring(0, 7); // YYYY-MM
    entriesByMonth[month] = (entriesByMonth[month] || 0) + 1;
  });
  
  const mostUsedTags = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  const { current, longest } = calculateStreak(entries);
  
  const stats: JournalStats = {
    totalEntries: entries.length,
    currentStreak: current,
    longestStreak: longest,
    totalWords,
    avgWordsPerEntry: entries.length > 0 ? Math.round(totalWords / entries.length) : 0,
    moodDistribution,
    mostUsedTags,
    entriesByMonth,
    journalingDays: [...new Set(entries.map(e => e.date.split('T')[0]))],
  };
  
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save journal stats:', e);
  }
}

export function getJournalStats(): JournalStats {
  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load journal stats:', e);
  }
  
  // Return default stats
  return {
    totalEntries: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalWords: 0,
    avgWordsPerEntry: 0,
    moodDistribution: {
      peaceful: 0,
      grateful: 0,
      inspired: 0,
      reflective: 0,
      anxious: 0,
      sad: 0,
      joyful: 0,
      neutral: 0,
    },
    mostUsedTags: [],
    entriesByMonth: {},
    journalingDays: [],
  };
}

export function hasEntryToday(): boolean {
  const entries = loadJournalEntries();
  const today = new Date().toISOString().split('T')[0];
  return entries.some(e => e.date.split('T')[0] === today);
}

// Check if there's a recent entry (within last 12 hours)
export function getRecentEntry(): JournalEntry | null {
  const entries = loadJournalEntries();
  if (entries.length === 0) return null;
  
  const twelveHoursAgo = Date.now() - (12 * 60 * 60 * 1000);
  const recent = entries.find(e => new Date(e.createdAt).getTime() > twelveHoursAgo);
  return recent || null;
}

