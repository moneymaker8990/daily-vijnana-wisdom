/**
 * CourseCard - Preview card for a study course
 * 
 * Shows course info, difficulty, duration, and progress.
 */

import { getCourseProgress, getCourseCompletionPercent } from '../../core/study/progress';
import type { Course } from '../../core/study/types';

type CourseCardProps = {
  course: Course;
  onSelect: () => void;
  showProgress?: boolean;
  compact?: boolean;
};

export function CourseCard({ course, onSelect, showProgress = false, compact = false }: CourseCardProps) {
  const progress = showProgress ? getCourseProgress(course.id) : null;
  const completionPercent = progress 
    ? getCourseCompletionPercent(course.id, course.lessons.length) 
    : 0;
  const isInProgress = completionPercent > 0 && completionPercent < 100;
  const isComplete = completionPercent === 100;

  if (compact) {
    return (
      <button
        onClick={onSelect}
        className="w-full text-left bg-gradient-to-br from-violet-500/20 to-indigo-500/10 rounded-xl p-4 border border-violet-500/30 transition-all duration-300 group hover:from-violet-500/30 hover:to-indigo-500/20"
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl flex-shrink-0">{course.icon}</div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-white truncate">{course.title}</h4>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <span>Lesson {progress?.completedLessons.length || 0}/{course.lessons.length}</span>
              <span className="text-white/20">•</span>
              <span className="text-violet-300">{completionPercent}% complete</span>
            </div>
          </div>
          <div className="flex-shrink-0 text-white/60 group-hover:text-white/90 group-hover:translate-x-1 transition-all">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onSelect}
      className="w-full text-left bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 border border-white/10 transition-all duration-300 group hover:from-white/15 hover:to-white/10 hover:border-white/20"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="text-2xl flex-shrink-0">{course.icon}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-serif text-white group-hover:text-violet-200 transition-colors">
              {course.title}
            </h3>
            {isComplete && (
              <span className="flex-shrink-0 text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
                ✓ Complete
              </span>
            )}
            {isInProgress && (
              <span className="flex-shrink-0 text-xs bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full">
                In Progress
              </span>
            )}
          </div>
          
          <p className="text-xs text-white/60 mb-3 line-clamp-2">
            {course.description}
          </p>
          
          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/40">
            <span className="flex items-center gap-1">
              <DifficultyDots difficulty={course.difficulty} />
              {getDifficultyLabel(course.difficulty)}
            </span>
            <span className="text-white/20">•</span>
            <span>{course.lessons.length} lessons</span>
            <span className="text-white/20">•</span>
            <span>~{course.estimatedWeeks} week{course.estimatedWeeks !== 1 ? 's' : ''}</span>
          </div>

          {/* Progress bar */}
          {showProgress && completionPercent > 0 && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-white/40 mb-1">
                <span>{progress?.completedLessons.length || 0}/{course.lessons.length} lessons</span>
                <span className="text-violet-300">{completionPercent}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 transition-transform group-hover:translate-x-1">
          <svg className="w-5 h-5 text-white/40 group-hover:text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}

function DifficultyDots({ difficulty }: { difficulty: 1 | 2 | 3 }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3].map(level => (
        <span
          key={level}
          className={`w-1.5 h-1.5 rounded-full ${
            level <= difficulty ? 'bg-violet-400' : 'bg-white/20'
          }`}
        />
      ))}
    </span>
  );
}

function getDifficultyLabel(difficulty: 1 | 2 | 3): string {
  switch (difficulty) {
    case 1: return 'Beginner';
    case 2: return 'Intermediate';
    case 3: return 'Advanced';
  }
}

