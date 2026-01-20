/**
 * CourseView - Detailed view of a course with lesson list
 * 
 * Shows course overview, progress, and list of lessons.
 */

import { getCourseById } from '@core/study/registry';
import {
  getCourseProgress,
  startCourse,
  isLessonCompleted,
  getCourseCompletionPercent
} from '@core/study/progress';

type CourseViewProps = {
  courseId: string;
  onBack: () => void;
  onStartLesson: (lessonId: string) => void;
};

export function CourseView({ courseId, onBack, onStartLesson }: CourseViewProps) {
  const course = getCourseById(courseId);
  
  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60">Course not found</p>
        <button onClick={onBack} className="mt-4 text-violet-400 hover:text-violet-300">
          Go back
        </button>
      </div>
    );
  }

  const progress = getCourseProgress(courseId);
  const completionPercent = getCourseCompletionPercent(courseId, course.lessons.length);
  const isStarted = progress !== null;
  const isComplete = completionPercent === 100;

  const handleStartCourse = () => {
    if (!isStarted && course.lessons.length > 0) {
      startCourse(courseId, course.lessons[0].id);
    }
    const firstIncomplete = course.lessons.find(l => !isLessonCompleted(courseId, l.id));
    if (firstIncomplete) {
      onStartLesson(firstIncomplete.id);
    } else {
      onStartLesson(course.lessons[0].id);
    }
  };

  const handleContinue = () => {
    if (progress?.currentLesson) {
      onStartLesson(progress.currentLesson);
    } else {
      handleStartCourse();
    }
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm">All Courses</span>
      </button>

      {/* Course Header */}
      <div className="bg-gradient-to-br from-violet-500/20 to-indigo-500/10 rounded-2xl p-6 border border-violet-500/30">
        <div className="flex items-start gap-4">
          <div className="text-4xl">{course.icon}</div>
          <div className="flex-1">
            <h2 className="text-xl font-serif text-white mb-2">{course.title}</h2>
            <p className="text-sm text-white/70 mb-4">{course.description}</p>
            
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/50">
              <span className="flex items-center gap-1">
                <DifficultyBadge difficulty={course.difficulty} />
              </span>
              <span>{course.lessons.length} lessons</span>
              <span>~{course.estimatedWeeks} week{course.estimatedWeeks !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        {isStarted && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex justify-between text-xs text-white/50 mb-2">
              <span>{progress?.completedLessons.length || 0} of {course.lessons.length} completed</span>
              <span className="text-violet-300">{completionPercent}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Start/Continue Button */}
        <div className="mt-4">
          {isComplete ? (
            <button
              onClick={() => onStartLesson(course.lessons[0].id)}
              className="w-full py-3 bg-emerald-500/20 text-emerald-300 rounded-xl font-medium hover:bg-emerald-500/30 transition-colors"
            >
              ✓ Course Complete — Review Lessons
            </button>
          ) : isStarted ? (
            <button
              onClick={handleContinue}
              className="w-full py-3 bg-violet-500/30 text-white rounded-xl font-medium hover:bg-violet-500/40 transition-colors"
            >
              Continue Learning
            </button>
          ) : (
            <button
              onClick={handleStartCourse}
              className="w-full py-3 bg-violet-500 text-white rounded-xl font-medium hover:bg-violet-600 transition-colors"
            >
              Start Course
            </button>
          )}
        </div>
      </div>

      {/* Lesson List */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-white/70 flex items-center gap-2">
          <span>📚</span>
          <span>Lessons</span>
        </h3>
        
        <div className="space-y-2">
          {course.lessons.map((lesson, index) => {
            const isCompleted = isLessonCompleted(courseId, lesson.id);
            const isCurrent = progress?.currentLesson === lesson.id;
            const isLocked = !isStarted && index > 0;
            
            return (
              <button
                key={lesson.id}
                onClick={() => !isLocked && onStartLesson(lesson.id)}
                disabled={isLocked}
                className={`w-full text-left rounded-xl p-4 transition-all duration-300 ${
                  isCurrent
                    ? 'bg-violet-500/20 border border-violet-500/50'
                    : isCompleted
                    ? 'bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40'
                    : isLocked
                    ? 'bg-white/5 border border-white/5 opacity-50 cursor-not-allowed'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Status indicator */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'bg-emerald-500/30 text-emerald-300'
                      : isCurrent
                      ? 'bg-violet-500/30 text-violet-300'
                      : 'bg-white/10 text-white/40'
                  }`}>
                    {isCompleted ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : isLocked ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    ) : (
                      <span className="text-sm">{index + 1}</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-medium ${
                      isCompleted ? 'text-white/70' : 'text-white'
                    }`}>
                      {lesson.title}
                    </h4>
                    <p className="text-xs text-white/40 truncate mt-0.5">
                      {lesson.practice.duration} practice • {lesson.verses.length} verses
                    </p>
                  </div>

                  {/* Arrow */}
                  {!isLocked && (
                    <div className="flex-shrink-0 text-white/30">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: 1 | 2 | 3 }) {
  const labels = ['Beginner', 'Intermediate', 'Advanced'];
  const colors = [
    'bg-emerald-500/20 text-emerald-300',
    'bg-amber-500/20 text-amber-300',
    'bg-rose-500/20 text-rose-300',
  ];
  
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs ${colors[difficulty - 1]}`}>
      {labels[difficulty - 1]}
    </span>
  );
}



