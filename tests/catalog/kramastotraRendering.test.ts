import { describe, expect, it } from 'vitest';
import type { MindvantaRendering, SanskritKeyTerm } from '@core/catalog/types';
import { getCatalogWorkBySlug, getVersionsForWork } from '@core/catalog/catalogEngine';
import { canRenderWorkOnSurface } from '@core/catalog/licenseGuard';
import {
  canShowRenderingInProduction,
  getApprovedRenderingsForWork,
  getDraftRenderingsForWork,
} from '@core/catalog/renderingReview';
import {
  RENDERING_LEVEL_LABELS,
  getRenderingLevelLabel,
} from '@core/catalog/renderingLevels';
import {
  KRAMASTOTRA_RENDERINGS,
  KRAMASTOTRA_SOURCE_LABEL,
} from '@core/catalog/kashmir/kramastotra';

function expectKeyTerm(term: SanskritKeyTerm) {
  expect(term.term.trim()).toBeTruthy();
  expect(term.transliteration.trim()).toBeTruthy();
  expect(term.basicMeaning.trim()).toBeTruthy();
  expect(typeof term.keepUntranslated).toBe('boolean');
}

function expectRendering(rendering: MindvantaRendering) {
  expect(rendering.id).toMatch(/^kramastotra-\d+$/);
  expect(rendering.sourceTextSlug).toBe('kramastotra');
  expect(rendering.verseNumber).toBeTruthy();
  expect(rendering.originalScript?.trim().length).toBeGreaterThan(0);
  expect(rendering.transliteration?.trim().length).toBeGreaterThan(0);
  expect(rendering.mindvantaRendering.trim().length).toBeGreaterThan(0);
  expect(rendering.literalNotes.trim().length).toBeGreaterThan(0);
  expect(rendering.philosophicalCommentary.trim().length).toBeGreaterThan(0);
  expect(rendering.practiceNote.trim().length).toBeGreaterThan(0);
  expect(rendering.reflectionQuestion.trim().length).toBeGreaterThan(0);
  expect(rendering.keyTerms.length).toBeGreaterThan(0);
  rendering.keyTerms.forEach(expectKeyTerm);
  expect(['draft', 'needs_review']).toContain(rendering.reviewStatus);
  expect(rendering.productionEligible).toBe(false);
}

describe('Kramastotra Mindvanta rendering', () => {
  it('registers Kramastotra as review-gated source-text-only catalog work', () => {
    const work = getCatalogWorkBySlug('kramastotra');
    const version = getVersionsForWork('kramastotra')[0];

    expect(work).toMatchObject({
      slug: 'kramastotra',
      licenseStatus: 'source_text_only',
      reviewStatus: 'needs_review',
      contentType: 'mindvanta_rendering',
      renderingLevel: 'complete_mindvanta_rendering',
    });
    expect(work?.warning).toContain(KRAMASTOTRA_SOURCE_LABEL);
    expect(canRenderWorkOnSurface(work, 'library_card')).toBe(false);
    expect(version?.approved_for_shipping).toBe(false);
  });

  it('provides exactly 30 review-gated verse renderings', () => {
    expect(KRAMASTOTRA_RENDERINGS).toHaveLength(30);
    KRAMASTOTRA_RENDERINGS.forEach(expectRendering);
  });

  it('keeps the renderings tied to source references and non-official labeling', () => {
    const labels = new Set(KRAMASTOTRA_RENDERINGS.map((rendering) => rendering.sourceReference));

    expect(labels.size).toBe(30);
    expect([...labels].every((label) => label?.startsWith('Kramastotra '))).toBe(true);
    expect(KRAMASTOTRA_SOURCE_LABEL).toBe(
      'Original Mindvanta Rendering and Commentary based on the Sanskrit source text.'
    );
  });

  it('codifies user-facing labels for each Sanskrit rendering level', () => {
    expect(RENDERING_LEVEL_LABELS.complete_mindvanta_rendering).toBe(
      'Complete Mindvanta Rendering and Commentary'
    );
    expect(RENDERING_LEVEL_LABELS.selected_mindvanta_renderings).toBe(
      'Guided Study with Selected Mindvanta Renderings'
    );
    expect(RENDERING_LEVEL_LABELS.guided_study_map).toBe('Advanced Guided Study Map');
    expect(getRenderingLevelLabel('complete_mindvanta_rendering')).toBe(
      'Complete Mindvanta Rendering and Commentary'
    );
  });

  it('keeps draft Kramastotra renderings out of production helpers', () => {
    expect(getDraftRenderingsForWork('kramastotra')).toHaveLength(30);
    expect(getApprovedRenderingsForWork('kramastotra')).toHaveLength(0);
    expect(KRAMASTOTRA_RENDERINGS.every((rendering) => !canShowRenderingInProduction(rendering))).toBe(true);
  });

  it('records editorial review state without claiming Sanskrit approval', () => {
    for (const rendering of KRAMASTOTRA_RENDERINGS) {
      expect(rendering.needsSanskritReview).toBe(true);
      expect(rendering.reviewNotes).toContain('Editorial safety pass');
      expect(rendering.reviewerName).toBe('Mindvanta editorial review');
      expect(rendering.reviewedAt).toBe('2026-05-15');
      expect(rendering.reviewStatus).toBe('draft');
      expect(rendering.productionEligible).toBe(false);
    }
  });
});
