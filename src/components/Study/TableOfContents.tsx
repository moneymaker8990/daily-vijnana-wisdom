import type { LibraryText } from '@data/library/types';

export type TableOfContentsProps = {
  text: LibraryText;
  currentIndex: number;
  onSelect: (index: number) => void;
  onClose: () => void;
};

export function TableOfContents({ text, currentIndex, onSelect, onClose }: TableOfContentsProps) {
  const sections = text.sections || text.chapters;

  if (!sections) {
    return (
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <p className="text-sm text-white/60 text-center">This text does not have chapters or sections.</p>
        <button
          onClick={onClose}
          className="w-full mt-3 py-2 text-sm text-white/60 hover:text-white transition-colors"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2 max-h-[60vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 id="toc-title" className="text-sm font-medium text-white/70">Contents</h3>
        <button onClick={onClose} className="p-1 text-white/40 hover:text-white/80 transition-colors" aria-label="Close table of contents">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {sections.map((section, sectionIndex) => {
        const sectionId = 'id' in section ? section.id : undefined;
        const sectionNumber = 'number' in section ? section.number : undefined;

        let startIndex = 0;
        if (sectionId) {
          startIndex = text.verses.findIndex((v) => v.section === sectionId);
        } else if (sectionNumber) {
          startIndex = text.verses.findIndex((v) => v.chapter === sectionNumber);
        }

        const nextSection = sections[sectionIndex + 1];
        const nextSectionNumber = nextSection && 'number' in nextSection ? nextSection.number : undefined;
        const nextSectionId = nextSection && 'id' in nextSection ? nextSection.id : undefined;

        const isActive =
          currentIndex >= startIndex &&
          (sectionIndex === sections.length - 1 ||
            (nextSectionNumber !== undefined
              ? currentIndex < text.verses.findIndex((v) => v.chapter === nextSectionNumber)
              : nextSectionId !== undefined
                ? currentIndex < text.verses.findIndex((v) => v.section === nextSectionId)
                : true));

        return (
          <button
            key={sectionId || sectionNumber}
            onClick={() => onSelect(startIndex >= 0 ? startIndex : 0)}
            className={`w-full text-left p-3 rounded-lg transition-all ${
              isActive
                ? 'bg-violet-500/20 border border-violet-500/30'
                : 'bg-white/5 border border-transparent hover:bg-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/80">
                {'title' in section ? section.title : `Chapter ${sectionNumber}`}
              </span>
              <span className="text-xs text-white/40">{section.verseCount} verses</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
