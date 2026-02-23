import { STORAGE_KEYS } from '@lib/constants';

export type StreakData = {
  current: number;
  longest: number;
  totalDays: number;
  lastVisit: string; // ISO date string YYYY-MM-DD
};

type MilestoneInfo = {
  days: number;
  title: string;
  message: string;
};

const MILESTONES: MilestoneInfo[] = [
  { days: 3, title: 'First Steps', message: 'Three days of showing up — the seed of a habit is planted.' },
  { days: 7, title: 'A Week of Presence', message: 'Seven days of dedication. You are building something lasting.' },
  { days: 14, title: 'The Fortnight', message: 'Two weeks of practice. Your commitment is deepening.' },
  { days: 21, title: 'New Pathways', message: 'Twenty-one days — the mind is rewiring itself through your practice.' },
  { days: 30, title: 'A Moon Cycle', message: 'A full moon cycle of dedication. The rhythm of practice is becoming natural.' },
  { days: 60, title: 'The Deepening', message: 'Sixty days of wisdom. Your inner landscape is transforming.' },
  { days: 90, title: 'A Season of Growth', message: 'Ninety days — a full season devoted to awakening. Remarkable.' },
  { days: 180, title: 'Half the Journey', message: 'One hundred and eighty days. You have walked half the path with unwavering spirit.' },
  { days: 365, title: 'A Year of Wisdom', message: 'Three hundred sixty-five days. A complete cycle. You have touched every season with awareness.' },
];

function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + 'T00:00:00');
  const db = new Date(b + 'T00:00:00');
  return Math.round((db.getTime() - da.getTime()) / 86400000);
}

export function getStreakData(): StreakData {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.STREAK_DATA);
    if (stored) return JSON.parse(stored);
  } catch { /* use defaults */ }
  return { current: 0, longest: 0, totalDays: 0, lastVisit: '' };
}

function saveStreakData(data: StreakData): void {
  try {
    localStorage.setItem(STORAGE_KEYS.STREAK_DATA, JSON.stringify(data));
  } catch { /* save failed silently */ }
}

export function recordDailyVisit(): StreakData {
  const today = getTodayKey();
  const data = getStreakData();

  // Already visited today
  if (data.lastVisit === today) return data;

  const gap = data.lastVisit ? daysBetween(data.lastVisit, today) : 0;

  if (gap === 1) {
    // Consecutive day
    data.current += 1;
  } else if (gap === 0 && data.lastVisit === '') {
    // Very first visit
    data.current = 1;
  } else {
    // Streak broken (gap > 1) or first visit
    data.current = 1;
  }

  data.totalDays += 1;
  if (data.current > data.longest) data.longest = data.current;
  data.lastVisit = today;

  saveStreakData(data);
  return data;
}

export function checkNewMilestone(streak: StreakData): MilestoneInfo | null {
  const milestone = MILESTONES.find((m) => m.days === streak.current);
  if (!milestone) return null;

  // Check if already shown
  try {
    const shown = localStorage.getItem(STORAGE_KEYS.SHOWN_MILESTONES);
    const shownSet: number[] = shown ? JSON.parse(shown) : [];
    if (shownSet.includes(milestone.days)) return null;

    // Mark as shown
    shownSet.push(milestone.days);
    localStorage.setItem(STORAGE_KEYS.SHOWN_MILESTONES, JSON.stringify(shownSet));
  } catch { /* proceed */ }

  return milestone;
}
