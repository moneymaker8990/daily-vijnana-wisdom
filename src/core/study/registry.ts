/**
 * Study Course Registry
 * 
 * Central registry for all study courses, organized by pathway type.
 */

import type { Course, PathwayType } from './types';

// Import themed courses
import { natureOfSelfCourse } from './courses/themed/natureOfSelf';

// Import tradition courses  
import { advaitaEssentialsCourse } from './courses/tradition/advaitaEssentials';

// Import comparative courses
import { nondualityAcrossCourse } from './courses/comparative/nondualityAcross';

/**
 * ALL_COURSES: The complete collection of study courses
 */
export const ALL_COURSES: Course[] = [
  natureOfSelfCourse,
  advaitaEssentialsCourse,
  nondualityAcrossCourse,
];

/**
 * Get all courses
 */
export function getAllCourses(): Course[] {
  return ALL_COURSES;
}

/**
 * Get courses by pathway type
 */
export function getCoursesByPathway(pathway: PathwayType): Course[] {
  return ALL_COURSES.filter(c => c.pathwayType === pathway);
}

/**
 * Get themed courses (cross-tradition journeys)
 */
export function getThemedCourses(): Course[] {
  return getCoursesByPathway('themed');
}

/**
 * Get tradition courses (deep dives)
 */
export function getTraditionCourses(): Course[] {
  return getCoursesByPathway('tradition');
}

/**
 * Get comparative courses
 */
export function getComparativeCourses(): Course[] {
  return getCoursesByPathway('comparative');
}

/**
 * Get a specific course by ID
 */
export function getCourseById(courseId: string): Course | undefined {
  return ALL_COURSES.find(c => c.id === courseId);
}

/**
 * Get a specific lesson from a course
 */
export function getLesson(courseId: string, lessonId: string) {
  const course = getCourseById(courseId);
  if (!course) return undefined;
  return course.lessons.find(l => l.id === lessonId);
}

/**
 * Get lesson index within a course
 */
export function getLessonIndex(courseId: string, lessonId: string): number {
  const course = getCourseById(courseId);
  if (!course) return -1;
  return course.lessons.findIndex(l => l.id === lessonId);
}

/**
 * Get next lesson in a course
 */
export function getNextLesson(courseId: string, currentLessonId: string) {
  const course = getCourseById(courseId);
  if (!course) return undefined;
  
  const currentIndex = course.lessons.findIndex(l => l.id === currentLessonId);
  if (currentIndex === -1 || currentIndex >= course.lessons.length - 1) {
    return undefined;
  }
  
  return course.lessons[currentIndex + 1];
}

/**
 * Get previous lesson in a course
 */
export function getPreviousLesson(courseId: string, currentLessonId: string) {
  const course = getCourseById(courseId);
  if (!course) return undefined;
  
  const currentIndex = course.lessons.findIndex(l => l.id === currentLessonId);
  if (currentIndex <= 0) {
    return undefined;
  }
  
  return course.lessons[currentIndex - 1];
}

/**
 * Check if a lesson is the first in a course
 */
export function isFirstLesson(courseId: string, lessonId: string): boolean {
  const course = getCourseById(courseId);
  if (!course || course.lessons.length === 0) return false;
  return course.lessons[0].id === lessonId;
}

/**
 * Check if a lesson is the last in a course
 */
export function isLastLesson(courseId: string, lessonId: string): boolean {
  const course = getCourseById(courseId);
  if (!course || course.lessons.length === 0) return false;
  return course.lessons[course.lessons.length - 1].id === lessonId;
}

/**
 * Get course statistics
 */
export function getCourseStats() {
  return {
    total: ALL_COURSES.length,
    themed: getThemedCourses().length,
    tradition: getTraditionCourses().length,
    comparative: getComparativeCourses().length,
    totalLessons: ALL_COURSES.reduce((sum, c) => sum + c.lessons.length, 0),
  };
}

