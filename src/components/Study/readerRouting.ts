import type { TextVersion, TextWork } from '@core/catalog/types';
import { canRenderSegmentReader } from '@core/catalog/licenseGuard';

export type CatalogReaderMode = 'legacy' | 'segment' | 'none';

export function getCatalogReaderMode(
  work: TextWork | undefined,
  version: TextVersion | undefined
): CatalogReaderMode {
  if (!work || !work.allowed_surfaces.includes('segment_reader') || !canRenderSegmentReader(version)) {
    return 'none';
  }

  if (work.preferred_reader === 'segment') {
    return 'segment';
  }

  if (work.legacy_registry_source_id) {
    return 'legacy';
  }

  return 'segment';
}
