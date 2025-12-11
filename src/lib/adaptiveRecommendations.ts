/**
 * Adaptive Course Recommendations
 * 
 * Provides personalized course and content recommendations
 * based on the user's learning profile.
 */

import { loadLearningProfile, getTopTraditions, getInferredDifficulty } from './learningProfile';
import { ALL_COURSES } from '../core/study/registry';
import type { Course } from '../core/study/types';

export interface CourseRecommendation {
  course: Course;
  reason: string;
  matchScore: number;
}

export interface NextStepRecommendation {
  type: 'continue' | 'new_course' | 'review' | 'explore';
  title: string;
  description: string;
  action: {
    type: 'course' | 'lesson' | 'text';
    id: string;
  };
}

/**
 * Get personalized course recommendations
 */
export function getRecommendedCourses(limit = 3): CourseRecommendation[] {
  const profile = loadLearningProfile();
  const topTraditions = getTopTraditions();
  const preferredDifficulty = getInferredDifficulty();
  
  const recommendations: CourseRecommendation[] = [];
  
  for (const course of ALL_COURSES) {
    // Skip completed courses
    if (profile.completedCourses.includes(course.id)) {
      continue;
    }
    
    let matchScore = 0;
    let reason = '';
    
    // Match by tradition (if course covers user's favorite traditions)
    if (topTraditions.length > 0) {
      // Check if any lessons reference these traditions
      const courseTraditions = getCourseTraiditions(course);
      const matchingTraditions = courseTraditions.filter(t => 
        topTraditions.some(ut => t.toLowerCase().includes(ut.toLowerCase()))
      );
      
      if (matchingTraditions.length > 0) {
        matchScore += matchingTraditions.length * 10;
        reason = `Based on your interest in ${matchingTraditions[0]}`;
      }
    }
    
    // Match by difficulty
    if (course.difficulty === preferredDifficulty) {
      matchScore += 20;
      if (!reason) reason = `Matches your skill level`;
    } else if (course.difficulty === preferredDifficulty + 1) {
      matchScore += 10;
      if (!reason) reason = `A good next challenge`;
    }
    
    // Match by pathway type preference
    const completedPathwayTypes = profile.completedCourses.map(id => 
      ALL_COURSES.find(c => c.id === id)?.pathwayType
    ).filter(Boolean);
    
    if (completedPathwayTypes.length > 0) {
      // Suggest variety
      const mostCommonType = getMostCommon(completedPathwayTypes);
      if (course.pathwayType !== mostCommonType) {
        matchScore += 5;
        if (!reason) reason = `Try a different style of learning`;
      }
    }
    
    // Boost uncompleted courses with some progress
    const courseProgress = profile.completedLessons.filter(
      lessonId => course.lessons.some(l => l.id === lessonId)
    ).length;
    
    if (courseProgress > 0 && courseProgress < course.lessons.length) {
      matchScore += 30; // High priority to finish started courses
      reason = `Continue where you left off (${courseProgress}/${course.lessons.length} lessons)`;
    }
    
    // Default reason if none set
    if (!reason) {
      reason = getDefaultReason(course);
    }
    
    recommendations.push({
      course,
      reason,
      matchScore,
    });
  }
  
  // Sort by match score and return top results
  return recommendations
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
}

/**
 * Get next step recommendation
 */
export function getNextStep(): NextStepRecommendation | null {
  const profile = loadLearningProfile();
  
  // Check for in-progress courses
  for (const course of ALL_COURSES) {
    const completedInCourse = course.lessons.filter(l => 
      profile.completedLessons.includes(l.id)
    );
    
    if (completedInCourse.length > 0 && completedInCourse.length < course.lessons.length) {
      // Found an in-progress course
      const nextLesson = course.lessons.find(l => !profile.completedLessons.includes(l.id));
      
      if (nextLesson) {
        return {
          type: 'continue',
          title: `Continue: ${course.title}`,
          description: `Lesson ${completedInCourse.length + 1} of ${course.lessons.length}: ${nextLesson.title}`,
          action: {
            type: 'lesson',
            id: `${course.id}:${nextLesson.id}`,
          },
        };
      }
    }
  }
  
  // Suggest a new course based on interests
  const recommendations = getRecommendedCourses(1);
  if (recommendations.length > 0) {
    return {
      type: 'new_course',
      title: `Try: ${recommendations[0].course.title}`,
      description: recommendations[0].reason,
      action: {
        type: 'course',
        id: recommendations[0].course.id,
      },
    };
  }
  
  return null;
}

/**
 * Get suggestions based on what user is currently studying
 */
export function getRelatedContent(currentCourseId: string): string[] {
  const course = ALL_COURSES.find(c => c.id === currentCourseId);
  if (!course) return [];
  
  const courseTraditions = getCourseTraiditions(course);
  
  // Find related courses by tradition
  return ALL_COURSES
    .filter(c => c.id !== currentCourseId)
    .filter(c => {
      const otherTraditions = getCourseTraiditions(c);
      return otherTraditions.some(t => courseTraditions.includes(t));
    })
    .map(c => c.id);
}

// Helper functions

function getCourseTraiditions(course: Course): string[] {
  // Extract traditions from course title, description, and lessons
  const text = `${course.title} ${course.description}`.toLowerCase();
  
  const traditions = [
    'advaita', 'vedanta', 'buddhist', 'zen', 'taoist', 'christian', 
    'sufi', 'yoga', 'tantra', 'hindu', 'mystic'
  ];
  
  return traditions.filter(t => text.includes(t));
}

function getMostCommon<T>(arr: T[]): T | undefined {
  const counts = new Map<T, number>();
  for (const item of arr) {
    counts.set(item, (counts.get(item) || 0) + 1);
  }
  
  let max = 0;
  let result: T | undefined;
  for (const [item, count] of counts) {
    if (count > max) {
      max = count;
      result = item;
    }
  }
  
  return result;
}

function getDefaultReason(course: Course): string {
  switch (course.pathwayType) {
    case 'themed':
      return `Explore the theme of ${course.title.toLowerCase()}`;
    case 'tradition':
      return `Deep dive into ${course.title}`;
    case 'comparative':
      return `Compare wisdom across traditions`;
    default:
      return 'Expand your understanding';
  }
}

/**
 * Generate dynamic suggestions for the user
 */
export function getDynamicSuggestions(): string[] {
  const profile = loadLearningProfile();
  const suggestions: string[] = [];
  
  // Streak encouragement
  if (profile.currentStreak > 0) {
    suggestions.push(`🔥 Keep your ${profile.currentStreak}-day streak going!`);
  }
  
  // Diversity suggestion
  const traditions = Object.keys(profile.timeByTradition);
  if (traditions.length <= 1) {
    suggestions.push('Try exploring a different spiritual tradition today');
  }
  
  // Depth suggestion
  if (profile.completedLessons.length > 5 && profile.bookmarkedVerses.length < 3) {
    suggestions.push('Bookmark verses that resonate with you for later reflection');
  }
  
  // Consistency suggestion
  if (profile.totalSessionsCompleted > 0 && profile.currentStreak === 0) {
    suggestions.push('Return to your practice—consistency builds wisdom');
  }
  
  return suggestions;
}

