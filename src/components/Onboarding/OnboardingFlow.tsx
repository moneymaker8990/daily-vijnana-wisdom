import { useState } from 'react';

type OnboardingFlowProps = {
  onComplete: () => void;
};

const screens = [
  {
    title: 'Welcome to MindVanta',
    subtitle: 'Your daily companion for spiritual growth and inner wisdom',
    content: (
      <div className="flex flex-col items-center gap-6">
        <div className="text-7xl">🪷</div>
        <p className="text-white/70 text-center leading-relaxed max-w-sm">
          A 365-day journey through the world's contemplative traditions — ancient wisdom made practical for modern life.
        </p>
      </div>
    ),
  },
  {
    title: '365 Days of Wisdom',
    subtitle: 'Seven phases of transformation',
    content: (
      <div className="space-y-3 max-w-sm mx-auto">
        {[
          { icon: '🌅', phase: 'Days 1–52', name: 'Awakening' },
          { icon: '🧘', phase: 'Days 53–104', name: 'Inner Stillness' },
          { icon: '🔥', phase: 'Days 105–156', name: 'Transformation' },
          { icon: '💫', phase: 'Days 157–208', name: 'Expansion' },
          { icon: '🪞', phase: 'Days 209–260', name: 'Integration' },
          { icon: '🌊', phase: 'Days 261–312', name: 'Surrender' },
          { icon: '✨', phase: 'Days 313–365', name: 'Liberation' },
        ].map((p) => (
          <div key={p.phase} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2.5 border border-white/5">
            <span className="text-xl">{p.icon}</span>
            <div>
              <span className="text-white/90 text-sm font-medium">{p.name}</span>
              <span className="text-white/40 text-xs ml-2">{p.phase}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Your Practice Tools',
    subtitle: 'Everything you need for daily spiritual practice',
    content: (
      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        {[
          { icon: '📖', name: 'Daily Wisdom', desc: 'Verses & commentary' },
          { icon: '🧘', name: 'Meditation', desc: 'Timer & ambient sounds' },
          { icon: '📓', name: 'Journal', desc: 'Guided reflections' },
          { icon: '🌙', name: 'Dream Journal', desc: 'AI-powered insights' },
          { icon: '📚', name: 'Sacred Library', desc: 'Full spiritual texts' },
          { icon: '🎓', name: 'Study Paths', desc: '14 guided courses' },
        ].map((t) => (
          <div key={t.name} className="flex flex-col items-center gap-2 bg-white/5 rounded-xl p-4 border border-white/5">
            <span className="text-2xl">{t.icon}</span>
            <span className="text-white/90 text-sm font-medium">{t.name}</span>
            <span className="text-white/40 text-[11px] text-center">{t.desc}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Begin Your Journey',
    subtitle: 'One day at a time, one breath at a time',
    content: (
      <div className="flex flex-col items-center gap-6">
        <div className="text-5xl">🕉</div>
        <blockquote className="text-white/60 text-center italic leading-relaxed max-w-sm text-sm">
          "The journey of a thousand miles begins with a single step."
          <footer className="text-white/40 mt-2 not-italic text-xs">— Lao Tzu</footer>
        </blockquote>
      </div>
    ),
    cta: true,
  },
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentScreen, setCurrentScreen] = useState(0);

  const screen = screens[currentScreen];
  const isLast = currentScreen === screens.length - 1;

  const goNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrentScreen((s) => s + 1);
    }
  };

  const goBack = () => {
    if (currentScreen > 0) setCurrentScreen((s) => s - 1);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 flex flex-col items-center justify-center p-6">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl shadow-black/50 animate-fadeIn">
        {/* Skip button */}
        {!isLast && (
          <button
            onClick={onComplete}
            className="absolute top-4 right-4 text-white/30 hover:text-white/60 text-xs transition-colors"
          >
            Skip
          </button>
        )}

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-serif font-medium text-white mb-1">{screen.title}</h1>
          <p className="text-white/50 text-sm">{screen.subtitle}</p>
        </div>

        {/* Content */}
        <div className="mb-8">{screen.content}</div>

        {/* Navigation */}
        <div className="flex flex-col items-center gap-4">
          {/* CTA / Next button */}
          <button
            onClick={goNext}
            className={`w-full py-3 rounded-xl font-medium transition-all ${
              isLast
                ? 'bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 text-white shadow-lg shadow-violet-500/25 hover:scale-[1.02]'
                : 'bg-white/10 hover:bg-white/15 text-white/80 hover:text-white border border-white/10'
            }`}
          >
            {isLast ? 'Start Your Journey' : 'Continue'}
          </button>

          {/* Back link */}
          {currentScreen > 0 && (
            <button onClick={goBack} className="text-white/30 hover:text-white/60 text-xs transition-colors">
              Back
            </button>
          )}

          {/* Dot indicators */}
          <div className="flex gap-2">
            {screens.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentScreen ? 'bg-violet-400 w-6' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
