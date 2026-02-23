/**
 * DreamPatterns - Analytics panel for dream journal
 *
 * Shows recurring symbols, tag cloud, mood distribution, and summary stats.
 */

import { useMemo } from 'react';
import { analyzeDreamPatterns } from '@lib/dreamPatterns';
import type { DreamEntry } from '@lib/dreamStorage';

type DreamPatternsProps = {
  dreams: DreamEntry[];
};

const MOOD_INFO: Record<string, { label: string; emoji: string; color: string }> = {
  peaceful: { label: 'Peaceful', emoji: '😌', color: 'bg-teal-500/30' },
  anxious: { label: 'Anxious', emoji: '😰', color: 'bg-orange-500/30' },
  confused: { label: 'Confused', emoji: '🤔', color: 'bg-blue-500/30' },
  joyful: { label: 'Joyful', emoji: '😊', color: 'bg-yellow-500/30' },
  mysterious: { label: 'Mysterious', emoji: '🌙', color: 'bg-purple-500/30' },
  neutral: { label: 'Neutral', emoji: '😐', color: 'bg-slate-500/30' },
};

export function DreamPatterns({ dreams }: DreamPatternsProps) {
  const analysis = useMemo(() => analyzeDreamPatterns(dreams), [dreams]);

  return (
    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl p-4 sm:p-5 border border-white/10 space-y-5">
      <h3 className="text-sm font-medium text-white flex items-center gap-2">
        <span>🔮</span>
        <span>Dream Patterns</span>
      </h3>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-2xl font-light text-white">{analysis.totalDreams}</p>
          <p className="text-xs text-white/40">Total dreams</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-2xl font-light text-white">{analysis.dreamsThisMonth}</p>
          <p className="text-xs text-white/40">This month</p>
        </div>
      </div>

      {/* Recurring Symbols */}
      {analysis.recurringSymbols.length > 0 && (
        <div>
          <h4 className="text-xs uppercase tracking-wider text-white/50 mb-2">
            Recurring Symbols
          </h4>
          <div className="space-y-2">
            {analysis.recurringSymbols.slice(0, 5).map(sym => (
              <div
                key={sym.word}
                className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2"
              >
                <span className="text-sm text-white capitalize">{sym.word}</span>
                <span className="ml-auto flex-shrink-0 bg-violet-500/20 text-violet-300 text-xs px-2 py-0.5 rounded-full">
                  {sym.count}x
                </span>
              </div>
            ))}
            {analysis.recurringSymbols.length > 0 && (
              <p className="text-xs text-white/30 italic mt-1">
                {analysis.recurringSymbols[0].meaning}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Tag Cloud */}
      {analysis.topTags.length > 0 && (
        <div>
          <h4 className="text-xs uppercase tracking-wider text-white/50 mb-2">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {analysis.topTags.map(({ tag, count }) => {
              // Scale font size by frequency
              const maxCount = analysis.topTags[0].count;
              const scale = 0.75 + (count / maxCount) * 0.5;
              return (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-violet-500/15 text-violet-300/80 rounded-full"
                  style={{ fontSize: `${scale}rem` }}
                >
                  {tag}
                  <span className="text-violet-300/40" style={{ fontSize: '0.65rem' }}>
                    {count}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Mood Distribution */}
      {analysis.moodDistribution.length > 0 && (
        <div>
          <h4 className="text-xs uppercase tracking-wider text-white/50 mb-2">
            Dream Moods
          </h4>
          <div className="space-y-2">
            {analysis.moodDistribution.map(({ mood, count, percentage }) => {
              const info = MOOD_INFO[mood] ?? { label: mood, emoji: '🌙', color: 'bg-white/20' };
              return (
                <div key={mood} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5">
                      <span>{info.emoji}</span>
                      <span className="text-white/70">{info.label}</span>
                    </span>
                    <span className="text-white/40">
                      {count} ({percentage}%)
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${info.color} transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
