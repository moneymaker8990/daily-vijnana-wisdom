import { useRef, useCallback, useState } from 'react';

export type AmbientSoundId = 'silence' | 'rain' | 'ocean' | 'forest' | 'stream' | 'wind';

export type AmbientSoundOption = {
  id: AmbientSoundId;
  label: string;
  icon: string;
};

export const AMBIENT_SOUNDS: AmbientSoundOption[] = [
  { id: 'silence', label: 'Silence', icon: '🔇' },
  { id: 'rain', label: 'Rain', icon: '🌧' },
  { id: 'ocean', label: 'Ocean', icon: '🌊' },
  { id: 'forest', label: 'Forest', icon: '🌲' },
  { id: 'stream', label: 'Stream', icon: '💧' },
  { id: 'wind', label: 'Wind', icon: '🍃' },
];

interface WebkitWindow extends Window {
  webkitAudioContext?: typeof AudioContext;
}

type NoiseNodes = {
  source: AudioBufferSourceNode;
  filter: BiquadFilterNode;
  gain: GainNode;
  // Optional secondary nodes for richer sounds
  source2?: AudioBufferSourceNode;
  filter2?: BiquadFilterNode;
};

function getOrCreateContext(): AudioContext {
  const AudioContextClass = window.AudioContext || (window as WebkitWindow).webkitAudioContext;
  if (!AudioContextClass) throw new Error('AudioContext not supported');
  return new AudioContextClass();
}

function createNoiseBuffer(ctx: AudioContext, durationSec: number): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * durationSec;
  const buffer = ctx.createBuffer(2, length, sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }
  return buffer;
}

function createBrownNoiseBuffer(ctx: AudioContext, durationSec: number): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * durationSec;
  const buffer = ctx.createBuffer(2, length, sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    let last = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
  }
  return buffer;
}

function buildAmbientGraph(ctx: AudioContext, soundId: AmbientSoundId, masterGain: GainNode): NoiseNodes {
  const noiseBuffer = createNoiseBuffer(ctx, 4);
  const brownBuffer = createBrownNoiseBuffer(ctx, 4);

  const source = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  source.loop = true;

  let source2: AudioBufferSourceNode | undefined;
  let filter2: BiquadFilterNode | undefined;

  switch (soundId) {
    case 'rain':
      source.buffer = noiseBuffer;
      filter.type = 'bandpass';
      filter.frequency.value = 3000;
      filter.Q.value = 0.5;
      gain.gain.value = 0.4;
      // Add deeper rain layer
      source2 = ctx.createBufferSource();
      source2.buffer = brownBuffer;
      source2.loop = true;
      filter2 = ctx.createBiquadFilter();
      filter2.type = 'lowpass';
      filter2.frequency.value = 400;
      source2.connect(filter2);
      filter2.connect(masterGain);
      break;

    case 'ocean':
      source.buffer = brownBuffer;
      filter.type = 'lowpass';
      filter.frequency.value = 500;
      filter.Q.value = 1;
      gain.gain.value = 0.6;
      break;

    case 'forest':
      source.buffer = noiseBuffer;
      filter.type = 'bandpass';
      filter.frequency.value = 6000;
      filter.Q.value = 2;
      gain.gain.value = 0.15;
      // Low rustling layer
      source2 = ctx.createBufferSource();
      source2.buffer = brownBuffer;
      source2.loop = true;
      filter2 = ctx.createBiquadFilter();
      filter2.type = 'lowpass';
      filter2.frequency.value = 200;
      source2.connect(filter2);
      filter2.connect(masterGain);
      break;

    case 'stream':
      source.buffer = noiseBuffer;
      filter.type = 'bandpass';
      filter.frequency.value = 2000;
      filter.Q.value = 1.5;
      gain.gain.value = 0.25;
      // Deeper water layer
      source2 = ctx.createBufferSource();
      source2.buffer = brownBuffer;
      source2.loop = true;
      filter2 = ctx.createBiquadFilter();
      filter2.type = 'lowpass';
      filter2.frequency.value = 600;
      source2.connect(filter2);
      filter2.connect(masterGain);
      break;

    case 'wind':
      source.buffer = brownBuffer;
      filter.type = 'lowpass';
      filter.frequency.value = 800;
      filter.Q.value = 0.7;
      gain.gain.value = 0.5;
      break;

    default: // silence
      source.buffer = noiseBuffer;
      gain.gain.value = 0;
      break;
  }

  source.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);

  return { source, filter, gain, source2, filter2 };
}

export function useAmbientSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<NoiseNodes | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback((soundId: AmbientSoundId, volume: number = 0.5) => {
    if (soundId === 'silence') return;

    try {
      // Reuse or create context
      if (!ctxRef.current || ctxRef.current.state === 'closed') {
        ctxRef.current = getOrCreateContext();
      }
      const ctx = ctxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      // Tear down previous nodes
      if (nodesRef.current) {
        try {
          nodesRef.current.source.stop();
          nodesRef.current.source2?.stop();
        } catch { /* already stopped */ }
      }

      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      // Fade in
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 1.5);
      masterGainRef.current = masterGain;

      const nodes = buildAmbientGraph(ctx, soundId, masterGain);
      nodesRef.current = nodes;

      nodes.source.start();
      nodes.source2?.start();
      setIsPlaying(true);
    } catch {
      // Web Audio not available
    }
  }, []);

  const stop = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    const nodes = nodesRef.current;
    if (!ctx || !master || !nodes) {
      setIsPlaying(false);
      return;
    }

    // Fade out
    const now = ctx.currentTime;
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(0, now + 1);

    setTimeout(() => {
      try {
        nodes.source.stop();
        nodes.source2?.stop();
      } catch { /* already stopped */ }
      nodesRef.current = null;
      masterGainRef.current = null;
      setIsPlaying(false);
    }, 1100);
  }, []);

  const setVolume = useCallback((v: number) => {
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(v, ctx.currentTime + 0.1);
  }, []);

  return { play, stop, setVolume, isPlaying };
}
