import { getApprovedCatalogWorksForSurface, getCatalogWorkBySlug } from '@core/catalog/catalogEngine';
import { getRenderingLevelLabel } from '@core/catalog/renderingLevels';
import { getAllCourses } from '@core/study/registry';
import type { ReflectionPrompt, RenderingLevel, TextWork } from '@core/catalog/types';

export type CatalogSearchResultType = 'library_work' | 'course_module' | 'reflection_prompt';

export type CatalogSearchResult = {
  type: CatalogSearchResultType;
  slug: string;
  title: string;
  snippet: string;
  linkedLibrarySlug?: string;
  linkedCourseSlug?: string;
  renderingLevel?: RenderingLevel;
  renderingLevelLabel?: string;
};

export function searchCatalogContent(query: string): CatalogSearchResult[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  return [
    ...searchLibraryWorks(q),
    ...searchReflectionPrompts(q),
    ...searchCourseModules(q),
  ].slice(0, 40);
}

function searchLibraryWorks(query: string): CatalogSearchResult[] {
  return getApprovedCatalogWorksForSurface('search_index')
    .filter((work) => includesQuery(workHaystack(work), query))
    .map((work) => ({
      type: 'library_work',
      slug: work.slug,
      title: work.title_primary,
      snippet: work.summary_short,
      linkedLibrarySlug: work.slug,
      renderingLevel: work.renderingLevel,
      renderingLevelLabel: getRenderingLevelLabel(work.renderingLevel),
    }));
}

function searchCourseModules(query: string): CatalogSearchResult[] {
  return getAllCourses().flatMap((course) =>
    course.lessons
      .filter((lesson) => includesQuery([course.title, course.description, lesson.title, lesson.introduction].join(' '), query))
      .map((lesson) => withRenderingFacet({
        type: 'course_module' as const,
        slug: `${course.id}:${lesson.id}`,
        title: `${course.title}: ${lesson.title}`,
        snippet: lesson.introduction,
        linkedCourseSlug: course.id,
        linkedLibrarySlug: lesson.relatedTextSlugs?.[0],
      }))
  );
}

function searchReflectionPrompts(query: string): CatalogSearchResult[] {
  return getApprovedCatalogWorksForSurface('search_index').flatMap((work) =>
    (work.reflectionPrompts ?? [])
      .filter((prompt) => includesQuery(promptHaystack(prompt, work), query))
      .map((prompt) => ({
        type: 'reflection_prompt' as const,
        slug: prompt.id,
        title: `${work.title_primary}: ${prompt.theme}`,
        snippet: prompt.prompt,
        linkedCourseSlug: prompt.linkedCourseSlug,
        linkedLibrarySlug: prompt.linkedLibrarySlug ?? work.slug,
        renderingLevel: work.renderingLevel,
        renderingLevelLabel: getRenderingLevelLabel(work.renderingLevel),
      }))
  );
}

function withRenderingFacet(result: CatalogSearchResult): CatalogSearchResult {
  const work = result.linkedLibrarySlug ? getCatalogWorkBySlug(result.linkedLibrarySlug) : undefined;
  return {
    ...result,
    renderingLevel: work?.renderingLevel,
    renderingLevelLabel: getRenderingLevelLabel(work?.renderingLevel),
  };
}

function workHaystack(work: TextWork): string {
  return [
    work.title_primary,
    ...work.title_alt,
    work.tradition,
    work.summary_short,
    work.summary_long,
    work.why_it_matters,
    ...(work.themes ?? []),
    ...work.tags,
  ].join(' ');
}

function promptHaystack(prompt: ReflectionPrompt, work: TextWork): string {
  return [
    work.title_primary,
    prompt.theme,
    prompt.prompt,
    prompt.practice ?? '',
    prompt.journalQuestion ?? '',
  ].join(' ');
}

function includesQuery(value: string, query: string): boolean {
  return value.toLowerCase().includes(query);
}
