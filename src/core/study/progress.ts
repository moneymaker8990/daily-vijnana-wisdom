/**
 * Study Progress - localStorage helpers
 *
 * Manages user progress through study courses
 */

import type { StudyProgress, AllStudyProgress } from './types';
import { STORAGE_KEYS } from '@lib/constants';

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}

function normalizeStudyProgressRecord(value: unknown, fallbackCourseId?: string): StudyProgress | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const record = value as Record<string, unknown>;
  const courseId = typeof record.courseId === 'string' ? record.courseId : fallbackCourseId;
  const completedLessons = isStringArray(record.completedLessons) ? record.completedLessons : [];
  const currentLesson = typeof record.currentLesson === 'string' ? record.currentLesson : null;
  const startedAt = typeof record.startedAt === 'string' ? record.startedAt : new Date().toISOString();
  const lastAccessedAt = typeof record.lastAccessedAt === 'string' ? record.lastAccessedAt : undefined;

  if (!courseId) {
    return null;
  }

  return {
    courseId,
    completedLessons,
    currentLesson,
    startedAt,
    lastAccessedAt,
  };
}

function normalizeStoredProgress(value: unknown): AllStudyProgress {
  if (Array.isArray(value)) {
    const courses = value.reduce<Record<string, StudyProgress>>((acc, item) => {
      const normalized = normalizeStudyProgressRecord(item);
      if (normalized) {
        acc[normalized.courseId] = normalized;
      }
      return acc;
    }, {});

    return { courses };
  }

  if (value && typeof value === 'object' && 'courses' in value) {
    const maybeCourses = (value as { courses?: unknown }).courses;
    if (maybeCourses && typeof maybeCourses === 'object' && !Array.isArray(maybeCourses)) {
      const courses = Object.entries(maybeCourses as Record<string, unknown>).reduce<Record<string, StudyProgress>>(
        (acc, [courseId, item]) => {
          const normalized = normalizeStudyProgressRecord(item, courseId);
          if (normalized) {
            acc[courseId] = normalized;
          }
          return acc;
        },
        {}
      );

      return { courses };
    }
  }

  return { courses: {} };
}

/**
 * Get all study progress from localStorage
 */
export function getAllProgress(): AllStudyProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.STUDY_PROGRESS);
    if (stored) {
      return normalizeStoredProgress(JSON.parse(stored));
    }
  } catch (error) {
    // Error reading study progress handled silently
  }
  return { courses: {} };
}

/**
 * Save all study progress to localStorage
 */
export function saveAllProgress(progress: AllStudyProgress): void {
  try {
    localStorage.setItem(STORAGE_KEYS.STUDY_PROGRESS, JSON.stringify(normalizeStoredProgress(progress)));
  } catch (error) {
    // Error saving study progress handled silently
  }
}

/**
 * Get progress for a specific course
 */
export function getCourseProgress(courseId: string): StudyProgress | null {
  const all = getAllProgress();
  return all.courses[courseId] || null;
}

/**
 * Start a new course
 */
export function startCourse(courseId: string, firstLessonId: string): StudyProgress {
  const all = getAllProgress();
  const progress: StudyProgress = {
    courseId,
    completedLessons: [],
    currentLesson: firstLessonId,
    startedAt: new Date().toISOString(),
    lastAccessedAt: new Date().toISOString(),
  };
  all.courses[courseId] = progress;
  saveAllProgress(all);
  return progress;
}

/**
 * Complete a lesson and move to the next
 */
export function completeLesson(
  courseId: string, 
  lessonId: string, 
  nextLessonId?: string
): StudyProgress | null {
  const all = getAllProgress();
  const progress = all.courses[courseId];
  
  if (!progress) return null;
  
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
  }
  
  if (nextLessonId) {
    progress.currentLesson = nextLessonId;
  }
  
  progress.lastAccessedAt = new Date().toISOString();
  saveAllProgress(all);
  
  return progress;
}

/**
 * Update current lesson (for navigation)
 */
export function setCurrentLesson(courseId: string, lessonId: string): void {
  const all = getAllProgress();
  const progress = all.courses[courseId];
  
  if (progress) {
    progress.currentLesson = lessonId;
    progress.lastAccessedAt = new Date().toISOString();
    saveAllProgress(all);
  }
}

/**
 * Check if a lesson is completed
 */
export function isLessonCompleted(courseId: string, lessonId: string): boolean {
  const progress = getCourseProgress(courseId);
  return progress?.completedLessons.includes(lessonId) ?? false;
}

/**
 * Check if a course is completed
 */
export function isCourseCompleted(courseId: string, totalLessons: number): boolean {
  const progress = getCourseProgress(courseId);
  return progress?.completedLessons.length === totalLessons;
}

/**
 * Get completion percentage for a course
 */
export function getCourseCompletionPercent(courseId: string, totalLessons: number): number {
  const progress = getCourseProgress(courseId);
  if (!progress || totalLessons === 0) return 0;
  return Math.round((progress.completedLessons.length / totalLessons) * 100);
}

/**
 * Reset progress for a course
 */
export function resetCourseProgress(courseId: string): void {
  const all = getAllProgress();
  delete all.courses[courseId];
  saveAllProgress(all);
}

/**
 * Get all in-progress courses (started but not completed)
 */
export function getInProgressCourses(): string[] {
  const all = getAllProgress();
  return Object.keys(all.courses);
}



