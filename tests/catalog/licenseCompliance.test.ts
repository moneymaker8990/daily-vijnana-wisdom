import { describe, expect, it } from 'vitest';
import { ALL_VERSES } from '@core/library/registry';
import { getShippingVersionForLegacySource, getAllKashmirWorks } from '@core/catalog/catalogEngine';
import type { Verse } from '@core/library/types';

const KASHMIR_LEGACY_IDS = new Set(
  getAllKashmirWorks()
    .map((w) => w.legacy_registry_source_id)
    .filter((x): x is string => !!x)
);

function verseShipsPrimaryText(v: Verse): boolean {
  return v.contentKind !== 'educational_note';
}

describe('catalog license compliance', () => {
  it('every Kashmir legacy verse bundle has a TextVersion row', () => {
    for (const id of KASHMIR_LEGACY_IDS) {
      const ver = getShippingVersionForLegacySource(id);
      expect(ver, `Missing TextVersion for ${id}`).toBeDefined();
    }
  });

  it('primary-text verses only exist for approved shipping versions', () => {
    const seen = new Set<string>();
    for (const v of ALL_VERSES) {
      if (!KASHMIR_LEGACY_IDS.has(v.sourceId)) continue;
      if (!verseShipsPrimaryText(v)) continue;
      const ver = getShippingVersionForLegacySource(v.sourceId);
      expect(ver?.approved_for_shipping, `${v.sourceId} primary verse but unapproved version`).toBe(true);
      seen.add(v.sourceId);
    }
    expect(seen.size).toBeGreaterThan(0);
  });
});
