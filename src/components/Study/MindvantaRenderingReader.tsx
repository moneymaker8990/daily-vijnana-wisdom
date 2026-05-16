import { useState } from 'react';
import type { MindvantaRendering, TextWork } from '@core/catalog/types';
import { getRenderingLevelLabel } from '@core/catalog/renderingLevels';
import { RenderingDetailView } from './RenderingDetailView';

type MindvantaRenderingReaderProps = {
  work: TextWork;
  renderings: MindvantaRendering[];
  onBack: () => void;
};

export function MindvantaRenderingReader({ work, renderings, onBack }: MindvantaRenderingReaderProps) {
  const [index, setIndex] = useState(0);
  const rendering = renderings[index];

  if (!rendering) {
    return (
      <div className="space-y-4">
        <button type="button" onClick={onBack} className="text-sm text-white/60 hover:text-white">
          Library
        </button>
        <p className="text-white/70">No rendering records are available for this work.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <button type="button" onClick={onBack} className="text-sm text-white/60 hover:text-white">
          Library
        </button>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/65">
          {index + 1} / {renderings.length}
        </span>
      </div>

      <header className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {work.renderingLevel && (
            <span className="rounded-full border border-violet-400/35 bg-violet-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-violet-200/95">
              {getRenderingLevelLabel(work.renderingLevel)}
            </span>
          )}
          <span className="rounded-full border border-amber-400/25 bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-100/90">
            {work.reviewStatus ?? 'draft'}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif text-white">{work.title_primary}</h1>
        <p className="text-sm text-white/65 leading-relaxed">
          Original Mindvanta Rendering and Commentary based on the Sanskrit source text.
        </p>
      </header>

      <RenderingDetailView rendering={rendering} />

      <nav className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setIndex((value) => Math.max(0, value - 1))}
          disabled={index === 0}
          className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/75 disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => setIndex((value) => Math.min(renderings.length - 1, value + 1))}
          disabled={index === renderings.length - 1}
          className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/75 disabled:opacity-40"
        >
          Next
        </button>
      </nav>
    </div>
  );
}
