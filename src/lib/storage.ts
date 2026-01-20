import { STORAGE_KEYS } from '@lib/constants';

export type UserState = {
  currentDay: number;
  lastVisited: string; // ISO string
};

export function loadUserState(): UserState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_STATE);
    if (!raw) return null;
    return JSON.parse(raw) as UserState;
  } catch {
    return null;
  }
}

export function saveUserState(state: UserState) {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_STATE, JSON.stringify(state));
  } catch {
    // fail silently
  }
}











