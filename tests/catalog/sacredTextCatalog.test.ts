import { describe, expect, it } from 'vitest';
import {
  getAllCatalogWorks,
  getApprovedCatalogWorksForSurface,
  getCatalogWorkBySlug,
  getVersionsForWork,
} from '@core/catalog/catalogEngine';
import { canRenderWorkOnSurface } from '@core/catalog/licenseGuard';
import { getCatalogReaderMode } from '@components/Study/readerRouting';

const PHASE_ONE_SLUGS = [
  'yoga-vasistha',
  'upanishads-paramananda',
  'bhagavad-gita-song-celestial',
  'yoga-sutras-johnston',
  'dhammapada',
  'diamond-sutra',
  'vivekachudamani',
  'ashtavakra-gita',
  'avadhuta-gita',
  'devi-bhagavata-purana',
];

describe('sacred text catalog', () => {
  it('blocks review-only and do-not-import works from production surfaces', () => {
    const devi = getCatalogWorkBySlug('devi-bhagavata-purana');

    expect(devi?.reviewStatus).toBe('needs_review');
    expect(canRenderWorkOnSurface(devi, 'library_card')).toBe(false);
    expect(getApprovedCatalogWorksForSurface('library_card').map((work) => work.slug)).not.toContain(
      'devi-bhagavata-purana'
    );
  });

  it('exposes approved phase-one works with attribution, course links, and reflection prompts', () => {
    for (const slug of PHASE_ONE_SLUGS.filter((s) => s !== 'devi-bhagavata-purana')) {
      const work = getCatalogWorkBySlug(slug);

      expect(work, `missing ${slug}`).toBeDefined();
      expect(work?.reviewStatus, slug).toBe('approved');
      expect(work?.licenseStatus, slug).not.toBe('do_not_import');
      expect(work?.author_attribution.trim().length, slug).toBeGreaterThan(0);
      expect(work?.sourceName?.trim().length, slug).toBeGreaterThan(0);
      expect(work?.bibliography.length, slug).toBeGreaterThan(0);
      expect(work?.courseLinks?.length, slug).toBeGreaterThanOrEqual(1);
      expect(work?.reflectionPrompts?.length, slug).toBeGreaterThanOrEqual(5);
      expect(canRenderWorkOnSurface(work, 'library_card'), slug).toBe(true);
    }
  });

  it('does not claim full-text availability for metadata-only entries without an approved reader path', () => {
    for (const slug of PHASE_ONE_SLUGS) {
      const work = getCatalogWorkBySlug(slug);
      const version = getVersionsForWork(work?.id ?? '')[0];
      const hasApprovedReaderPath = getCatalogReaderMode(work, version) !== 'none';

      if (!hasApprovedReaderPath) {
        expect(work?.contentType, slug).not.toBe('full_text');
      }
    }
  });

  it('keeps catalog slugs unique', () => {
    const slugs = getAllCatalogWorks().map((work) => work.slug);
    const unique = new Set(slugs);

    expect(unique.size).toBe(slugs.length);
  });
});
