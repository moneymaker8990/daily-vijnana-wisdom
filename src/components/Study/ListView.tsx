import type { LibraryText } from '@data/library/types';

export type ListViewProps = {
  text: LibraryText;
  currentIndex: number;
  onSelect: (index: number) => void;
};

export function ListView({ text, currentIndex, onSelect }: ListViewProps) {
  return (
    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
      {text.verses.map((verse, index) => (
        <button
          key={verse.id}
          onClick={() => onSelect(index)}
          className={`w-full text-left p-4 rounded-xl transition-all ${
            index === currentIndex
              ? 'bg-gradient-to-r from-violet-500/20 to-indigo-500/20 border border-violet-500/30'
              : 'bg-white/5 border border-white/10 hover:bg-white/10'
          }`}
        >
          <div className="flex items-start gap-3">
            <span
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                index === currentIndex ? 'bg-violet-500/30 text-violet-200' : 'bg-white/10 text-white/50'
              }`}
            >
              {verse.number}
            </span>
            <p className="text-sm text-white/80 line-clamp-2">{verse.text}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
