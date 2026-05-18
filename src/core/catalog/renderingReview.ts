import type { MindvantaRendering, TextWork } from './types';
import { getCatalogWorkBySlug } from './catalogEngine';
import { KRAMASTOTRA_RENDERINGS } from './kashmir/kramastotra';
import { KUBJIKAMATATANTRA_RENDERINGS } from './kashmir/kubjikamatatantra';

export type RenderingReviewMetadata = {
  reviewNotes?: string;
  reviewerName?: string;
  reviewedAt?: string;
  needsSanskritReview?: boolean;
};

const ALL_RENDERINGS: MindvantaRendering[] = [...KRAMASTOTRA_RENDERINGS, ...KUBJIKAMATATANTRA_RENDERINGS];

export function canShowRenderingInProduction(
  rendering: MindvantaRendering,
  work: TextWork | undefined = getCatalogWorkBySlug(rendering.sourceTextSlug)
): boolean {
  return (
    rendering.reviewStatus === 'approved' &&
    rendering.productionEligible &&
    !!work &&
    work.licenseStatus !== 'do_not_import' &&
    work.reviewStatus === 'approved' &&
    Boolean(work.sourceName || work.bibliography.length > 0)
  );
}

export function getApprovedRenderingsForWork(slug: string): MindvantaRendering[] {
  return ALL_RENDERINGS.filter((rendering) => rendering.sourceTextSlug === slug && canShowRenderingInProduction(rendering));
}

export function getDraftRenderingsForWork(slug: string): MindvantaRendering[] {
  return ALL_RENDERINGS.filter(
    (rendering) =>
      rendering.sourceTextSlug === slug &&
      (rendering.reviewStatus === 'draft' || rendering.reviewStatus === 'needs_review')
  );
}
