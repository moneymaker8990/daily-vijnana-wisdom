import type { RenderingLevel } from './types';

export const RENDERING_LEVEL_LABELS: Record<RenderingLevel, string> = {
  complete_mindvanta_rendering: 'Complete Mindvanta Rendering and Commentary',
  selected_mindvanta_renderings: 'Guided Study with Selected Mindvanta Renderings',
  guided_study_map: 'Advanced Guided Study Map',
};

export function getRenderingLevelLabel(level: RenderingLevel | undefined): string | undefined {
  return level ? RENDERING_LEVEL_LABELS[level] : undefined;
}
