import { describe, expect, it } from 'vitest';
import { searchCatalogContent } from '@core/search/catalogSearch';

describe('catalog search projection', () => {
  it('returns library works, course modules, and reflection prompts', () => {
    const results = searchCatalogContent('awareness');
    const resultTypes = new Set(results.map((result) => result.type));

    expect(resultTypes.has('library_work')).toBe(true);
    expect(resultTypes.has('course_module')).toBe(true);
    expect(resultTypes.has('reflection_prompt')).toBe(true);
  });

  it('does not expose review-gated works', () => {
    const results = searchCatalogContent('devi cosmic mother');
    const slugs = results.map((result) => result.slug);

    expect(slugs).not.toContain('devi-bhagavata-purana');
  });

  it('finds approved priority themes across the expanded catalog', () => {
    const expectedByQuery = {
      awareness: 'upanishads-paramananda',
      dream: 'yoga-vasistha',
      emptiness: 'diamond-sutra',
      practice: 'yoga-sutras-johnston',
      shakti: 'shiva-sutras',
    };

    for (const [query, expectedSlug] of Object.entries(expectedByQuery)) {
      const results = searchCatalogContent(query);

      expect(
        results.some((result) => result.linkedLibrarySlug === expectedSlug || result.slug === expectedSlug),
        query
      ).toBe(true);
    }
  });

  it('excludes review-gated works from library and reflection result surfaces', () => {
    const results = searchCatalogContent('devi cosmic mother');
    const productionResults = results.filter(
      (result) => result.type === 'library_work' || result.type === 'reflection_prompt'
    );

    expect(productionResults.map((result) => result.slug)).not.toContain('devi-bhagavata-purana');
    expect(productionResults.map((result) => result.linkedLibrarySlug)).not.toContain('devi-bhagavata-purana');
  });

  it('keeps Kramastotra review-gated while exposing its course module context', () => {
    const results = searchCatalogContent('krama sequence');
    const productionResults = results.filter(
      (result) => result.type === 'library_work' || result.type === 'reflection_prompt'
    );

    expect(results.some((result) => result.type === 'course_module')).toBe(true);
    expect(productionResults.map((result) => result.slug)).not.toContain('kramastotra');
    expect(productionResults.map((result) => result.linkedLibrarySlug)).not.toContain('kramastotra');
  });

  it('includes rendering level facets on course results for advanced Sanskrit works', () => {
    const results = searchCatalogContent('crooked goddess');
    const kubjikaCourse = results.find((result) => result.linkedLibrarySlug === 'kubjikamatatantra');

    expect(kubjikaCourse?.renderingLevel).toBe('selected_mindvanta_renderings');
    expect(kubjikaCourse?.renderingLevelLabel).toBe('Guided Study with Selected Mindvanta Renderings');
  });
});
