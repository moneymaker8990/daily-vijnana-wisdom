/**
 * Study Progress Sync
 */

import { supabase } from '../supabase';
import type { User } from '@supabase/supabase-js';
import { STORAGE_KEYS } from '@lib/constants';

export interface StudyProgressSync {
  courseId: string;
  currentLesson: string | null;
  completedLessons: string[];
  startedAt: string;
}

export async function syncStudyProgress(user: User | null): Promise<StudyProgressSync[]> {
  if (!user) {
    const stored = localStorage.getItem(STORAGE_KEYS.STUDY_PROGRESS);
    return stored ? JSON.parse(stored) : [];
  }

  const { data: cloudProgress, error } = await supabase
    .from('study_progress')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    const stored = localStorage.getItem(STORAGE_KEYS.STUDY_PROGRESS);
    return stored ? JSON.parse(stored) : [];
  }

  const progress: StudyProgressSync[] = (cloudProgress || []).map(p => ({
    courseId: p.course_id,
    currentLesson: p.current_lesson,
    completedLessons: p.completed_lessons || [],
    startedAt: p.started_at,
  }));

  localStorage.setItem(STORAGE_KEYS.STUDY_PROGRESS, JSON.stringify(progress));
  return progress;
}

export async function saveStudyProgress(
  user: User | null,
  progress: StudyProgressSync
): Promise<void> {
  const stored = localStorage.getItem(STORAGE_KEYS.STUDY_PROGRESS);
  const allProgress: StudyProgressSync[] = stored ? JSON.parse(stored) : [];
  const existingIndex = allProgress.findIndex(p => p.courseId === progress.courseId);

  if (existingIndex >= 0) {
    allProgress[existingIndex] = progress;
  } else {
    allProgress.push(progress);
  }
  localStorage.setItem(STORAGE_KEYS.STUDY_PROGRESS, JSON.stringify(allProgress));

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
  const localProgress = localStorage.getItem(STORAGE_KEYS.STUDY_PROGRESS);
  if (localProgress) {
    const progress: StudyProgressSync[] = JSON.parse(localProgress);
    for (const p of progress) {
      await supabase.from('study_progress').upsert({
        user_id: user.id,
        course_id: p.courseId,
        current_lesson: p.currentLesson,
        completed_lessons: p.completedLessons,
        started_at: p.startedAt,
      });
    }
  }
}
