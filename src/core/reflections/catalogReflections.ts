import { getAllCatalogWorks } from '@core/catalog/catalogEngine';
import { canRenderWorkOnSurface } from '@core/catalog/licenseGuard';
import type { DifficultyBand, ReflectionPrompt, TextWork } from '@core/catalog/types';

export type DailyReflection = {
  title: string;
  sourceTextSlug: string;
  sourceTitle: string;
  theme: string;
  body: string;
  practice: string;
  journalQuestion: string;
  linkedCourseSlug?: string;
  linkedLibrarySlug: string;
};

export const reflectionWeights: Record<DifficultyBand, Record<string, number>> = {
  beginner: {
    dhammapada: 4,
    'bhagavad-gita-song-celestial': 4,
    'upanishads-paramananda': 3,
    'yoga-sutras-johnston': 3,
    'diamond-sutra': 2,
    'yoga-vasistha': 1,
    'ashtavakra-gita': 1,
  },
  intermediate: {
    'upanishads-paramananda': 4,
    'yoga-sutras-johnston': 3,
    'bhagavad-gita-song-celestial': 3,
    dhammapada: 3,
    'diamond-sutra': 3,
    'yoga-vasistha': 3,
    vivekachudamani: 2,
    'shiva-sutras': 2,
  },
  advanced: {
    'yoga-vasistha': 4,
    'ashtavakra-gita': 4,
    'avadhuta-gita': 3,
    'diamond-sutra': 3,
    'shiva-sutras': 3,
    'spanda-karika': 3,
    'tripura-rahasya': 2,
  },
};

export function getApprovedReflectionPrompts(difficulty?: DifficultyBand): ReflectionPrompt[] {
  return getAllCatalogWorks()
    .filter((work) => canUseWorkForReflection(work))
    .flatMap((work) => work.reflectionPrompts ?? [])
    .filter((prompt) => !difficulty || prompt.difficulty === difficulty || reflectionWeights[difficulty][prompt.sourceTextSlug] > 0);
}

export function selectDailyReflection(options: { difficulty: DifficultyBand; dayNumber: number }): DailyReflection {
  const prompts = getWeightedPromptPool(options.difficulty);
  if (prompts.length === 0) {
    throw new Error(`No approved reflection prompts for ${options.difficulty}`);
  }

  const prompt = prompts[Math.abs(options.dayNumber - 1) % prompts.length];
  const work = getAllCatalogWorks().find((candidate) => candidate.slug === prompt.sourceTextSlug);

  return {
    title: buildReflectionTitle(prompt, work),
    sourceTextSlug: prompt.sourceTextSlug,
    sourceTitle: work?.title_primary ?? prompt.sourceTextSlug,
    theme: prompt.theme,
    body: prompt.prompt,
    practice: prompt.practice ?? 'Pause, breathe, and let this teaching become experiential for three minutes.',
    journalQuestion: prompt.journalQuestion ?? 'What did this reflection reveal in direct experience?',
    linkedCourseSlug: prompt.linkedCourseSlug,
    linkedLibrarySlug: prompt.linkedLibrarySlug ?? prompt.sourceTextSlug,
  };
}

function canUseWorkForReflection(work: TextWork): boolean {
  return work.reflectionEligible !== false && canRenderWorkOnSurface(work, 'search_index');
}

function getWeightedPromptPool(difficulty: DifficultyBand): ReflectionPrompt[] {
  const prompts = getApprovedReflectionPrompts(difficulty);
  const weights = reflectionWeights[difficulty];
  const weighted = prompts.flatMap((prompt) => {
    const weight = weights[prompt.sourceTextSlug] ?? 1;
    return Array.from({ length: weight }, () => prompt);
  });

  return weighted.length > 0 ? weighted : prompts;
}

function buildReflectionTitle(prompt: ReflectionPrompt, work: TextWork | undefined): string {
  const source = work?.title_primary ?? prompt.sourceTextSlug;
  return `${prompt.theme}: ${source}`;
}
