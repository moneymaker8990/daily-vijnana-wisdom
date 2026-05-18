import { describe, expect, it } from 'vitest';
import { getAllCatalogWorks, getCatalogWorkBySlug, getVersionsForWork } from '@core/catalog/catalogEngine';
import { KRAMASTOTRA_RENDERINGS, KRAMASTOTRA_SOURCE_LABEL } from '@core/catalog/kashmir/kramastotra';
import {
  KUBJIKAMATATANTRA_CONCEPTS,
  KUBJIKAMATATANTRA_RENDERINGS,
} from '@core/catalog/kashmir/kubjikamatatantra';
import { MANTHANABHAIRAVA_STUDY_MAP } from '@core/catalog/kashmir/manthanabhairava';
import { reflectionWeights } from '@core/reflections/catalogReflections';
import { getAllCourses } from '@core/study/registry';

const ADVANCED_TANTRA_SLUGS = ['kramastotra', 'kubjikamatatantra', 'manthanabhairava-tantra'] as const;
const PLACEHOLDER_PATTERN = /\b(todo|coming soon|lorem|placeholder|insert|sample|example text)\b/i;
const FORBIDDEN_CLAIM_PATTERN = /\b(official academic translation|official scholarly translation|critical academic edition|lineage authorization)\b/i;
const NEGATED_AUTHORITY_PATTERN =
  /\b(no|not|without|does not|do not|never|not as|not an|not a)\b.{0,80}\b(official academic translation|official scholarly translation|critical academic edition|lineage authorization)\b/i;
const REQUIRED_HONESTY_LABEL =
  'Original Mindvanta Rendering and Commentary based on Sanskrit source material. Intended for contemplative study, not as a critical academic edition.';

describe('Tantra expansion audit hardening', () => {
  it('uses the required non-academic rendering honesty label', () => {
    expect(KRAMASTOTRA_SOURCE_LABEL).toBe(REQUIRED_HONESTY_LABEL);
  });

  it('keeps all advanced Tantra catalog entries review-gated and source-attributed', () => {
    for (const slug of ADVANCED_TANTRA_SLUGS) {
      const work = getCatalogWorkBySlug(slug);

      expect(work, slug).toBeDefined();
      expect(work?.licenseStatus, slug).toBe('source_text_only');
      expect(work?.reviewStatus, slug).toBe('needs_review');
      expect(work?.sourceName?.trim().length, slug).toBeGreaterThan(0);
      expect(work?.bibliography.length, slug).toBeGreaterThan(0);
      expect(work?.warning?.toLowerCase(), slug).toContain('not');
    }
  });

  it('keeps draft Tantra versions legally conservative until approval', () => {
    for (const slug of ADVANCED_TANTRA_SLUGS) {
      const version = getVersionsForWork(slug)[0];

      expect(version?.approved_for_shipping, slug).toBe(false);
      expect(version?.commercial_use_allowed, slug).toBe(false);
      expect(version?.derivative_use_allowed, slug).toBe(false);
    }
  });

  it('uses work-specific reflection copy instead of templated placeholder prose', () => {
    for (const slug of ADVANCED_TANTRA_SLUGS) {
      const work = getCatalogWorkBySlug(slug);
      const prompts = work?.reflectionPrompts ?? [];

      expect(prompts.length, slug).toBeGreaterThanOrEqual(10);
      expect(new Set(prompts.map((prompt) => prompt.prompt)).size, slug).toBe(prompts.length);
      expect(prompts.every((prompt) => !prompt.prompt.startsWith(`Let ${work?.title_primary}`)), slug).toBe(true);
    }
  });

  it('does not ship placeholder strings or unsafe authority claims in current Tantra content', () => {
    const auditTargets = [
      ...ADVANCED_TANTRA_SLUGS.map((slug) => getCatalogWorkBySlug(slug)),
      ...KRAMASTOTRA_RENDERINGS,
      ...KUBJIKAMATATANTRA_CONCEPTS,
      ...KUBJIKAMATATANTRA_RENDERINGS,
      ...MANTHANABHAIRAVA_STUDY_MAP,
    ];
    const strings = auditTargets.flatMap(collectStrings);

    for (const value of strings) {
      expect(value, value).not.toMatch(PLACEHOLDER_PATTERN);
      expect(hasUnsafeAuthorityClaim(value), value).toBe(false);
    }
  });

  it('keeps reflection weights pointed at existing catalog works', () => {
    const slugs = new Set(getAllCatalogWorks().map((work) => work.slug));

    for (const weightedSlug of Object.values(reflectionWeights).flatMap((weights) => Object.keys(weights))) {
      expect(slugs.has(weightedSlug), weightedSlug).toBe(true);
    }
  });

  it('keeps advanced course lessons substantive and safely linked', () => {
    const advancedCourses = getAllCourses().filter((course) =>
      course.lessons.some((lesson) =>
        (lesson.relatedTextSlugs ?? []).some((slug) => ADVANCED_TANTRA_SLUGS.includes(slug as (typeof ADVANCED_TANTRA_SLUGS)[number]))
      )
    );

    for (const course of advancedCourses) {
      for (const lesson of course.lessons) {
        expect(lesson.introduction.trim().length, `${course.id}:${lesson.id}`).toBeGreaterThan(90);
        expect(lesson.practice?.title.trim().length, `${course.id}:${lesson.id}`).toBeGreaterThan(0);
        expect(lesson.practice?.instructions.length, `${course.id}:${lesson.id}`).toBeGreaterThanOrEqual(4);
        expect(lesson.reflectionQuestions.length, `${course.id}:${lesson.id}`).toBeGreaterThanOrEqual(3);
      }
    }
  });
});

function collectStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(collectStrings);
  return [];
}

function hasUnsafeAuthorityClaim(value: string): boolean {
  return FORBIDDEN_CLAIM_PATTERN.test(value) && !NEGATED_AUTHORITY_PATTERN.test(value);
}
