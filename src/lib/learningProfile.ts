/**
 * Learning Profile Tracker
 *
 * Tracks user's learning patterns, preferences, and interests
 * to provide personalized recommendations.
 */

import { STORAGE_KEYS } from '@lib/constants';

export interface LearningProfile {
  // Time spent per tradition (in minutes)
  timeByTradition: Record<string, number>;
  
  // Completion data
  completedCourses: string[];
  completedLessons: string[];
  
  // Preferences
  preferredDifficulty: 1 | 2 | 3;
  preferredSessionLength: 'short' | 'medium' | 'long';
  
  // Interest signals
  bookmarkedVerses: string[];
  favoriteTopics: string[];
  timesBySource: Record<string, number>;
  
  // Engagement patterns
  lastActiveAt: string;
  totalSessionsCompleted: number;
  averageSessionDuration: number;
  
  // Study streak
  currentStreak: number;
  longestStreak: number;
  studyDays: string[];
}

/**
 * Load learning profile from localStorage
 */
export function loadLearningProfile(): LearningProfile {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LEARNING_PROFILE);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    // Load failed, return default profile
  }
  
  return getDefaultProfile();
}

/**
 * Save learning profile to localStorage
 */
export function saveLearningProfile(profile: LearningProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.LEARNING_PROFILE, JSON.stringify(profile));
  } catch (e) {
    // Save failed silently
  }
}

/**
 * Get default empty profile
 */
function getDefaultProfile(): LearningProfile {
  return {
    timeByTradition: {},
    completedCourses: [],
    completedLessons: [],
    preferredDifficulty: 2,
    preferredSessionLength: 'medium',
    bookmarkedVerses: [],
    favoriteTopics: [],
    timesBySource: {},
    lastActiveAt: new Date().toISOString(),
    totalSessionsCompleted: 0,
    averageSessionDuration: 0,
    currentStreak: 0,
    longestStreak: 0,
    studyDays: [],
  };
}

/**
 * Record time spent on a tradition
 */
export function recordTraditionTime(tradition: string, minutes: number): void {
  const profile = loadLearningProfile();
  profile.timeByTradition[tradition] = (profile.timeByTradition[tradition] || 0) + minutes;
  saveLearningProfile(profile);
}

/**
 * Record time spent on a source
 */
export function recordSourceTime(sourceId: string, minutes: number): void {
  const profile = loadLearningProfile();
  profile.timesBySource[sourceId] = (profile.timesBySource[sourceId] || 0) + minutes;
  saveLearningProfile(profile);
}

/**
 * Mark a lesson as completed
 */
export function markLessonComplete(_courseId: string, lessonId: string): void {
  const profile = loadLearningProfile();
  
  if (!profile.completedLessons.includes(lessonId)) {
    profile.completedLessons.push(lessonId);
    profile.totalSessionsCompleted++;
  }
  
  // Update study day tracking
  const today = new Date().toISOString().split('T')[0];
  if (!profile.studyDays.includes(today)) {
    profile.studyDays.push(today);
    updateStreak(profile);
  }
  
  profile.lastActiveAt = new Date().toISOString();
  saveLearningProfile(profile);
}

/**
 * Mark a course as completed
 */
export function markCourseComplete(courseId: string): void {
  const profile = loadLearningProfile();
  
  if (!profile.completedCourses.includes(courseId)) {
    profile.completedCourses.push(courseId);
  }
  
  saveLearningProfile(profile);
}

/**
 * Add a bookmarked verse
 */
export function addBookmarkedVerse(verseId: string): void {
  const profile = loadLearningProfile();
  
  if (!profile.bookmarkedVerses.includes(verseId)) {
    profile.bookmarkedVerses.push(verseId);
    saveLearningProfile(profile);
  }
}

/**
 * Remove a bookmarked verse
 */
export function removeBookmarkedVerse(verseId: string): void {
  const profile = loadLearningProfile();
  profile.bookmarkedVerses = profile.bookmarkedVerses.filter(id => id !== verseId);
  saveLearningProfile(profile);
}

/**
 * Update study streak
 */
function updateStreak(profile: LearningProfile): void {
  const today = new Date();
  const yesterday = new Date(today.getTime() - 86400000);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  if (profile.studyDays.includes(yesterdayStr)) {
    profile.currentStreak++;
  } else {
    profile.currentStreak = 1;
  }
  
  if (profile.currentStreak > profile.longestStreak) {
    profile.longestStreak = profile.currentStreak;
  }
}

/**
 * Get the user's top traditions by time spent
 */
export function getTopTraditions(limit = 3): string[] {
  const profile = loadLearningProfile();
  
  return Object.entries(profile.timeByTradition)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([tradition]) => tradition);
}

/**
 * Get the user's preferred difficulty based on completed courses
 */
export function getInferredDifficulty(): 1 | 2 | 3 {
  const profile = loadLearningProfile();
  
  // If user has completed higher difficulty courses, suggest higher difficulty
  if (profile.completedCourses.length >= 2) {
    return 3;
  } else if (profile.completedCourses.length >= 1) {
    return 2;
  }
  
  return profile.preferredDifficulty;
}

/**
 * Get engagement score (0-100)
 */
export function getEngagementScore(): number {
  const profile = loadLearningProfile();
  
  let score = 0;
  
  // Points for streak (max 30)
  score += Math.min(profile.currentStreak * 5, 30);
  
  // Points for completed lessons (max 30)
  score += Math.min(profile.completedLessons.length * 2, 30);
  
  // Points for diversity of traditions (max 20)
  score += Math.min(Object.keys(profile.timeByTradition).length * 5, 20);
  
  // Points for bookmarks (max 10)
  score += Math.min(profile.bookmarkedVerses.length, 10);
  
  // Points for recent activity (max 10)
  const daysSinceActive = Math.floor(
    (Date.now() - new Date(profile.lastActiveAt).getTime()) / 86400000
  );
  score += Math.max(10 - daysSinceActive, 0);
  
  return Math.min(score, 100);
}

