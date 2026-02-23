/**
 * Centralized Storage Keys
 *
 * All localStorage keys used throughout the application.
 * Using a single source of truth prevents key mismatches and typos.
 */

export const STORAGE_KEYS = {
  USER_STATE: 'mindvanta_user_state',
  JOURNAL: 'mindvanta_journal',
  JOURNAL_STATS: 'mindvanta_journal_stats',
  DREAMS: 'mindvanta_dreams',
  FAVORITES: 'mindvanta_favorites',
  STUDY_PROGRESS: 'mindvanta_study_progress',
  READING_PROGRESS: 'mindvanta_reading_progress',
  TEXT_SIZE: 'mindvanta_text_size',
  SOUND_SETTINGS: 'mindvanta_sound_settings',
  NOTIFICATION_SETTINGS: 'mindvanta_notification_settings',
  CHAT_HISTORY: 'mindvanta_chat_history',
  TEXT_EXPLANATIONS: 'mindvanta_text_explanations',
  LEARNING_PROFILE: 'mindvanta_learning_profile',
  ONBOARDING_COMPLETE: 'mindvanta_onboarding_complete',
  STREAK_DATA: 'mindvanta_streak_data',
  SHOWN_MILESTONES: 'mindvanta_shown_milestones',
  QUIZ_PROGRESS: 'mindvanta_quiz_progress',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
