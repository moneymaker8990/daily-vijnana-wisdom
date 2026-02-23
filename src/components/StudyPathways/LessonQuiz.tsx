/**
 * LessonQuiz - Knowledge check for study pathway lessons
 *
 * Steps through questions one at a time with feedback and explanations.
 */

import { useState } from 'react';
import type { QuizQuestion } from '@data/quizzes/types';
import { saveQuizResult } from '@lib/quizProgress';

type LessonQuizProps = {
  courseId: string;
  lessonId: string;
  questions: QuizQuestion[];
  onComplete: () => void;
};

export function LessonQuiz({ courseId, lessonId, questions, onComplete }: LessonQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentIndex];

  const handleSelect = (optionIndex: number) => {
    if (showExplanation) return; // Already answered
    setSelectedOption(optionIndex);
    setShowExplanation(true);
    if (optionIndex === question.correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      // Quiz complete
      const finalScore = score + (selectedOption === question.correctIndex ? 0 : 0);
      // score already updated above
      saveQuizResult({
        courseId,
        lessonId,
        score: finalScore || score,
        total: questions.length,
        completedAt: new Date().toISOString(),
      });
      setFinished(true);
    }
  };

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    const message =
      percentage === 100
        ? 'Excellent understanding!'
        : percentage >= 50
        ? 'Good reflection.'
        : 'Every question is a learning opportunity.';

    return (
      <div className="bg-gradient-to-br from-violet-500/15 to-indigo-500/15 rounded-xl p-5 border border-violet-400/20 text-center space-y-3">
        <div className="text-3xl">{percentage === 100 ? '🌟' : percentage >= 50 ? '✨' : '🌱'}</div>
        <h4 className="text-lg font-serif text-white">Knowledge Check Complete</h4>
        <p className="text-2xl font-light text-white">
          {score}/{questions.length}
        </p>
        <p className="text-sm text-white/60">{message}</p>
        <button
          onClick={onComplete}
          className="mt-2 px-6 py-2 bg-violet-500/30 hover:bg-violet-500/40 text-white rounded-lg transition-colors text-sm"
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
        <span className="text-xs text-violet-300/70 uppercase tracking-wider">Knowledge Check</span>
        <span className="text-xs text-white/40">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {/* Question */}
      <div className="p-4 space-y-3">
        <p className="text-sm text-white font-medium leading-relaxed">{question.question}</p>

        {/* Options */}
        <div className="space-y-2">
          {question.options.map((option, i) => {
            let style = 'bg-white/5 border-white/10 hover:bg-white/10 text-white/80';

            if (showExplanation) {
              if (i === question.correctIndex) {
                style = 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200';
              } else if (i === selectedOption && i !== question.correctIndex) {
                style = 'bg-red-500/20 border-red-400/40 text-red-200';
              } else {
                style = 'bg-white/5 border-white/10 text-white/40';
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={showExplanation}
                className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${style}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="mt-3 p-3 bg-violet-500/10 rounded-lg border border-violet-400/15">
            <p className="text-xs text-white/70 leading-relaxed">{question.explanation}</p>
          </div>
        )}

        {/* Next button */}
        {showExplanation && (
          <button
            onClick={handleNext}
            className="w-full py-2.5 bg-violet-500/30 hover:bg-violet-500/40 text-white rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
          >
            {currentIndex < questions.length - 1 ? (
              <>
                Next Question
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            ) : (
              'See Results'
            )}
          </button>
        )}
      </div>
    </div>
  );
}
