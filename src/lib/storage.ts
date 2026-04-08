import { STORAGE_KEYS } from '@lib/constants';

export type UserState = {
  currentDay: number;
  lastVisited: string; // ISO string
};

function isValidDateString(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(new Date(value).getTime());
}

function normalizeCurrentDay(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.min(365, Math.max(1, Math.floor(value)));
  }
  return 1;
}

function normalizeUserState(value: unknown): UserState | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const raw = value as Record<string, unknown>;
  return {
    currentDay: normalizeCurrentDay(raw.currentDay),
    lastVisited: isValidDateString(raw.lastVisited) ? raw.lastVisited : new Date().toISOString(),
  };
}

export function loadUserState(): UserState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_STATE);
    if (!raw) return null;
    return normalizeUserState(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function saveUserState(state: UserState) {
  try {
    const normalized = normalizeUserState(state);
    if (!normalized) {
      return;
    }
    localStorage.setItem(STORAGE_KEYS.USER_STATE, JSON.stringify(normalized));
  } catch {
    // fail silently
  }
}











