/**
 * Quiz result persistence (localStorage)
 */

import { STORAGE_KEYS } from '@lib/constants';
import type { QuizResult } from '@data/quizzes/types';

function loadAll(): QuizResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUIZ_PROGRESS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAll(results: QuizResult[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.QUIZ_PROGRESS, JSON.stringify(results));
  } catch {
    // silently fail
  }
}

export function saveQuizResult(result: QuizResult): void {
  const all = loadAll();
  const idx = all.findIndex(r => r.courseId === result.courseId && r.lessonId === result.lessonId);
  if (idx >= 0) {
    all[idx] = result;
  } else {
    all.push(result);
  }
  saveAll(all);
}

export function getQuizResult(courseId: string, lessonId: string): QuizResult | null {
  return loadAll().find(r => r.courseId === courseId && r.lessonId === lessonId) ?? null;
}

export function hasCompletedQuiz(courseId: string, lessonId: string): boolean {
  return getQuizResult(courseId, lessonId) !== null;
}
