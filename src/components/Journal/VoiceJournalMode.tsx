/**
 * VoiceJournalMode - Full-screen voice recording experience
 * 
 * Provides an immersive voice journaling experience with:
 * - Full-screen recording mode
 * - Real-time transcription display
 * - AI-powered reflection after recording
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { useVoiceDictation } from '@hooks/useVoiceDictation';
import { generateAIReflection, type AIReflection } from '@lib/voiceReflection';

type VoiceJournalModeProps = {
  onClose: () => void;
  onSave: (entry: {
    content: string;
    reflection?: AIReflection;
    duration: number;
  }) => void;
};

export function VoiceJournalMode({ onClose, onSave }: VoiceJournalModeProps) {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [showReflection, setShowReflection] = useState(false);
  const [reflection, setReflection] = useState<AIReflection | null>(null);
  const [isGeneratingReflection, setIsGeneratingReflection] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const totalPausedTimeRef = useRef<number>(0);
  const pauseStartRef = useRef<number>(0);

  // Handle incoming transcript
  const handleTranscript = useCallback((text: string) => {
    setTranscript(prev => {
      if (prev) return prev + ' ' + text;
      return text;
    });
  }, []);

  const {
    isSupported,
    isListening,
    error,
    startListening,
    stopListening,
  } = useVoiceDictation(handleTranscript);

  // Timer logic
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTimeRef.current - totalPausedTimeRef.current;
        setDuration(Math.floor(elapsed / 1000));
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, isPaused]);

  const handleStart = () => {
    setIsRecording(true);
    setIsPaused(false);
    startTimeRef.current = Date.now();
    totalPausedTimeRef.current = 0;
    startListening();
  };

  const handlePause = () => {
    setIsPaused(true);
    pauseStartRef.current = Date.now();
    stopListening();
  };

  const handleResume = () => {
    totalPausedTimeRef.current += Date.now() - pauseStartRef.current;
    setIsPaused(false);
    startListening();
  };

  const handleStop = async () => {
    setIsRecording(false);
    setIsPaused(false);
    stopListening();

    // Generate AI reflection if we have content
    if (transcript.trim().length > 50) {
      setIsGeneratingReflection(true);
      try {
        const aiReflection = await generateAIReflection(transcript);
        setReflection(aiReflection);
        setShowReflection(true);
      } catch (err) {
        // Reflection generation failed silently
      } finally {
        setIsGeneratingReflection(false);
      }
    } else {
      setShowReflection(true);
    }
  };

  const handleSave = () => {
    onSave({
      content: transcript,
      reflection: reflection || undefined,
      duration,
    });
    onClose();
  };

  const handleDiscard = () => {
    if (transcript && !confirm('Discard this recording?')) return;
    onClose();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isSupported) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🎙️</div>
          <h2 className="text-xl text-white mb-2">Voice Not Supported</h2>
          <p className="text-white/60 mb-6">
            Your browser doesn't support voice recording.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-violet-500 hover:bg-violet-400 rounded-xl text-white"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Post-recording view with reflection
  if (showReflection) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950">
        {/* Header */}
        <div className="flex-shrink-0 px-4 py-3 bg-black/20 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-serif text-white">Voice Journal Entry</h2>
          <button
            onClick={handleDiscard}
            className="p-2 text-white/40 hover:text-white/80"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Recording info */}
          <div className="text-center text-white/50 text-sm">
            Recording duration: {formatDuration(duration)}
          </div>

          {/* Transcript */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm text-white/50 mb-2">Your Words</h3>
            <p className="text-white leading-relaxed whitespace-pre-wrap">
              {transcript || 'No transcript recorded'}
            </p>
          </div>

          {/* AI Reflection */}
          {isGeneratingReflection ? (
            <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-violet-400/30 border-t-violet-400 rounded-full animate-spin" />
                <span className="text-violet-300">Generating reflection...</span>
              </div>
            </div>
          ) : reflection && (
            <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <h3 className="text-violet-300 font-medium">AI Reflection</h3>
              </div>

              {/* Summary */}
              <div>
                <h4 className="text-xs text-white/40 uppercase tracking-wider mb-1">Summary</h4>
                <p className="text-white/90 text-sm">{reflection.summary}</p>
              </div>

              {/* Themes */}
              {reflection.themes.length > 0 && (
                <div>
                  <h4 className="text-xs text-white/40 uppercase tracking-wider mb-1">Key Themes</h4>
                  <div className="flex flex-wrap gap-2">
                    {reflection.themes.map((theme, i) => (
                      <span key={i} className="px-2 py-1 bg-white/10 rounded-lg text-xs text-white/70">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Emotional Tone */}
              <div>
                <h4 className="text-xs text-white/40 uppercase tracking-wider mb-1">Emotional Tone</h4>
                <p className="text-white/90 text-sm">{reflection.emotionalTone}</p>
              </div>

              {/* Reflection Question */}
              {reflection.reflectionQuestion && (
                <div className="pt-3 border-t border-white/10">
                  <h4 className="text-xs text-white/40 uppercase tracking-wider mb-1">To Consider</h4>
                  <p className="text-white/90 text-sm italic">"{reflection.reflectionQuestion}"</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 p-4 bg-black/20 border-t border-white/10 flex gap-3">
          <button
            onClick={handleDiscard}
            className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white/70"
          >
            Discard
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 bg-violet-500 hover:bg-violet-400 rounded-xl text-white font-medium"
          >
            Save Entry
          </button>
        </div>
      </div>
    );
  }

  // Recording view
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 bg-black/20 border-b border-white/10 flex items-center justify-between">
        <h2 className="text-lg font-serif text-white">Voice Journal</h2>
        <button
          onClick={handleDiscard}
          className="p-2 text-white/40 hover:text-white/80"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Timer */}
        <div className={`text-6xl font-mono text-white mb-8 ${isRecording && !isPaused ? 'animate-pulse' : ''}`}>
          {formatDuration(duration)}
        </div>

        {/* Visualization ring */}
        <div className="relative mb-8">
          <div className={`w-48 h-48 rounded-full flex items-center justify-center transition-all duration-300 ${
            isListening
              ? 'bg-red-500/20 border-4 border-red-400/50'
              : isPaused
              ? 'bg-yellow-500/20 border-4 border-yellow-400/50'
              : 'bg-white/5 border-4 border-white/10'
          }`}>
            {isListening && (
              <>
                <span className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
                <span className="absolute inset-0 rounded-full bg-red-500/10 animate-pulse" style={{ animationDuration: '2s' }} />
              </>
            )}
            <span className="text-6xl">
              {isListening ? '🔴' : isPaused ? '⏸️' : '🎙️'}
            </span>
          </div>
        </div>

        {/* Status text */}
        <p className="text-lg text-white/60 mb-4">
          {!isRecording && 'Tap to start recording'}
          {isRecording && isListening && 'Listening...'}
          {isRecording && isPaused && 'Paused'}
        </p>

        {/* Error display */}
        {error && (
          <div className="mb-4 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {/* Live transcript preview */}
        {transcript && (
          <div className="w-full max-w-md mb-6 px-4 py-3 bg-white/5 border border-white/10 rounded-xl max-h-32 overflow-y-auto">
            <p className="text-sm text-white/70 italic">
              {transcript.slice(-200)}
              {transcript.length > 200 && '...'}
            </p>
          </div>
        )}

        {/* Tips */}
        {!isRecording && (
          <div className="w-full max-w-md text-center">
            <p className="text-sm text-white/40 mb-2">💡 Tips for voice journaling:</p>
            <ul className="text-xs text-white/30 space-y-1">
              <li>Speak naturally, as if talking to a friend</li>
              <li>Don't worry about pauses or "umms"</li>
              <li>Let your thoughts flow freely</li>
            </ul>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex-shrink-0 p-6 bg-black/20 border-t border-white/10">
        <div className="flex items-center justify-center gap-6">
          {!isRecording ? (
            // Start button
            <button
              onClick={handleStart}
              className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-400 text-white flex items-center justify-center shadow-lg shadow-red-500/30 transition-all hover:scale-105"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="6" />
              </svg>
            </button>
          ) : (
            <>
              {/* Pause/Resume button */}
              <button
                onClick={isPaused ? handleResume : handlePause}
                className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
              >
                {isPaused ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                )}
              </button>

              {/* Stop button */}
              <button
                onClick={handleStop}
                className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}



