import { STORAGE_KEYS } from './constants';

const REVIEW_STATE_KEY = 'mindvanta_review_prompt_state';
const COOLDOWN_MS = 1000 * 60 * 60 * 24 * 14; // 14 days

type ReviewPromptState = {
  dismissedForever?: boolean;
  lastShownAt?: string;
  acceptedAt?: string;
};

type ThresholdInputs = {
  streakDays: number;
  journalEntries: number;
  dreamEntries: number;
};

function getState(): ReviewPromptState {
  try {
    const raw = localStorage.getItem(REVIEW_STATE_KEY);
    return raw ? (JSON.parse(raw) as ReviewPromptState) : {};
  } catch {
    return {};
  }
}

function saveState(state: ReviewPromptState): void {
  localStorage.setItem(REVIEW_STATE_KEY, JSON.stringify(state));
}

function hasCooldownElapsed(lastShownAt?: string): boolean {
  if (!lastShownAt) return true;
  const shownAtMs = new Date(lastShownAt).getTime();
  if (Number.isNaN(shownAtMs)) return true;
  return Date.now() - shownAtMs > COOLDOWN_MS;
}

export function getValueMomentInputs(): ThresholdInputs {
  let journalEntries = 0;
  let dreamEntries = 0;

  try {
    const journalRaw = localStorage.getItem(STORAGE_KEYS.JOURNAL);
    const journal = journalRaw ? (JSON.parse(journalRaw) as unknown[]) : [];
    journalEntries = journal.length;
  } catch {
    journalEntries = 0;
  }

  try {
    const dreamRaw = localStorage.getItem(STORAGE_KEYS.DREAMS);
    const dreams = dreamRaw ? (JSON.parse(dreamRaw) as unknown[]) : [];
    dreamEntries = dreams.length;
  } catch {
    dreamEntries = 0;
  }

  let streakDays = 0;
  try {
    const streakRaw = localStorage.getItem(STORAGE_KEYS.STREAK_DATA);
    const streak = streakRaw ? (JSON.parse(streakRaw) as { current?: number }) : {};
    streakDays = typeof streak.current === 'number' ? streak.current : 0;
  } catch {
    streakDays = 0;
  }

  return { streakDays, journalEntries, dreamEntries };
}

export function shouldShowReviewPrompt(inputs: ThresholdInputs): boolean {
  const state = getState();
  if (state.dismissedForever || state.acceptedAt) return false;
  if (!hasCooldownElapsed(state.lastShownAt)) return false;

  return (
    inputs.streakDays >= 7 ||
    inputs.journalEntries >= 3 ||
    inputs.dreamEntries >= 2
  );
}

export function markReviewPromptShown(): void {
  const state = getState();
  saveState({ ...state, lastShownAt: new Date().toISOString() });
}

export function markReviewPromptAccepted(): void {
  const state = getState();
  saveState({ ...state, acceptedAt: new Date().toISOString() });
}

export function markReviewPromptDismissedForever(): void {
  const state = getState();
  saveState({ ...state, dismissedForever: true });
}
