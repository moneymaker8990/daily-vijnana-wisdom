import type { MindvantaRendering } from '@core/catalog/types';

export function RenderingDetailView({ rendering }: { rendering: MindvantaRendering }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 space-y-5">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wider text-violet-300/80">
          {rendering.sourceReference ?? `Verse ${rendering.verseNumber ?? rendering.id}`}
        </p>
        {rendering.originalScript && (
          <p className="text-2xl md:text-3xl font-serif text-white leading-relaxed">{rendering.originalScript}</p>
        )}
        {rendering.transliteration && (
          <p className="text-sm text-white/55 italic leading-relaxed">{rendering.transliteration}</p>
        )}
      </header>

      <RenderingSection title="Mindvanta rendering" body={rendering.mindvantaRendering} emphasis />
      <RenderingSection title="Literal notes" body={rendering.literalNotes} />
      <RenderingSection title="Philosophical commentary" body={rendering.philosophicalCommentary} />
      <RenderingSection title="Practice note" body={rendering.practiceNote} />
      <RenderingSection title="Reflection question" body={rendering.reflectionQuestion} />

      {rendering.keyTerms.length > 0 && (
        <section className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-violet-300/80">Key Sanskrit terms</h3>
          <div className="flex flex-wrap gap-2">
            {rendering.keyTerms.map((term) => (
              <span
                key={`${term.term}-${term.transliteration}`}
                className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/70"
              >
                <span className="font-medium text-white/90">{term.transliteration}</span>: {term.basicMeaning}
              </span>
            ))}
          </div>
        </section>
      )}

      {rendering.ambiguityNotes && (
        <section className="rounded-xl border border-amber-500/25 bg-amber-500/10 p-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-200/85">Review note</h3>
          <p className="mt-1 text-sm text-white/70 leading-relaxed">{rendering.ambiguityNotes}</p>
        </section>
      )}
    </article>
  );
}

function RenderingSection({ title, body, emphasis = false }: { title: string; body: string; emphasis?: boolean }) {
  return (
    <section className="space-y-1.5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-violet-300/80">{title}</h3>
      <p className={`text-sm leading-relaxed ${emphasis ? 'text-white/90 font-medium' : 'text-white/72'}`}>{body}</p>
    </section>
  );
}
