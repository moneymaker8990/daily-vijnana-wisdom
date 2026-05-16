import { describe, expect, it } from 'vitest';
import { getCatalogWorkBySlug } from '@core/catalog/catalogEngine';
import { canRenderWorkOnSurface } from '@core/catalog/licenseGuard';
import {
  KUBJIKAMATATANTRA_CONCEPTS,
  KUBJIKAMATATANTRA_RENDERINGS,
} from '@core/catalog/kashmir/kubjikamatatantra';

describe('Kubjikamatatantra selected Mindvanta edition', () => {
  it('registers Kubjikamatatantra as selected renderings, not a full translation', () => {
    const work = getCatalogWorkBySlug('kubjikamatatantra');

    expect(work).toMatchObject({
      slug: 'kubjikamatatantra',
      contentType: 'selected_mindvanta_renderings',
      renderingLevel: 'selected_mindvanta_renderings',
      licenseStatus: 'source_text_only',
      reviewStatus: 'needs_review',
    });
    expect(work?.included_in_app.join(' ')).toContain('selected');
    expect(work?.not_included_yet.join(' ')).toContain('Complete translation');
    expect(canRenderWorkOnSurface(work, 'library_card')).toBe(false);
  });

  it('keeps selected rendering drafts non-ritual and production-ineligible', () => {
    expect(KUBJIKAMATATANTRA_RENDERINGS.length).toBeGreaterThanOrEqual(3);
    for (const rendering of KUBJIKAMATATANTRA_RENDERINGS) {
      expect(rendering.sourceTextSlug).toBe('kubjikamatatantra');
      expect(rendering.productionEligible).toBe(false);
      expect(['draft', 'needs_review']).toContain(rendering.reviewStatus);
      expect(rendering.needsSanskritReview).toBe(true);
      expect(rendering.reviewNotes).toContain('Selected rendering editorial pass');
      expect(rendering.practiceNote.toLowerCase()).not.toContain('initiation procedure');
    }
  });

  it('documents the required conceptual map', () => {
    const conceptTitles = KUBJIKAMATATANTRA_CONCEPTS.map((section) => section.title);

    expect(conceptTitles).toEqual([
      'Who or what is Kubjika?',
      'The meaning of crooked',
      'Kaula and kula',
      'The body as mandala',
      'Shakti and embodiment',
      'The subtle body',
      'Sacred power without sensationalism',
    ]);
  });
});
