/**
 * Voice Dictation Hook
 * 
 * Uses the Web Speech API (SpeechRecognition) for voice-to-text.
 * Works on most modern browsers and mobile devices.
 */

import { useState, useCallback, useRef, useEffect } from 'react';

// Type definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event & { error: string }) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export type VoiceDictationState = 'idle' | 'listening' | 'processing' | 'error';

export interface UseVoiceDictationResult {
  /** Current state of the voice dictation */
  state: VoiceDictationState;
  /** Whether voice dictation is supported in this browser */
  isSupported: boolean;
  /** Whether currently listening for voice input */
  isListening: boolean;
  /** Interim transcript (while speaking) */
  interimTranscript: string;
  /** Error message if any */
  error: string | null;
  /** Start listening for voice input */
  startListening: () => void;
  /** Stop listening and finalize transcript */
  stopListening: () => void;
  /** Toggle listening state */
  toggleListening: () => void;
}

export function useVoiceDictation(
  onTranscript: (transcript: string, isFinal: boolean) => void
): UseVoiceDictationResult {
  const [state, setState] = useState<VoiceDictationState>('idle');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isListeningRef = useRef(false);
  const onTranscriptRef = useRef(onTranscript);
  const finalTranscriptRef = useRef('');
  
  // Keep the callback ref updated
  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);
  
  // Check if Speech Recognition is supported
  const isSupported = typeof window !== 'undefined' && 
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  // Initialize recognition - only once
  useEffect(() => {
    if (!isSupported) return;

    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognitionClass();
    
    // Simpler settings - no continuous mode to avoid duplicate issues
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setState('listening');
      setError(null);
      isListeningRef.current = true;
      finalTranscriptRef.current = '';
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      let final = '';

      // Get the latest result
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        
        if (result.isFinal) {
          final += transcript;
        } else {
          interim = transcript; // Just show the current interim, don't accumulate
        }
      }

      setInterimTranscript(interim);
      
      // Store final transcript to send when recognition ends
      if (final) {
        finalTranscriptRef.current = final;
      }
    };

    recognition.onerror = (event: Event & { error: string }) => {
      console.error('Speech recognition error:', event.error);
      
      // Don't show error for no-speech - just means user stopped talking
      if (event.error === 'no-speech') {
        // Silently end
        setState('idle');
        isListeningRef.current = false;
        return;
      }
      
      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Please allow microphone access in your browser settings.');
      } else if (event.error === 'network') {
        setError('Network error. Please check your connection.');
      } else if (event.error === 'aborted') {
        // User cancelled, not an error
        setState('idle');
        isListeningRef.current = false;
        return;
      } else {
        setError(`Error: ${event.error}`);
      }
      
      setState('error');
      isListeningRef.current = false;
    };

    recognition.onend = () => {
      // Send the final transcript when recognition ends
      if (finalTranscriptRef.current.trim()) {
        onTranscriptRef.current(finalTranscriptRef.current.trim(), true);
        finalTranscriptRef.current = '';
      }
      
      // If user wants to keep listening, restart
      if (isListeningRef.current) {
        try {
          setTimeout(() => {
            if (isListeningRef.current && recognitionRef.current) {
              recognitionRef.current.start();
            }
          }, 100); // Small delay before restarting
        } catch {
          // Recognition might be already started
        }
      } else {
        setState('idle');
        setInterimTranscript('');
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [isSupported]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      setError('Voice dictation is not supported in this browser.');
      return;
    }

    setError(null);
    isListeningRef.current = true;
    
    try {
      recognitionRef.current.start();
    } catch (e) {
      // Recognition might already be started
      console.warn('Recognition already started:', e);
    }
  }, []);

  const stopListening = useCallback(() => {
    isListeningRef.current = false;
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    setState('idle');
    setInterimTranscript('');
  }, []);

  const toggleListening = useCallback(() => {
    if (isListeningRef.current) {
      stopListening();
    } else {
      startListening();
    }
  }, [startListening, stopListening]);

  return {
    state,
    isSupported,
    isListening: state === 'listening',
    interimTranscript,
    error,
    startListening,
    stopListening,
    toggleListening,
  };
}

