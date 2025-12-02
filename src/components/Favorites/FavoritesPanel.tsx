import { useState, useEffect } from 'react';
import { getFavorites, removeFavorite, type FavoriteItem } from '../../lib/favorites';
import { ShareButton } from '../Share/ShareButton';

type FavoritesPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  onGoToDay: (day: number) => void;
};

export function FavoritesPanel({ isOpen, onClose, onGoToDay }: FavoritesPanelProps) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      setFavorites(getFavorites());
    }
  }, [isOpen]);

  const handleRemove = (id: string) => {
    removeFavorite(id);
    setFavorites(getFavorites());
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-gradient-to-br from-slate-900/98 to-indigo-950/98 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 animate-slideInRight overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <h2 className="text-lg font-serif text-white">Saved Passages</h2>
            <p className="text-xs text-white/50">{favorites.length} favorites</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/50 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100%-80px)] px-6 py-4">
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-12 h-12 mx-auto text-white/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <p className="text-white/40 text-sm">No saved passages yet</p>
              <p className="text-white/30 text-xs mt-1">Tap the heart icon on any passage to save it</p>
            </div>
          ) : (
            <div className="space-y-4">
              {favorites.map((fav) => (
                <div
                  key={fav.id}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 group"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider text-violet-300/70">
                        {fav.source}
                      </span>
                      <button
                        onClick={() => {
                          onGoToDay(fav.dayNumber);
                          onClose();
                        }}
                        className="text-[10px] text-white/40 hover:text-white/70 transition-colors"
                      >
                        Day {fav.dayNumber} →
                      </button>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ShareButton
                        text={fav.text}
                        title={fav.title}
                        source={fav.source}
                      />
                      <button
                        onClick={() => handleRemove(fav.id)}
                        className="p-2 text-white/40 hover:text-rose-400 transition-colors"
                        title="Remove from favorites"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-white/80 italic leading-relaxed line-clamp-3">
                    "{fav.text}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

