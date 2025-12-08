/**
 * StudyHub - Main landing page for study pathways
 * 
 * Shows all courses organized by pathway type with progress tracking.
 */

import { useState, useEffect } from 'react';
import { getAllCourses, getCoursesByPathway } from '../../core/study/registry';
import { PATHWAY_INFO } from '../../core/study/types';
import { getCourseProgress, getCourseCompletionPercent } from '../../core/study/progress';
import type { Course, PathwayType } from '../../core/study/types';
import { CourseCard } from './CourseCard';
import { CourseView } from './CourseView';
import { LessonView } from './LessonView';

type ViewState = 
  | { type: 'hub' }
  | { type: 'course'; courseId: string }
  | { type: 'lesson'; courseId: string; lessonId: string };

export function StudyHub() {
  const [viewState, setViewState] = useState<ViewState>({ type: 'hub' });
  const [activePathway, setActivePathway] = useState<PathwayType | 'all'>('all');
  const [, forceUpdate] = useState({});

  // Refresh progress when returning to hub
  useEffect(() => {
    if (viewState.type === 'hub') {
      forceUpdate({});
    }
  }, [viewState.type]);

  const handleSelectCourse = (courseId: string) => {
    setViewState({ type: 'course', courseId });
  };

  const handleStartLesson = (courseId: string, lessonId: string) => {
    setViewState({ type: 'lesson', courseId, lessonId });
  };

  const handleBackToCourse = (courseId: string) => {
    setViewState({ type: 'course', courseId });
  };

  const handleBackToHub = () => {
    setViewState({ type: 'hub' });
  };

  // Render lesson view
  if (viewState.type === 'lesson') {
    return (
      <LessonView
        courseId={viewState.courseId}
        lessonId={viewState.lessonId}
        onBack={() => handleBackToCourse(viewState.courseId)}
        onNavigateLesson={(lessonId) => setViewState({ type: 'lesson', courseId: viewState.courseId, lessonId })}
      />
    );
  }

  // Render course view
  if (viewState.type === 'course') {
    return (
      <CourseView
        courseId={viewState.courseId}
        onBack={handleBackToHub}
        onStartLesson={(lessonId) => handleStartLesson(viewState.courseId, lessonId)}
      />
    );
  }

  // Get courses based on filter
  const courses = activePathway === 'all' 
    ? getAllCourses() 
    : getCoursesByPathway(activePathway);

  // Get in-progress courses
  const inProgressCourses = getAllCourses().filter(course => {
    const progress = getCourseProgress(course.id);
    if (!progress) return false;
    const percent = getCourseCompletionPercent(course.id, course.lessons.length);
    return percent > 0 && percent < 100;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center pb-4 border-b border-white/10">
        <p className="text-sm text-white/60">
          Guided pathways through sacred wisdom
        </p>
      </div>

      {/* Continue Learning Section */}
      {inProgressCourses.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-wider text-violet-300/70 font-medium flex items-center gap-2">
            <span>📖</span>
            <span>Continue Learning</span>
          </h3>
          <div className="space-y-3">
            {inProgressCourses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onSelect={() => handleSelectCourse(course.id)}
                showProgress
                compact
              />
            ))}
          </div>
        </div>
      )}

      {/* Pathway Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <PathwayTab
          label="All Courses"
          isActive={activePathway === 'all'}
          onClick={() => setActivePathway('all')}
        />
        {PATHWAY_INFO.map(pathway => (
          <PathwayTab
            key={pathway.type}
            label={pathway.title}
            icon={pathway.icon}
            isActive={activePathway === pathway.type}
            onClick={() => setActivePathway(pathway.type)}
          />
        ))}
      </div>

      {/* Course Grid */}
      <div className="space-y-8">
        {activePathway === 'all' ? (
          // Show all pathways
          PATHWAY_INFO.map(pathway => {
            const pathwayCourses = getCoursesByPathway(pathway.type);
            if (pathwayCourses.length === 0) return null;
            
            return (
              <PathwaySection
                key={pathway.type}
                pathway={pathway}
                courses={pathwayCourses}
                onSelectCourse={handleSelectCourse}
              />
            );
          })
        ) : (
          // Show filtered courses
          <div className="grid gap-4">
            {courses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onSelect={() => handleSelectCourse(course.id)}
                showProgress
              />
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="text-center pt-4 border-t border-white/10">
        <p className="text-xs text-white/40">
          {getAllCourses().length} courses • 
          {' '}{getAllCourses().reduce((sum, c) => sum + c.lessons.length, 0)} lessons
        </p>
      </div>
    </div>
  );
}

type PathwayTabProps = {
  label: string;
  icon?: string;
  isActive: boolean;
  onClick: () => void;
};

function PathwayTab({ label, icon, isActive, onClick }: PathwayTabProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
        isActive
          ? 'bg-violet-500/30 text-violet-200 border border-violet-500/50'
          : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/80'
      }`}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </button>
  );
}

type PathwaySectionProps = {
  pathway: typeof PATHWAY_INFO[0];
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
};

function PathwaySection({ pathway, courses, onSelectCourse }: PathwaySectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-xl">{pathway.icon}</span>
        <div>
          <h3 className="text-sm font-medium text-white">{pathway.title}</h3>
          <p className="text-xs text-white/50">{pathway.description}</p>
        </div>
      </div>
      
      <div className="grid gap-3">
        {courses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onSelect={() => onSelectCourse(course.id)}
            showProgress
          />
        ))}
      </div>
    </div>
  );
}

