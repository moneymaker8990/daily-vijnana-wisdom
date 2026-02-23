import { useState, useEffect, useCallback } from 'react';
import { MeditationTimer } from './MeditationTimer';
import { useAmbientSound, AMBIENT_SOUNDS, type AmbientSoundId } from './AmbientSounds';

type MeditationScreenProps = {
  onClose: () => void;
};

export function MeditationScreen({ onClose }: MeditationScreenProps) {
  const [selectedSound, setSelectedSound] = useState<AmbientSoundId>('silence');
  const [volume, setVolume] = useState(0.5);
  const ambient = useAmbientSound();

  const handleClose = useCallback(() => {
    ambient.stop();
    onClose();
  }, [ambient, onClose]);

  // Escape key closes
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleClose]);

  const handleSoundSelect = (id: AmbientSoundId) => {
    setSelectedSound(id);
    if (id === 'silence') {
      ambient.stop();
    } else {
      ambient.play(id, volume);
    }
  };

  const handleVolumeChange = (v: number) => {
    setVolume(v);
    ambient.setVolume(v);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-slate-950 via-indigo-950/90 to-slate-950 flex flex-col items-center justify-center animate-fadeIn">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-10 p-2 text-white/40 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
        aria-label="Close meditation"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Content */}
      <div className="relative w-full max-w-md px-6">
        <MeditationTimer suggestedMinutes={10} title="Meditation" alwaysOpen />

        {/* Ambient sound selector */}
        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.2em] text-violet-300/50 text-center mb-3">Ambient Sound</p>
          <div className="flex flex-wrap justify-center gap-2">
            {AMBIENT_SOUNDS.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSoundSelect(s.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  selectedSound === s.id
                    ? 'bg-violet-500/30 text-violet-200 border border-violet-400/30'
                    : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70'
                }`}
              >
                <span>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Volume slider */}
        {selectedSound !== 'silence' && (
          <div className="mt-4 flex items-center gap-3 px-4">
            <svg className="w-4 h-4 text-white/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-3.536-8.464a5 5 0 000 7.072" />
            </svg>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-400"
              aria-label="Ambient volume"
            />
            <span className="text-xs text-white/40 w-8 text-right">{Math.round(volume * 100)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
