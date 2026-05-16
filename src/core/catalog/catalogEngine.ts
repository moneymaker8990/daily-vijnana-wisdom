import type { AvailabilityMode, TextVersion, TextWork } from './types';
import { KASHMIR_STUDY_GUIDES } from './kashmir/studyGuides';
import { KASHMIR_TEXT_VERSIONS, KASHMIR_TEXT_WORKS } from './kashmir/works';
import { PHASE_ONE_TEXT_VERSIONS, PHASE_ONE_TEXT_WORKS } from './texts/phaseOne';
import { canRenderWorkOnSurface } from './licenseGuard';

export const AVAILABILITY_MODE_LABELS: Record<AvailabilityMode, string> = {
  root_text: 'Root Text',
  commentary: 'Commentary',
  digest_summary: 'Digest / Summary',
  excerpt: 'Excerpt',
  guided_study: 'Guided Study',
  bibliographic_only: 'Bibliographic Entry Only',
};

const ALL_CATALOG_WORKS: TextWork[] = [...KASHMIR_TEXT_WORKS, ...PHASE_ONE_TEXT_WORKS];
const ALL_CATALOG_VERSIONS: TextVersion[] = [...KASHMIR_TEXT_VERSIONS, ...PHASE_ONE_TEXT_VERSIONS];

export function getAllCatalogWorks(): TextWork[] {
  return [...ALL_CATALOG_WORKS].sort((a, b) => a.curriculum_order - b.curriculum_order);
}

export function getCatalogWorkBySlug(slug: string): TextWork | undefined {
  return ALL_CATALOG_WORKS.find((w) => w.slug === slug);
}

export function getApprovedCatalogWorksForSurface(surface: Parameters<typeof canRenderWorkOnSurface>[1]): TextWork[] {
  return getAllCatalogWorks().filter((work) => canRenderWorkOnSurface(work, surface));
}

export function getWorkBySlug(slug: string): TextWork | undefined {
  return getCatalogWorkBySlug(slug);
}

export function getWorkById(id: string): TextWork | undefined {
  return ALL_CATALOG_WORKS.find((w) => w.id === id);
}

export function getWorkByLegacySourceId(sourceId: string): TextWork | undefined {
  return KASHMIR_TEXT_WORKS.find((w) => w.legacy_registry_source_id === sourceId);
}

export function getAllKashmirWorks(): TextWork[] {
  return [...KASHMIR_TEXT_WORKS].sort((a, b) => a.curriculum_order - b.curriculum_order);
}

export function getVersionsForWork(workId: string): TextVersion[] {
  return ALL_CATALOG_VERSIONS.filter((v) => v.work_id === workId);
}

/** Prefer the legacy-bound version when opening the reader. */
export function getShippingVersionForLegacySource(sourceId: string): TextVersion | undefined {
  return ALL_CATALOG_VERSIONS.find((v) => v.legacy_registry_source_id === sourceId);
}

export function getStudyGuide(workId: string) {
  return KASHMIR_STUDY_GUIDES.find((g) => g.work_id === workId);
}

export function getAllStudyGuides() {
  return KASHMIR_STUDY_GUIDES;
}

/** Tags used in filter UI for Kashmir shelf. */
export const KASHMIR_FILTER_DIMENSIONS = {
  availability_modes: [
    'root_text',
    'excerpt',
    'digest_summary',
    'guided_study',
    'bibliographic_only',
    'commentary',
  ] as AvailabilityMode[],
  themes: [
    'philosophy',
    'practice',
    'ritual',
    'recognition',
    'spanda',
    'tantra',
    'meditation',
    'kashmir',
  ] as const,
};
