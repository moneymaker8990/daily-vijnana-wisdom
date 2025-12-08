/**
 * Settings Component
 * 
 * User preferences for meditation sounds, notifications, and app behavior.
 */

import { useState, useEffect } from 'react';
import {
  BELL_SOUNDS,
  getSoundSettings,
  saveSoundSettings,
  previewBell,
  type BellSoundId,
  type SoundSettings,
} from '../../lib/soundSettings';

type SettingsProps = {
  onClose: () => void;
};

export function Settings({ onClose }: SettingsProps) {
  const [settings, setSettings] = useState<SoundSettings>(getSoundSettings);
  const [playingPreview, setPlayingPreview] = useState<BellSoundId | null>(null);

  // Update settings in localStorage when they change
  useEffect(() => {
    saveSoundSettings(settings);
  }, [settings]);

  const handleSelectSound = (soundId: BellSoundId) => {
    setSettings(prev => ({ ...prev, bellSoundId: soundId }));
    handlePreview(soundId);
  };

  const handlePreview = (soundId: BellSoundId) => {
    setPlayingPreview(soundId);
    previewBell(soundId);
    // Reset the playing state after a delay
    setTimeout(() => setPlayingPreview(null), 3000);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setSettings(prev => ({ ...prev, volume }));
  };

  const handleToggleStart = () => {
    setSettings(prev => ({ ...prev, playAtStart: !prev.playAtStart }));
  };

  const handleToggleEnd = () => {
    setSettings(prev => ({ ...prev, playAtEnd: !prev.playAtEnd }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 pb-4 bg-gradient-to-br from-slate-900 to-indigo-950 border-b border-white/10">
          <h2 className="text-xl font-serif text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white transition-colors rounded-lg hover:bg-white/10"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Meditation Bell Sounds */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔔</span>
              <h3 className="text-sm font-medium text-white/80 uppercase tracking-wider">
                Meditation Bell Sound
              </h3>
            </div>
            
            <div className="space-y-2">
              {BELL_SOUNDS.map((sound) => (
                <button
                  key={sound.id}
                  onClick={() => handleSelectSound(sound.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                    settings.bellSoundId === sound.id
                      ? 'bg-violet-500/20 border border-violet-500/40'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span className="text-2xl">{sound.icon}</span>
                  <div className="flex-1 text-left">
                    <p className={`text-sm font-medium ${
                      settings.bellSoundId === sound.id ? 'text-violet-200' : 'text-white/80'
                    }`}>
                      {sound.name}
                    </p>
                    <p className="text-xs text-white/50">
                      {sound.description}
                    </p>
                  </div>
                  {playingPreview === sound.id ? (
                    <span className="text-xs text-violet-300 animate-pulse">Playing...</span>
                  ) : settings.bellSoundId === sound.id ? (
                    <svg className="w-5 h-5 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreview(sound.id);
                      }}
                      className="p-2 text-white/40 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                      title="Preview sound"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Volume Control */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔊</span>
                <h3 className="text-sm font-medium text-white/80 uppercase tracking-wider">
                  Volume
                </h3>
              </div>
              <span className="text-sm text-white/50">
                {Math.round(settings.volume * 100)}%
              </span>
            </div>
            
            <div className="relative">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.volume}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-5
                  [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-violet-500
                  [&::-webkit-slider-thumb]:shadow-lg
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:transition-transform
                  [&::-webkit-slider-thumb]:hover:scale-110"
              />
              <div 
                className="absolute top-0 left-0 h-2 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full pointer-events-none"
                style={{ width: `${settings.volume * 100}%` }}
              />
            </div>
          </section>

          {/* Bell Timing Options */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">⏱️</span>
              <h3 className="text-sm font-medium text-white/80 uppercase tracking-wider">
                When to Play Bell
              </h3>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={handleToggleStart}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                  settings.playAtStart
                    ? 'bg-violet-500/20 border border-violet-500/40'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">▶️</span>
                  <div className="text-left">
                    <p className="text-sm text-white/80">At Start</p>
                    <p className="text-xs text-white/50">Play bell when meditation begins</p>
                  </div>
                </div>
                <div className={`w-10 h-6 rounded-full p-1 transition-colors ${
                  settings.playAtStart ? 'bg-violet-500' : 'bg-white/20'
                }`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.playAtStart ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </div>
              </button>

              <button
                onClick={handleToggleEnd}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                  settings.playAtEnd
                    ? 'bg-violet-500/20 border border-violet-500/40'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🏁</span>
                  <div className="text-left">
                    <p className="text-sm text-white/80">At Completion</p>
                    <p className="text-xs text-white/50">Play bell when meditation ends</p>
                  </div>
                </div>
                <div className={`w-10 h-6 rounded-full p-1 transition-colors ${
                  settings.playAtEnd ? 'bg-violet-500' : 'bg-white/20'
                }`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.playAtEnd ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </div>
              </button>
            </div>
          </section>

          {/* Test Bell Button */}
          <section className="pt-4 border-t border-white/10">
            <button
              onClick={() => handlePreview(settings.bellSoundId)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 hover:from-violet-500/30 hover:to-indigo-500/30 border border-white/10 rounded-xl text-white/80 hover:text-white transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              <span className="text-sm font-medium">Test Current Sound</span>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

