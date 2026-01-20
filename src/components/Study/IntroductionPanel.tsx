import { useState } from 'react';
import type { HistoricalIntro } from '@core/library/types';

export type IntroductionPanelProps = {
  intro: HistoricalIntro;
  source: { name: string; period?: string; originalLanguage?: string; icon?: string };
  onClose: () => void;
};

export function IntroductionPanel({ intro, source, onClose }: IntroductionPanelProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('origin');

  const sections = [
    { id: 'origin', title: 'Origins', icon: '🌍', content: intro.origin },
    { id: 'author', title: 'Author & Transmission', icon: '✍️', content: intro.author },
    { id: 'significance', title: 'Significance', icon: '💎', content: intro.significance },
    { id: 'howToRead', title: 'How to Read', icon: '📖', content: intro.howToRead },
  ];

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-2xl p-6 border border-violet-500/30">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-3xl mb-2 block">{source.icon || '📜'}</span>
            <h3 className="text-lg font-serif text-white mb-1">About This Text</h3>
            <div className="flex items-center gap-3 text-xs text-white/50">
              {source.period && <span>{source.period}</span>}
              {source.originalLanguage && (
                <>
                  <span className="text-white/20">•</span>
                  <span>{source.originalLanguage}</span>
                </>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white/80 transition-colors rounded-lg hover:bg-white/10"
            aria-label="Close introduction panel"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expandable Sections */}
      <div className="space-y-2">
        {sections.map((section) => (
          <div key={section.id} className="rounded-xl overflow-hidden border border-white/10">
            <button
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
              className={`w-full flex items-center justify-between p-4 transition-colors ${
                expandedSection === section.id ? 'bg-white/10' : 'bg-white/5 hover:bg-white/10'
              }`}
              aria-expanded={expandedSection === section.id}
              aria-controls={`section-content-${section.id}`}
            >
              <span className="flex items-center gap-2 text-sm font-medium text-white">
                <span aria-hidden="true">{section.icon}</span>
                <span>{section.title}</span>
              </span>
              <svg
                className={`w-5 h-5 text-white/50 transition-transform ${
                  expandedSection === section.id ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedSection === section.id && (
              <div id={`section-content-${section.id}`} className="p-4 bg-white/5 border-t border-white/10">
                <p className="text-sm text-white/80 leading-relaxed">{section.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Begin Reading Button */}
      <button
        onClick={onClose}
        className="w-full py-3 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 rounded-xl text-white font-medium shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.02]"
      >
        Begin Reading
      </button>
    </div>
  );
}
