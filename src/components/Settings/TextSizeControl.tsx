import { useState, useEffect } from 'react';
import { getTextSize, setTextSize, type TextSize } from '../../lib/textSize';

type TextSizeControlProps = {
  onChange?: (size: TextSize) => void;
};

export function TextSizeControl({ onChange }: TextSizeControlProps) {
  const [size, setCurrentSize] = useState<TextSize>('medium');

  useEffect(() => {
    setCurrentSize(getTextSize());
  }, []);

  const handleChange = (newSize: TextSize) => {
    setCurrentSize(newSize);
    setTextSize(newSize);
    onChange?.(newSize);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-white/50 mr-2">Text Size</span>
      {(['small', 'medium', 'large'] as const).map((s) => (
        <button
          key={s}
          onClick={() => handleChange(s)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            size === s
              ? 'bg-violet-500/30 text-violet-200 border border-violet-400/30'
              : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70'
          }`}
        >
          {s === 'small' ? 'A' : s === 'medium' ? 'A' : 'A'}
          <span className="sr-only">{s}</span>
        </button>
      ))}
    </div>
  );
}

// Inline variant for header
export function TextSizeToggle({ onChange }: TextSizeControlProps) {
  const [size, setCurrentSize] = useState<TextSize>('medium');

  useEffect(() => {
    setCurrentSize(getTextSize());
  }, []);

  const cycleSize = () => {
    const sizes: TextSize[] = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(size);
    const nextSize = sizes[(currentIndex + 1) % sizes.length];
    setCurrentSize(nextSize);
    setTextSize(nextSize);
    onChange?.(nextSize);
  };

  return (
    <button
      onClick={cycleSize}
      className="p-2 text-white/50 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
      title={`Text size: ${size}`}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
      <span className="sr-only">Toggle text size (current: {size})</span>
    </button>
  );
}






