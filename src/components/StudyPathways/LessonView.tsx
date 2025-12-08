/**
 * LessonView - Individual lesson with verses, reflections, and practice
 * 
 * The heart of the study experience.
 */

import { useState, useEffect } from 'react';
import { getCourseById, getNextLesson, getPreviousLesson, isLastLesson, getLessonIndex } from '../../core/study/registry';
import { completeLesson, setCurrentLesson, isLessonCompleted } from '../../core/study/progress';
import { ALL_VERSES } from '../../core/library/registry';
import type { Verse } from '../../core/library/types';
import { MeditationTimer } from '../Timer/MeditationTimer';
import { ExplainButton, ExplainPanel } from '../Explain';
import type { TextExplanation } from '../../lib/textExplain';

// Helper to parse duration string like "10-15 minutes" into a number
function parseDuration(durationStr: string): number {
  const match = durationStr.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 10;
}

type LessonViewProps = {
  courseId: string;
  lessonId: string;
  onBack: () => void;
  onNavigateLesson: (lessonId: string) => void;
};

export function LessonView({ courseId, lessonId, onBack, onNavigateLesson }: LessonViewProps) {
  const [expandedSection, setExpandedSection] = useState<'intro' | 'verses' | 'reflection' | 'practice' | null>('intro');
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  
  const course = getCourseById(courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);
  
  // Update current lesson on mount
  useEffect(() => {
    if (course && lesson) {
      setCurrentLesson(courseId, lessonId);
    }
  }, [courseId, lessonId, course, lesson]);

  if (!course || !lesson) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60">Lesson not found</p>
        <button onClick={onBack} className="mt-4 text-violet-400 hover:text-violet-300">
          Go back
        </button>
      </div>
    );
  }

  const lessonIndex = getLessonIndex(courseId, lessonId);
  const nextLesson = getNextLesson(courseId, lessonId);
  const prevLesson = getPreviousLesson(courseId, lessonId);
  const isLast = isLastLesson(courseId, lessonId);
  const isCompleted = isLessonCompleted(courseId, lessonId);

  // Get verse objects from IDs
  const verseObjects = lesson.verses
    .map(id => ALL_VERSES.find(v => v.id === id))
    .filter((v): v is Verse => v !== undefined);

  const handleCompleteLesson = () => {
    completeLesson(courseId, lessonId, nextLesson?.id);
    
    if (isLast) {
      setShowCompleteModal(true);
    } else if (nextLesson) {
      onNavigateLesson(nextLesson.id);
    }
  };

  const toggleSection = (section: typeof expandedSection) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">Course Overview</span>
        </button>

        <span className="text-xs text-white/40">
          Lesson {lessonIndex + 1} of {course.lessons.length}
        </span>
      </div>

      {/* Lesson Header */}
      <div className="text-center pb-4 border-b border-white/10">
        <div className="text-2xl mb-2">{course.icon}</div>
        <h2 className="text-xl font-serif text-white mb-1">{lesson.title}</h2>
        <p className="text-xs text-white/50">{course.title}</p>
        {isCompleted && (
          <span className="inline-block mt-2 text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full">
            ✓ Completed
          </span>
        )}
      </div>

      {/* Collapsible Sections */}
      <div className="space-y-3">
        {/* Introduction */}
        <CollapsibleSection
          title="Introduction"
          icon="📖"
          isOpen={expandedSection === 'intro'}
          onToggle={() => toggleSection('intro')}
        >
          <div className="prose prose-sm prose-invert max-w-none">
            {lesson.introduction.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-sm text-white/80 leading-relaxed mb-3">
                {paragraph}
              </p>
            ))}
          </div>
        </CollapsibleSection>

        {/* Sacred Verses */}
        <CollapsibleSection
          title={`Sacred Verses (${verseObjects.length})`}
          icon="🙏"
          isOpen={expandedSection === 'verses'}
          onToggle={() => toggleSection('verses')}
        >
          <div className="space-y-4">
            {verseObjects.map((verse, index) => (
              <VerseCard key={verse.id} verse={verse} index={index + 1} />
            ))}
            
            {lesson.traditionalContext && (
              <div className="mt-4 p-4 bg-violet-500/10 rounded-xl border border-violet-500/20">
                <p className="text-xs text-violet-300/70 uppercase tracking-wider mb-2">Traditional Context</p>
                <p className="text-sm text-white/70 italic">{lesson.traditionalContext}</p>
              </div>
            )}
          </div>
        </CollapsibleSection>

        {/* Reflection Questions */}
        <CollapsibleSection
          title="Reflection Questions"
          icon="💭"
          isOpen={expandedSection === 'reflection'}
          onToggle={() => toggleSection('reflection')}
        >
          <div className="space-y-3">
            {lesson.reflectionQuestions.map((question, i) => (
              <div key={i} className="flex gap-3 p-3 bg-white/5 rounded-lg">
                <span className="text-violet-400 text-sm font-medium">{i + 1}.</span>
                <p className="text-sm text-white/80 italic">{question}</p>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Practice */}
        <CollapsibleSection
          title={`Practice: ${lesson.practice.title}`}
          icon="🧘"
          isOpen={expandedSection === 'practice'}
          onToggle={() => toggleSection('practice')}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{lesson.practice.duration}</span>
            </div>

            <ol className="space-y-3">
              {lesson.practice.instructions.map((instruction, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/20 text-violet-300 text-xs flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-sm text-white/80">{instruction}</p>
                </li>
              ))}
            </ol>

            {/* Meditation Timer */}
            <MeditationTimer 
              suggestedMinutes={parseDuration(lesson.practice.duration)} 
              title={lesson.practice.title}
            />
          </div>
        </CollapsibleSection>
      </div>

      {/* Lesson Navigation */}
      <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
        {!isCompleted ? (
          <button
            onClick={handleCompleteLesson}
            className="w-full py-3 bg-violet-500 text-white rounded-xl font-medium hover:bg-violet-600 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Complete Lesson
          </button>
        ) : nextLesson ? (
          <button
            onClick={() => onNavigateLesson(nextLesson.id)}
            className="w-full py-3 bg-violet-500/30 text-white rounded-xl font-medium hover:bg-violet-500/40 transition-colors flex items-center justify-center gap-2"
          >
            Next Lesson
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <button
            onClick={onBack}
            className="w-full py-3 bg-emerald-500/30 text-emerald-200 rounded-xl font-medium hover:bg-emerald-500/40 transition-colors"
          >
            ✓ Course Complete — Return to Overview
          </button>
        )}

        {/* Prev/Next mini nav */}
        <div className="flex justify-between">
          {prevLesson ? (
            <button
              onClick={() => onNavigateLesson(prevLesson.id)}
              className="text-xs text-white/50 hover:text-white/80 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
          ) : <div />}
          
          {nextLesson && (
            <button
              onClick={() => onNavigateLesson(nextLesson.id)}
              className="text-xs text-white/50 hover:text-white/80 flex items-center gap-1"
            >
              Next
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Course Complete Modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-8 max-w-md w-full border border-violet-500/30 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-serif text-white mb-2">Course Complete!</h3>
            <p className="text-sm text-white/70 mb-6">
              You've completed all lessons in "{course.title}". 
              The wisdom of these teachings is now yours to carry forward.
            </p>
            <button
              onClick={onBack}
              className="w-full py-3 bg-violet-500 text-white rounded-xl font-medium hover:bg-violet-600 transition-colors"
            >
              Return to Course Overview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

type CollapsibleSectionProps = {
  title: string;
  icon: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

function CollapsibleSection({ title, icon, isOpen, onToggle, children }: CollapsibleSectionProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-4 transition-colors ${
          isOpen ? 'bg-white/10' : 'bg-white/5 hover:bg-white/10'
        }`}
      >
        <span className="flex items-center gap-2 text-sm font-medium text-white">
          <span>{icon}</span>
          <span>{title}</span>
        </span>
        <svg
          className={`w-5 h-5 text-white/50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="p-4 bg-white/5 border-t border-white/10">
          {children}
        </div>
      )}
    </div>
  );
}

type VerseCardProps = {
  verse: Verse;
  index: number;
};

function VerseCard({ verse, index }: VerseCardProps) {
  const [explanation, setExplanation] = useState<TextExplanation | null>(null);

  return (
    <div className="p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/10">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs text-violet-300/70 font-medium">
          {verse.sourceName}
          {verse.chapter && ` • ${typeof verse.chapter === 'number' ? `Ch. ${verse.chapter}` : verse.chapter}`}
          {verse.verseNumber && `:${verse.verseNumber}`}
        </span>
        <div className="flex items-center gap-2">
          <ExplainButton
            text={verse.text}
            source={verse.sourceName}
            onExplanation={setExplanation}
            isExpanded={explanation !== null}
          />
          <span className="text-xs text-white/30">#{index}</span>
        </div>
      </div>
      
      <p className="text-sm text-white/90 font-serif leading-relaxed italic">
        "{verse.text}"
      </p>
      
      {verse.commentary && (
        <p className="mt-3 text-xs text-white/50 pl-3 border-l-2 border-violet-500/30">
          {verse.commentary}
        </p>
      )}
      
      {verse.tags && verse.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {verse.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* AI Explanation Panel */}
      {explanation && (
        <ExplainPanel
          explanation={explanation}
          onClose={() => setExplanation(null)}
        />
      )}
    </div>
  );
}

