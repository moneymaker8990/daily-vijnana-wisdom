import { useState, useEffect } from 'react';
import { isFavorite, toggleFavorite } from '../../lib/favorites';

type FavoriteButtonProps = {
  dayNumber: number;
  source: string;
  title: string;
  text: string;
  className?: string;
};

export function FavoriteButton({ dayNumber, source, title, text, className = '' }: FavoriteButtonProps) {
  const [isFav, setIsFav] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setIsFav(isFavorite(dayNumber, source, text));
  }, [dayNumber, source, text]);

  const handleToggle = () => {
    const newState = toggleFavorite({ dayNumber, source, title, text });
    setIsFav(newState);
    if (newState) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 transition-all rounded-lg hover:bg-white/5 ${className}`}
      title={isFav ? 'Remove from favorites' : 'Save to favorites'}
    >
      <svg
        className={`w-4 h-4 transition-all duration-300 ${
          isFav ? 'text-rose-400 fill-rose-400' : 'text-white/40 hover:text-white/70'
        } ${animate ? 'scale-125' : 'scale-100'}`}
        fill={isFav ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}




