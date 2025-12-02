import { useState, useEffect, useCallback, useRef } from 'react';

type MeditationTimerProps = {
  suggestedMinutes: number;
  title: string;
};

const PRESET_TIMES = [1, 3, 5, 10, 15, 20, 30];

export function MeditationTimer({ suggestedMinutes, title }: MeditationTimerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMinutes, setSelectedMinutes] = useState(suggestedMinutes);
  const [timeLeft, setTimeLeft] = useState(suggestedMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // Store the actual end time for accurate tracking across sleep/wake
  const endTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Play a gentle bell sound
  const playBell = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      
      // Resume context if suspended (required for mobile)
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(528, ctx.currentTime); // Solfeggio frequency
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 2);
    } catch (e) {
      console.log('Audio not available');
    }
  }, []);

  // Show notification (appears on lock screen)
  const showNotification = useCallback(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification('Meditation Complete 🧘', {
        body: `Your ${selectedMinutes} minute ${title} session is complete.`,
        icon: '/icon.svg',
        tag: 'meditation-timer',
        requireInteraction: true, // Keeps notification visible until user interacts
        vibrate: [200, 100, 200], // Vibration pattern
      });
      
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  }, [selectedMinutes, title]);

  // Complete the timer
  const completeTimer = useCallback(() => {
    setIsRunning(false);
    setIsComplete(true);
    setTimeLeft(0);
    endTimeRef.current = null;
    playBell();
    showNotification();
  }, [playBell, showNotification]);

  // Calculate remaining time from end time
  const updateTimeFromEndTime = useCallback(() => {
    if (!endTimeRef.current) return;
    
    const now = Date.now();
    const remaining = Math.max(0, Math.ceil((endTimeRef.current - now) / 1000));
    
    if (remaining <= 0) {
      completeTimer();
    } else {
      setTimeLeft(remaining);
    }
  }, [completeTimer]);

  // Timer tick - uses end time for accuracy
  useEffect(() => {
    if (isRunning && endTimeRef.current) {
      // Update immediately
      updateTimeFromEndTime();
      
      // Then update every second
      intervalRef.current = window.setInterval(() => {
        updateTimeFromEndTime();
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, updateTimeFromEndTime]);

  // Handle visibility change - recalculate time when user returns
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isRunning && endTimeRef.current) {
        updateTimeFromEndTime();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Also handle window focus
    const handleFocus = () => {
      if (isRunning && endTimeRef.current) {
        updateTimeFromEndTime();
      }
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isRunning, updateTimeFromEndTime]);

  // Keep checking even when in background using a longer interval
  useEffect(() => {
    if (!isRunning || !endTimeRef.current) return;
    
    // Check every 5 seconds as a backup (less battery drain)
    const backupInterval = setInterval(() => {
      if (endTimeRef.current && Date.now() >= endTimeRef.current) {
        completeTimer();
      }
    }, 5000);

    return () => clearInterval(backupInterval);
  }, [isRunning, completeTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalSeconds = selectedMinutes * 60;
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  const handleStart = () => {
    if (isComplete) {
      setTimeLeft(selectedMinutes * 60);
      setIsComplete(false);
    }
    
    // Set the end time
    const duration = (isComplete ? selectedMinutes * 60 : timeLeft) * 1000;
    endTimeRef.current = Date.now() + duration;
    
    setIsRunning(true);
    playBell(); // Starting bell
    
    // Resume audio context on user interaction (required for mobile)
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    // Save remaining time
    if (endTimeRef.current) {
      const remaining = Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000));
      setTimeLeft(remaining);
    }
    endTimeRef.current = null;
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsComplete(false);
    setTimeLeft(selectedMinutes * 60);
    endTimeRef.current = null;
  };

  const handleSelectTime = (mins: number) => {
    setSelectedMinutes(mins);
    setTimeLeft(mins * 60);
    setIsComplete(false);
    setIsRunning(false);
    endTimeRef.current = null;
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 hover:from-violet-500/30 hover:to-indigo-500/30 border border-white/10 rounded-xl text-white/80 hover:text-white transition-all duration-300 group"
      >
        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm font-medium">Start Timer ({suggestedMinutes} min)</span>
      </button>
    );
  }

  return (
    <div className="mt-4 bg-gradient-to-br from-slate-900/80 to-indigo-950/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 animate-fadeIn">
      {/* Close button */}
      <button
        onClick={() => {
          setIsOpen(false);
          handleReset();
        }}
        className="absolute top-3 right-3 text-white/40 hover:text-white/80 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Header */}
      <div className="text-center mb-6">
        <h4 className="text-xs uppercase tracking-[0.2em] text-violet-300/70 mb-1">Meditation Timer</h4>
        <p className="text-sm text-white/50">{title}</p>
        {isRunning && (
          <p className="text-[10px] text-emerald-400/70 mt-1">
            ✓ Timer will notify you when complete
          </p>
        )}
      </div>

      {/* Timer Display */}
      <div className="relative flex items-center justify-center mb-6">
        {/* Circular progress */}
        <svg className="w-48 h-48 transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="4"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="url(#timerGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 88}`}
            strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
            className="transition-all duration-1000 ease-linear"
          />
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Time display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-5xl font-light tracking-wider tabular-nums ${isComplete ? 'text-emerald-400' : 'text-white'}`}>
            {formatTime(timeLeft)}
          </span>
          {isComplete && (
            <span className="text-emerald-400/80 text-sm mt-2 animate-pulse">Complete ✓</span>
          )}
          {isRunning && (
            <span className="text-violet-300/60 text-xs mt-2 animate-pulse">Breathe...</span>
          )}
        </div>
      </div>

      {/* Time presets */}
      {!isRunning && (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {PRESET_TIMES.map((mins) => (
            <button
              key={mins}
              onClick={() => handleSelectTime(mins)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedMinutes === mins
                  ? 'bg-violet-500/30 text-violet-200 border border-violet-400/30'
                  : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70'
              }`}
            >
              {mins}m
            </button>
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center gap-3">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 rounded-xl text-white font-medium shadow-lg shadow-violet-500/25 transition-all hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            {isComplete ? 'Restart' : 'Begin'}
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-medium transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
            Pause
          </button>
        )}
        
        {(isRunning || timeLeft !== selectedMinutes * 60) && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/60 hover:text-white/80 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Notification permission hint */}
      {'Notification' in window && Notification.permission === 'default' && (
        <p className="text-center text-[10px] text-white/30 mt-4">
          Enable notifications to be alerted when the timer completes
        </p>
      )}
    </div>
  );
}
