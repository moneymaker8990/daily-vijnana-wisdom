export type UserState = {
  currentDay: number;
  lastVisited: string; // ISO string
};

const STORAGE_KEY = 'daily-vijnana-state';

export function loadUserState(): UserState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserState;
  } catch {
    return null;
  }
}

export function saveUserState(state: UserState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // fail silently
  }
}




