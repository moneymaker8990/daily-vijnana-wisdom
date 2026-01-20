/**
 * VoiceDictationButton - Microphone button for voice-to-text input
 * 
 * Shows a microphone icon that pulses while listening.
 * Displays interim transcript and error messages.
 */

import { useCallback } from 'react';
import { useVoiceDictation } from '@hooks/useVoiceDictation';

type VoiceDictationButtonProps = {
  /** Callback when transcript is received */
  onTranscript: (text: string) => void;
  /** Optional class name for the button */
  className?: string;
  /** Label shown below the button */
  label?: string;
};

export function VoiceDictationButton({ 
  onTranscript, 
  className = '',
  label = 'Voice'
}: VoiceDictationButtonProps) {
  // Handle transcript - append to existing text
  const handleTranscript = useCallback((transcript: string, isFinal: boolean) => {
    if (isFinal && transcript.trim()) {
      // Add space before if this is appending to existing text
      onTranscript(transcript);
    }
  }, [onTranscript]);

  const {
    isSupported,
    isListening,
    interimTranscript,
    error,
    toggleListening,
  } = useVoiceDictation(handleTranscript);

  if (!isSupported) {
    return (
      <button
        type="button"
        disabled
        className={`flex flex-col items-center gap-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl opacity-50 cursor-not-allowed ${className}`}
        title="Voice dictation not supported in this browser"
      >
        <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
        <span className="text-xs text-white/30">Not supported</span>
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={toggleListening}
        className={`relative flex flex-col items-center gap-1 px-4 py-3 rounded-xl transition-all ${
          isListening
            ? 'bg-red-500/20 border-2 border-red-400/50 text-red-300'
            : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
        } ${className}`}
        title={isListening ? 'Stop recording' : 'Start voice dictation'}
      >
        {/* Pulsing animation when listening */}
        {isListening && (
          <span className="absolute inset-0 rounded-xl bg-red-500/20 animate-ping" />
        )}
        
        <span className="relative">
          {isListening ? (
            // Stop icon
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          ) : (
            // Microphone icon
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          )}
        </span>
        <span className="relative text-xs font-medium">
          {isListening ? 'Recording...' : label}
        </span>
      </button>

      {/* Interim transcript preview */}
      {isListening && interimTranscript && (
        <div className="mt-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg max-w-xs">
          <p className="text-xs text-white/50 italic">{interimTranscript}</p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mt-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg max-w-xs">
          <p className="text-xs text-red-300">{error}</p>
        </div>
      )}
    </div>
  );
}

/**
 * Compact version of the voice dictation button for inline use
 */
export function VoiceDictationButtonCompact({ 
  onTranscript,
  className = ''
}: Omit<VoiceDictationButtonProps, 'label'>) {
  const handleTranscript = useCallback((transcript: string, isFinal: boolean) => {
    if (isFinal && transcript.trim()) {
      onTranscript(transcript);
    }
  }, [onTranscript]);

  const {
    isSupported,
    isListening,
    error,
    toggleListening,
  } = useVoiceDictation(handleTranscript);

  if (!isSupported) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`relative p-2 rounded-lg transition-all ${
        isListening
          ? 'bg-red-500/20 text-red-300'
          : 'text-white/40 hover:text-white/80 hover:bg-white/10'
      } ${error ? 'text-red-400' : ''} ${className}`}
      title={isListening ? 'Stop recording' : 'Start voice dictation'}
    >
      {/* Pulsing ring when listening */}
      {isListening && (
        <span className="absolute inset-0 rounded-lg bg-red-500/30 animate-ping" />
      )}
      
      {isListening ? (
        <svg className="relative w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <rect x="6" y="6" width="12" height="12" rx="2" />
        </svg>
      ) : (
        <svg className="relative w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      )}
    </button>
  );
}



