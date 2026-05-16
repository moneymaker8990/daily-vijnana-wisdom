import { describe, expect, it } from 'vitest';
import {
  getAllCatalogWorks,
  getCatalogWorkBySlug,
} from '@core/catalog/catalogEngine';
import { getCourseById } from '@core/study/registry';
import {
  getApprovedReflectionPrompts,
  reflectionWeights,
  selectDailyReflection,
} from '@core/reflections/catalogReflections';

describe('catalog daily reflections', () => {
  it('uses the configured weighted source pools', () => {
    expect(reflectionWeights.beginner.dhammapada).toBe(4);
    expect(reflectionWeights.advanced['yoga-vasistha']).toBe(4);
    expect(reflectionWeights.advanced['spanda-karika']).toBe(3);
  });

  it('returns only approved reflection prompts', () => {
    const prompts = getApprovedReflectionPrompts('intermediate');
    const slugs = prompts.map((prompt) => prompt.sourceTextSlug);

    expect(slugs).toContain('upanishads-paramananda');
    expect(slugs).not.toContain('devi-bhagavata-purana');
    expect(slugs).not.toContain('kramastotra');
  });

  it('selects a linked daily reflection deterministically', () => {
    const reflection = selectDailyReflection({ difficulty: 'beginner', dayNumber: 7 });

    expect(reflection.sourceTextSlug).toBeTruthy();
    expect(reflection.title).toBeTruthy();
    expect(reflection.linkedLibrarySlug).toBe(reflection.sourceTextSlug);
    expect(reflection.linkedCourseSlug).toBeTruthy();
    expect(getCatalogWorkBySlug(reflection.linkedLibrarySlug)).toBeDefined();
    expect(getCourseById(reflection.linkedCourseSlug ?? '')).toBeDefined();
    expect(reflection.practice).toBeTruthy();
    expect(reflection.journalQuestion).toBeTruthy();
  });

  it('weights every approved reflection-eligible catalog work in at least one difficulty pool', () => {
    const weightedSlugs = new Set(Object.values(reflectionWeights).flatMap((weights) => Object.keys(weights)));
    const eligibleWorks = getAllCatalogWorks().filter(
      (work) => work.reviewStatus === 'approved' && work.reflectionEligible !== false
    );

    for (const work of eligibleWorks) {
      expect(weightedSlugs.has(work.slug), work.slug).toBe(true);
    }
  });

  it('never selects review-gated works for daily reflections across difficulty pools', () => {
    const selectedSlugs = [
      selectDailyReflection({ difficulty: 'beginner', dayNumber: 31 }).sourceTextSlug,
      selectDailyReflection({ difficulty: 'intermediate', dayNumber: 31 }).sourceTextSlug,
      selectDailyReflection({ difficulty: 'advanced', dayNumber: 31 }).sourceTextSlug,
    ];

    expect(selectedSlugs).not.toContain('devi-bhagavata-purana');
    expect(selectedSlugs).not.toContain('kramastotra');
  });
});
