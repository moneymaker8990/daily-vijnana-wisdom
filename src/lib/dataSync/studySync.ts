/**
 * Study Progress Sync
 */

import { supabase } from '../supabase';
import type { User } from '@supabase/supabase-js';
import { getAllProgress, saveAllProgress } from '@core/study/progress';
import type { AllStudyProgress, StudyProgress } from '@core/study/types';

export interface StudyProgressSync {
  courseId: string;
  currentLesson: string | null;
  completedLessons: string[];
  startedAt: string;
}

function toSyncProgress(progress: StudyProgress): StudyProgressSync {
  return {
    courseId: progress.courseId,
    currentLesson: progress.currentLesson,
    completedLessons: progress.completedLessons,
    startedAt: progress.startedAt,
  };
}

function fromSyncProgress(progress: StudyProgressSync): StudyProgress {
  return {
    courseId: progress.courseId,
    currentLesson: progress.currentLesson,
    completedLessons: progress.completedLessons,
    startedAt: progress.startedAt,
    lastAccessedAt: new Date().toISOString(),
  };
}

function getLocalStudyProgressForSync(): StudyProgressSync[] {
  return Object.values(getAllProgress().courses).map(toSyncProgress);
}

function saveCloudProgressLocally(progress: StudyProgressSync[]): void {
  const allProgress: AllStudyProgress = {
    courses: progress.reduce<Record<string, StudyProgress>>((acc, item) => {
      acc[item.courseId] = fromSyncProgress(item);
      return acc;
    }, {}),
  };
  saveAllProgress(allProgress);
}

export async function syncStudyProgress(user: User | null): Promise<StudyProgressSync[]> {
  if (!user) {
    return getLocalStudyProgressForSync();
  }

  const { data: cloudProgress, error } = await supabase
    .from('study_progress')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    return getLocalStudyProgressForSync();
  }

  const progress: StudyProgressSync[] = (cloudProgress || []).map(p => ({
    courseId: p.course_id,
    currentLesson: p.current_lesson,
    completedLessons: p.completed_lessons || [],
    startedAt: p.started_at,
  }));

  saveCloudProgressLocally(progress);
  return progress;
}

export async function saveStudyProgress(
  user: User | null,
  progress: StudyProgressSync
): Promise<void> {
  const localProgress = getAllProgress();
  localProgress.courses[progress.courseId] = fromSyncProgress(progress);
  saveAllProgress(localProgress);

  if (user) {
    await supabase
      .from('study_progress')
      .upsert({
        user_id: user.id,
        course_id: progress.courseId,
        current_lesson: progress.currentLesson,
        completed_lessons: progress.completedLessons,
        started_at: progress.startedAt,
      });
  }
}

export async function uploadLocalStudyProgress(user: User): Promise<void> {
  const progress = getLocalStudyProgressForSync();
  for (const item of progress) {
    await supabase.from('study_progress').upsert({
      user_id: user.id,
      course_id: item.courseId,
      current_lesson: item.currentLesson,
      completed_lessons: item.completedLessons,
      started_at: item.startedAt,
    });
  }
}
