import { getCatalogWorkBySlug } from '@core/catalog/catalogEngine';
import { getApprovedRenderingsForWork, getDraftRenderingsForWork } from '@core/catalog/renderingReview';
import { getReviewStatusLabel } from '@core/catalog/reviewStatusLabels';

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
          Review status: {getReviewStatusLabel(work.reviewStatus)} · Production-approved records: {approved.length}
        </p>
      </header>
      <div className="space-y-2">
        {drafts.map((rendering) => (
          <article key={rendering.id} className="rounded-xl border border-white/10 bg-black/20 p-3">
            <p className="text-xs uppercase tracking-wider text-violet-300/80">
              {rendering.sourceReference ?? rendering.id}
            </p>
            <p className="mt-1 break-words text-sm text-white/75">{rendering.mindvantaRendering}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full border border-amber-400/20 bg-amber-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-amber-100/80">
                {getReviewStatusLabel(rendering.reviewStatus)}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/50">
                productionEligible: {String(rendering.productionEligible)}
              </span>
              {rendering.needsSanskritReview && (
                <span className="rounded-full border border-sky-400/20 bg-sky-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-sky-100/80">
                  Sanskrit Review Needed
                </span>
              )}
            </div>
            {rendering.ambiguityNotes && (
              <p className="mt-2 break-words text-xs text-amber-100/75">{rendering.ambiguityNotes}</p>
            )}
            {rendering.reviewNotes && (
              <p className="mt-2 break-words text-xs text-white/45">
                {rendering.reviewerName ?? 'Unassigned'} · {rendering.reviewNotes}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
