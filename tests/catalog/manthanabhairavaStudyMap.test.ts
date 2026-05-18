import { describe, expect, it } from 'vitest';
import { getCatalogWorkBySlug } from '@core/catalog/catalogEngine';
import { canRenderWorkOnSurface } from '@core/catalog/licenseGuard';
import { getApprovedRenderingsForWork, getDraftRenderingsForWork } from '@core/catalog/renderingReview';
import { MANTHANABHAIRAVA_STUDY_MAP } from '@core/catalog/kashmir/manthanabhairava';

describe('Manthanabhairava guided study map', () => {
  it('registers Manthanabhairava as an advanced guided study map, not a translation', () => {
    const work = getCatalogWorkBySlug('manthanabhairava-tantra');

    expect(work).toMatchObject({
      slug: 'manthanabhairava-tantra',
      contentType: 'guided_study_map',
      renderingLevel: 'guided_study_map',
      licenseStatus: 'source_text_only',
      reviewStatus: 'needs_review',
    });
    expect(work?.included_in_app.join(' ')).toContain('study map');
    expect(work?.not_included_yet.join(' ')).toContain('Full verse-by-verse translation');
    expect(canRenderWorkOnSurface(work, 'library_card')).toBe(false);
  });

  it('provides the complete guided map section set', () => {
    expect(MANTHANABHAIRAVA_STUDY_MAP.map((section) => section.title)).toEqual([
      'What does Manthana mean?',
      'Bhairava and Bhairavi',
      'Kubjika and the goddess current',
      'Churning as transformation',
      'The subtle body as sacred field',
      'Hiddenness and initiation',
      'Why this is advanced material',
      'How Mindvanta approaches this responsibly',
    ]);
  });

  it('does not register Manthanabhairava verse renderings for a map-only work', () => {
    expect(getDraftRenderingsForWork('manthanabhairava-tantra')).toHaveLength(0);
    expect(getApprovedRenderingsForWork('manthanabhairava-tantra')).toHaveLength(0);
  });
});
