/**
 * Study Pathways - Data Types
 * 
 * Three pathway types for different learning approaches:
 * - Themed: Cross-tradition journeys on universal themes
 * - Tradition: Deep dives into specific spiritual traditions
 * - Comparative: Side-by-side exploration of similar teachings
 */

export type PathwayType = 'themed' | 'tradition' | 'comparative';

export type Difficulty = 1 | 2 | 3;

/**
 * Practice section within a lesson
 */
export interface Practice {
  title: string;
  duration: string;
  instructions: string[];
}

/**
 * Individual lesson within a course
 */
export interface Lesson {
  id: string;
  title: string;
  introduction: string;
  verses: string[]; // verse IDs from ALL_VERSES
  reflectionQuestions: string[];
  practice: Practice;
  traditionalContext?: string; // for comparative lessons
}

/**
 * A complete study course
 */
export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  pathwayType: PathwayType;
  difficulty: Difficulty;
  estimatedWeeks: number;
  lessons: Lesson[];
}

/**
 * User's progress through a course
 */
export interface StudyProgress {
  courseId: string;
  completedLessons: string[];
  currentLesson: string;
  startedAt: string;
  lastAccessedAt?: string;
}

/**
 * All study progress for a user
 */
export interface AllStudyProgress {
  courses: Record<string, StudyProgress>;
}

/**
 * Pathway display info for the Study Hub
 */
export interface PathwayInfo {
  type: PathwayType;
  title: string;
  description: string;
  icon: string;
}

export const PATHWAY_INFO: PathwayInfo[] = [
  {
    type: 'themed',
    title: 'Thematic Journeys',
    description: 'Explore universal themes across multiple traditions',
    icon: '🌟',
  },
  {
    type: 'tradition',
    title: 'Tradition Deep Dives',
    description: 'Immerse yourself in a single spiritual lineage',
    icon: '📚',
  },
  {
    type: 'comparative',
    title: 'Comparative Studies',
    description: 'Discover how different traditions illuminate the same truths',
    icon: '🔀',
  },
];



