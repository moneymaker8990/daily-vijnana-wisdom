import { getCatalogWorkBySlug } from '@core/catalog/catalogEngine';
import { getApprovedRenderingsForWork, getDraftRenderingsForWork } from '@core/catalog/renderingReview';

type RenderingReviewAdminProps = {
  workSlug: string;
};

export function RenderingReviewAdmin({ workSlug }: RenderingReviewAdminProps) {
  const work = getCatalogWorkBySlug(workSlug);
  const drafts = getDraftRenderingsForWork(workSlug);
  const approved = getApprovedRenderingsForWork(workSlug);

  if (!work) {
    return <p className="text-sm text-white/70">No catalog work found for review.</p>;
  }

  return (
    <section className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <header className="space-y-1">
        <h2 className="text-lg font-serif text-white">{work.title_primary}</h2>
        <p className="text-sm text-white/60">
          Review status: {work.reviewStatus ?? 'draft'} · Production-approved records: {approved.length}
        </p>
      </header>
      <div className="space-y-2">
        {drafts.map((rendering) => (
          <article key={rendering.id} className="rounded-xl border border-white/10 bg-black/20 p-3">
            <p className="text-xs uppercase tracking-wider text-violet-300/80">
              {rendering.sourceReference ?? rendering.id}
            </p>
            <p className="mt-1 text-sm text-white/75">{rendering.mindvantaRendering}</p>
            <p className="mt-2 text-xs text-white/45">
              {rendering.reviewStatus} · productionEligible: {String(rendering.productionEligible)}
            </p>
            {rendering.ambiguityNotes && <p className="mt-2 text-xs text-amber-100/75">{rendering.ambiguityNotes}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
