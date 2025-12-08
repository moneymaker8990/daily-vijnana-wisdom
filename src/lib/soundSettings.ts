/**
 * Sound Settings for Meditation Timer
 * 
 * Manages user preferences for meditation bell sounds.
 * Supports both audio files and synthesized fallbacks.
 */

export type BellSoundId = 
  | 'tibetan-bowl'
  | 'temple-bell'
  | 'zen-bell'
  | 'crystal-bowl'
  | 'deep-gong';

export type BellSound = {
  id: BellSoundId;
  name: string;
  description: string;
  icon: string;
  // URL for the audio file (if available)
  audioUrl?: string;
  // Synthesized sound parameters as fallback
  synthesized: {
    frequency: number;
    harmonics: number[];
    decay: number;
    type: OscillatorType;
  };
};

export const BELL_SOUNDS: BellSound[] = [
  {
    id: 'tibetan-bowl',
    name: 'Tibetan Singing Bowl',
    description: 'Warm, resonant tones from a traditional singing bowl',
    icon: '🔔',
    synthesized: {
      frequency: 256, // C4
      harmonics: [1, 2.76, 5.4, 8.93],
      decay: 4,
      type: 'sine',
    },
  },
  {
    id: 'temple-bell',
    name: 'Temple Bell',
    description: 'Deep, reverberant temple bell',
    icon: '🛕',
    synthesized: {
      frequency: 174, // F3
      harmonics: [1, 2, 3.5, 4.2],
      decay: 5,
      type: 'sine',
    },
  },
  {
    id: 'zen-bell',
    name: 'Zen Bell',
    description: 'Clear, pure tone of a meditation bell',
    icon: '🧘',
    synthesized: {
      frequency: 528, // C5 - Solfeggio frequency
      harmonics: [1, 2, 3],
      decay: 3,
      type: 'sine',
    },
  },
  {
    id: 'crystal-bowl',
    name: 'Crystal Singing Bowl',
    description: 'Ethereal, crystalline vibrations',
    icon: '💎',
    synthesized: {
      frequency: 432, // A4 - Natural tuning
      harmonics: [1, 2, 4, 6],
      decay: 6,
      type: 'sine',
    },
  },
  {
    id: 'deep-gong',
    name: 'Deep Gong',
    description: 'Rich, expansive gong resonance',
    icon: '🥁',
    synthesized: {
      frequency: 110, // A2
      harmonics: [1, 1.5, 2, 2.5, 3, 4],
      decay: 7,
      type: 'sine',
    },
  },
];

export type SoundSettings = {
  bellSoundId: BellSoundId;
  volume: number; // 0-1
  playAtStart: boolean;
  playAtEnd: boolean;
};

const STORAGE_KEY = 'stillpoint_sound_settings';

const DEFAULT_SETTINGS: SoundSettings = {
  bellSoundId: 'tibetan-bowl',
  volume: 0.5,
  playAtStart: true,
  playAtEnd: true,
};

/**
 * Load sound settings from localStorage
 */
export function getSoundSettings(): SoundSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Failed to load sound settings:', e);
  }
  return DEFAULT_SETTINGS;
}

/**
 * Save sound settings to localStorage
 */
export function saveSoundSettings(settings: Partial<SoundSettings>): void {
  try {
    const current = getSoundSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save sound settings:', e);
  }
}

/**
 * Get the bell sound object by ID
 */
export function getBellSound(id: BellSoundId): BellSound {
  return BELL_SOUNDS.find(s => s.id === id) || BELL_SOUNDS[0];
}

/**
 * Audio context singleton for synthesized sounds
 */
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

/**
 * Play a synthesized bell sound using Web Audio API
 */
export function playSynthesizedBell(sound: BellSound, volume: number = 0.5): void {
  try {
    const ctx = getAudioContext();
    
    // Resume if suspended (required for mobile)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    const { frequency, harmonics, decay, type } = sound.synthesized;
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(volume * 0.3, ctx.currentTime + 0.01);
    masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + decay);
    
    // Create harmonics for richer sound
    harmonics.forEach((harmonic, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(frequency * harmonic, ctx.currentTime);
      
      // Add slight detuning for warmth
      osc.detune.setValueAtTime((Math.random() - 0.5) * 10, ctx.currentTime);
      
      // Higher harmonics decay faster
      const harmonicVolume = 1 / (index + 1);
      gain.gain.setValueAtTime(harmonicVolume * volume * 0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + decay / (index + 1));
      
      osc.connect(gain);
      gain.connect(masterGain);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + decay);
    });
    
    // Add subtle shimmer/vibrato for realism
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(5, ctx.currentTime); // 5Hz vibrato
    lfoGain.gain.setValueAtTime(2, ctx.currentTime); // 2 cents deviation
    lfo.connect(lfoGain);
    lfo.start(ctx.currentTime);
    lfo.stop(ctx.currentTime + decay);
    
  } catch (e) {
    console.log('Audio synthesis not available:', e);
  }
}

/**
 * Play the selected bell sound
 */
export function playBell(soundId?: BellSoundId, volumeOverride?: number): void {
  const settings = getSoundSettings();
  const id = soundId || settings.bellSoundId;
  const volume = volumeOverride ?? settings.volume;
  const sound = getBellSound(id);
  
  // Try to play audio file first, fall back to synthesized
  if (sound.audioUrl) {
    const audio = new Audio(sound.audioUrl);
    audio.volume = volume;
    audio.play().catch(() => {
      // Fall back to synthesized if audio file fails
      playSynthesizedBell(sound, volume);
    });
  } else {
    playSynthesizedBell(sound, volume);
  }
}

/**
 * Preview a bell sound (for settings UI)
 */
export function previewBell(soundId: BellSoundId): void {
  const settings = getSoundSettings();
  playBell(soundId, settings.volume);
}

