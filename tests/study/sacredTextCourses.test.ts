import { describe, expect, it } from 'vitest';
import { getAllCourses, getCourseById } from '@core/study/registry';
import { getAllCatalogWorks, getCatalogWorkBySlug } from '@core/catalog/catalogEngine';
import { canRenderWorkOnSurface } from '@core/catalog/licenseGuard';

const REQUIRED_COURSES = [
  'what-is-awareness',
  'reality-dream-and-mind',
  'the-path-of-practice',
  'goddess-shakti-and-sacred-power',
  'emptiness-and-non-grasping',
  'kali-time-and-sequence-of-awareness',
  'crooked-goddess-body-power-nondual-shakti',
  'churning-of-consciousness',
];

describe('sacred text course integration', () => {
  it('registers the new library expansion courses', () => {
    for (const courseId of REQUIRED_COURSES) {
      const course = getCourseById(courseId);

      expect(course, courseId).toBeDefined();
      expect(course?.lessons.length, courseId).toBeGreaterThanOrEqual(5);
    }
  });

  it('links course lessons back to catalog text slugs', () => {
    for (const courseId of REQUIRED_COURSES) {
      const course = getCourseById(courseId);
      const relatedTextSlugs = course?.lessons.flatMap((lesson) => lesson.relatedTextSlugs ?? []) ?? [];

      expect(relatedTextSlugs.length, courseId).toBeGreaterThan(0);
    }
  });

  it('keeps catalog course links pointed at registered course modules', () => {
    for (const work of getAllCatalogWorks()) {
      for (const link of work.courseLinks ?? []) {
        const course = getCourseById(link.courseSlug);
        const lesson = course?.lessons.find((candidate) => candidate.id === link.moduleSlug);

        expect(course, `${work.slug}:${link.courseSlug}`).toBeDefined();
        expect(lesson, `${work.slug}:${link.courseSlug}/${link.moduleSlug}`).toBeDefined();
      }
    }
  });

  it('keeps every lesson relatedTextSlug pointed at a catalog work', () => {
    for (const course of getAllCourses()) {
      for (const lesson of course.lessons) {
        for (const slug of lesson.relatedTextSlugs ?? []) {
          expect(getCatalogWorkBySlug(slug), `${course.id}:${lesson.id}:${slug}`).toBeDefined();
        }
      }
    }
  });

  it('keeps review-gated works as course references instead of production library cards', () => {
    const reviewGatedCourseSlugs = getAllCourses().flatMap((course) =>
      course.lessons.flatMap((lesson) =>
        (lesson.relatedTextSlugs ?? []).filter((slug) => {
          const work = getCatalogWorkBySlug(slug);
          return work?.reviewStatus === 'needs_review';
        })
      )
    );

    for (const slug of reviewGatedCourseSlugs) {
      const work = getCatalogWorkBySlug(slug);

      expect([
        'course_reference',
        'mindvanta_rendering',
        'selected_mindvanta_renderings',
        'guided_study_map',
      ]).toContain(work?.contentType);
      expect(canRenderWorkOnSurface(work, 'library_card'), slug).toBe(false);
    }
  });

  it('registers the Kramastotra Krama course with six linked modules', () => {
    const course = getCourseById('kali-time-and-sequence-of-awareness');

    expect(course?.title).toBe('Kali, Time, and the Sequence of Awareness');
    expect(course?.lessons).toHaveLength(6);
    expect(course?.lessons.every((lesson) => lesson.relatedTextSlugs?.includes('kramastotra'))).toBe(true);
  });

  it('registers Kubjika and Manthanabhairava advanced courses with review-gated links', () => {
    const kubjika = getCourseById('crooked-goddess-body-power-nondual-shakti');
    const manthana = getCourseById('churning-of-consciousness');

    expect(kubjika?.lessons.every((lesson) => lesson.relatedTextSlugs?.includes('kubjikamatatantra'))).toBe(true);
    expect(manthana?.lessons.every((lesson) => lesson.relatedTextSlugs?.includes('manthanabhairava-tantra'))).toBe(true);
  });
});
