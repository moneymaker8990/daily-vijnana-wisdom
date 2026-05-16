import {
  AVAILABILITY_MODE_LABELS,
  getShippingVersionForLegacySource,
  getStudyGuide,
  getWorkBySlug,
  getWorkById,
  getVersionsForWork,
} from '@core/catalog/catalogEngine';
import { getRenderingLevelLabel } from '@core/catalog/renderingLevels';
import type { TextWork } from '@core/catalog/types';
import { getCatalogReaderMode } from './readerRouting';

type WorkDetailViewProps = {
  workSlug: string;
  verseCountInReader: number;
  onBack: () => void;
  onOpenReader?: () => void;
  onNavigateToWork?: (slug: string) => void;
};

export function WorkDetailView({
  workSlug,
  verseCountInReader,
  onBack,
  onOpenReader,
  onNavigateToWork,
}: WorkDetailViewProps) {
  const work = getWorkBySlug(workSlug);
  const guide = work ? getStudyGuide(work.id) : undefined;
  const version = work?.legacy_registry_source_id
    ? getShippingVersionForLegacySource(work.legacy_registry_source_id)
    : getVersionsForWork(work?.id ?? '')[0];

  const showReader = !!onOpenReader && (getCatalogReaderMode(work, version) !== 'none' || !!work?.renderingLevel);

  if (!work) {
    return (
      <div className="space-y-4">
        <button type="button" onClick={onBack} className="text-sm text-white/60 hover:text-white">
          ← Library
        </button>
        <p className="text-white/70">Work not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors shrink-0"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">Library</span>
        </button>
        {showReader && (
          <button
            type="button"
            onClick={onOpenReader}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-sm font-medium shadow-lg shadow-violet-500/20 hover:from-violet-400 hover:to-indigo-400 transition-all"
          >
            Open reader
          </button>
        )}
      </div>
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-violet-400/35 bg-violet-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-violet-200/95">
            {AVAILABILITY_MODE_LABELS[work.availability_mode]}
          </span>
          {work.licenseStatus && (
            <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-200/90">
              {getLicenseBadgeLabel(work.licenseStatus)}
            </span>
          )}
          {work.renderingLevel && (
            <span className="rounded-full border border-indigo-400/25 bg-indigo-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-indigo-200/90">
              {getRenderingLevelLabel(work.renderingLevel)}
            </span>
          )}
          {work.reviewStatus && (
            <span className="rounded-full border border-amber-400/25 bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-100/90">
              {getReviewBadgeLabel(work.reviewStatus)}
            </span>
          )}
          {work.status_badge !== 'active' && (
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/55">{work.status_badge}</span>
          )}
        </div>
        <h1 className="text-2xl md:text-3xl font-serif text-white">{work.title_primary}</h1>
        {work.title_alt.length > 0 && (
          <p className="text-sm text-white/45">Also known as: {work.title_alt.join(' · ')}</p>
        )}
        <p className="text-sm text-white/55">
          {work.author_attribution} · {work.approx_date} · Difficulty {work.difficulty}/5
        </p>
      </header>
      <p className="text-sm text-white/80 leading-relaxed">{work.summary_short}</p>
      {work.renderingLevel && (
        <section className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-200/85">Mindvanta rendering scope</h2>
          <p className="text-sm text-white/72 leading-relaxed">
            {getRenderingLevelLabel(work.renderingLevel)}. This is Mindvanta original study material, not an official
            scholarly translation.
          </p>
        </section>
      )}
      {work.historicalContext && (
        <section className="rounded-xl border border-white/10 bg-white/[0.04] p-4 space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-violet-300/80">Historical context</h2>
          <p className="text-sm text-white/75 leading-relaxed">{work.historicalContext}</p>
        </section>
      )}
      {work.coreTeachings && work.coreTeachings.length > 0 && (
        <section className="rounded-xl border border-white/10 bg-white/[0.04] p-4 space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-violet-300/80">Core teachings</h2>
          <div className="flex flex-wrap gap-2">
            {work.coreTeachings.map((teaching) => (
              <span key={teaching} className="rounded-full bg-white/[0.08] px-3 py-1 text-xs text-white/70">
                {teaching}
              </span>
            ))}
          </div>
        </section>
      )}
      <section className="rounded-xl border border-white/10 bg-white/[0.06] p-4 space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-violet-300/80">What is included here</h2>
        <ul className="list-disc list-inside text-sm text-white/70 space-y-1">
          {work.included_in_app.map((line) => (
            <li key={line}>{line}</li>
          ))}
          {work.legacy_registry_source_id && verseCountInReader > 0 && (
            <li>
              Reader: {verseCountInReader} passages tied to this work&apos;s verse engine bundle (see registry).
            </li>
          )}
        </ul>
      </section>
      <section className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-amber-200/85">What is not included yet</h2>
        <ul className="list-disc list-inside text-sm text-white/70 space-y-1">
          {work.not_included_yet.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>
      <section className="rounded-xl border border-white/10 bg-white/[0.04] p-4 space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-violet-300/80">Why it matters</h2>
        <p className="text-sm text-white/75 leading-relaxed">{work.why_it_matters}</p>
      </section>
      {guide && (
        <section className="space-y-4">
          <h2 className="text-lg font-serif text-white">Guided study (Mindvanta)</h2>
          <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-violet-200/80">Overview</h3>
            <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">{guide.overview}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 space-y-2">
            <h3 className="text-xs uppercase tracking-wider text-violet-200/80">Structure</h3>
            <p className="text-sm text-white/75 whitespace-pre-line leading-relaxed">{guide.structure_map}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 p-4">
              <h3 className="text-xs uppercase tracking-wider text-white/50 mb-2">Key concepts</h3>
              <ul className="text-sm text-white/75 list-disc list-inside space-y-1">
                {guide.key_concepts.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 p-4">
              <h3 className="text-xs uppercase tracking-wider text-white/50 mb-2">Common confusions</h3>
              <ul className="text-sm text-white/75 list-disc list-inside space-y-1">
                {guide.common_confusions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 p-4 space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-violet-200/80">Guided path</h3>
            <ol className="list-decimal list-inside space-y-3 text-sm text-white/80">
              {guide.guided_path.map((step, i) => (
                <li key={`${step.title}-${i}`} className="leading-relaxed">
                  <span className="font-medium text-white">{step.title}</span>
                  <p className="mt-1 text-white/70 ml-5"> {step.detail}</p>
                  {step.prompt && <p className="mt-1 text-violet-200/80 italic ml-5">↳ {step.prompt}</p>}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-xl border border-white/10 p-4">
            <h3 className="text-xs uppercase tracking-wider text-violet-200/80 mb-2">Reflection</h3>
            <ul className="list-disc list-inside text-sm text-white/75 space-y-1">
              {guide.reflection_prompts.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
      {work.courseLinks && work.courseLinks.length > 0 && (
        <section className="rounded-xl border border-white/10 p-4 space-y-3">
          <h2 className="text-sm font-semibold text-white/90">Related courses</h2>
          <div className="space-y-2">
            {work.courseLinks.map((link) => (
              <div key={`${link.courseSlug}-${link.moduleSlug}`} className="rounded-lg bg-white/[0.04] p-3">
                <p className="text-sm text-violet-200/90">{link.courseSlug} / {link.moduleSlug}</p>
                <p className="mt-1 text-xs text-white/55 leading-relaxed">{link.reason}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {work.reflectionPrompts && work.reflectionPrompts.length > 0 && (
        <section className="rounded-xl border border-white/10 p-4 space-y-3">
          <h2 className="text-sm font-semibold text-white/90">Related daily reflections</h2>
          <div className="space-y-2">
            {work.reflectionPrompts.slice(0, 5).map((prompt) => (
              <div key={prompt.id} className="rounded-lg bg-white/[0.04] p-3">
                <p className="text-xs uppercase tracking-wider text-violet-300/70">{prompt.theme}</p>
                <p className="mt-1 text-sm text-white/75 leading-relaxed">{prompt.prompt}</p>
                {prompt.journalQuestion && (
                  <p className="mt-2 text-xs text-white/50 italic">{prompt.journalQuestion}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      {work.suggestedPractices && work.suggestedPractices.length > 0 && (
        <section className="rounded-xl border border-white/10 p-4 space-y-2">
          <h2 className="text-sm font-semibold text-white/90">Suggested practices</h2>
          <ul className="list-disc list-inside text-sm text-white/70 space-y-1">
            {work.suggestedPractices.map((practice) => (
              <li key={practice}>{practice}</li>
            ))}
          </ul>
        </section>
      )}
      <Bibliography work={work} />
      <RelatedWorks work={work} onNavigateToWork={onNavigateToWork} />
      {version && (
        <section className="text-[11px] text-white/40 leading-relaxed border-t border-white/10 pt-4">
          <p>
            Shipping version: {version.id} · License: {version.license_type}
            {version.license_notes ? ` — ${version.license_notes}` : ''}
          </p>
        </section>
      )}
    </div>
  );
}

function getReviewBadgeLabel(status: NonNullable<TextWork['reviewStatus']>): string {
  switch (status) {
    case 'draft':
      return 'Draft';
    case 'needs_review':
      return 'Needs Review';
    case 'approved':
      return 'Approved';
    case 'rejected':
      return 'Rejected';
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}

function getLicenseBadgeLabel(status: NonNullable<TextWork['licenseStatus']>): string {
  switch (status) {
    case 'public_domain_us':
      return 'Public Domain';
    case 'open_license':
      return 'Open License';
    case 'source_text_only':
      return 'Guided Commentary';
    case 'needs_review':
      return 'Needs Review';
    case 'do_not_import':
      return 'Do Not Import';
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}

function Bibliography({ work }: { work: TextWork }) {
  if (work.bibliography.length === 0) return null;
  return (
    <section className="space-y-2">
      <h2 className="text-sm font-semibold text-white/90">Bibliography &amp; further reading</h2>
      <ul className="space-y-2 text-sm text-white/65">
        {work.bibliography.map((b, i) => (
          <li key={i} className="leading-relaxed">
            {b.citation}
            {b.url && (
              <>
                {' '}
                <a href={b.url} className="text-violet-300/90 underline hover:text-violet-200" target="_blank" rel="noreferrer">
                  Link
                </a>
              </>
            )}
            {b.note && <span className="block text-white/45 mt-0.5">{b.note}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

function RelatedWorks({
  work,
  onNavigateToWork,
}: {
  work: TextWork;
  onNavigateToWork?: (slug: string) => void;
}) {
  if (work.related_text_ids.length === 0) return null;
  return (
    <section className="space-y-2">
      <h2 className="text-sm font-semibold text-white/90">Related works</h2>
      <div className="flex flex-wrap gap-2">
        {work.related_text_ids.map((rid) => (
          <RelatedWorkButton key={rid} relatedId={rid} onNavigateToWork={onNavigateToWork} />
        ))}
      </div>
    </section>
  );
}

function RelatedWorkButton({
  relatedId,
  onNavigateToWork,
}: {
  relatedId: string;
  onNavigateToWork?: (slug: string) => void;
}) {
  const w = getWorkById(relatedId);
  const label = w?.title_primary ?? relatedId;
  if (onNavigateToWork && w) {
    return (
      <button
        type="button"
        onClick={() => onNavigateToWork(w.slug)}
        className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-violet-200/90 hover:bg-white/10 transition-colors"
      >
        {label}
      </button>
    );
  }
  return (
    <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/45">{label}</span>
  );
}
