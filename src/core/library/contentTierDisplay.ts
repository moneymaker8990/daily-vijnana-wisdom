import type { ContentTier, Source } from './types';

export type VerseScopeFields = Pick<Source, 'contentTier' | 'canonicalVerseTotal'>;

export const CONTENT_TIER_LABELS: Record<ContentTier, string> = {
  rootText: 'Root text',
  excerpt: 'Excerpt',
  summaryOrDigest: 'Digest',
  educationalSeries: 'Study series',
  commentary: 'Commentary',
};

/** Short badge label for Tantric / study UI. */
export function getContentTierShortLabel(tier: ContentTier | undefined): string | null {
  if (!tier) return null;
  return CONTENT_TIER_LABELS[tier];
}

/**
 * Verse count line: never implies a curated pool is the full classical work.
 */
export function formatVerseScopeLine(source: VerseScopeFields, versesInApp: number): string {
  const tier = source.contentTier;
  if (tier === 'excerpt' && source.canonicalVerseTotal != null) {
    const approx = source.canonicalVerseTotal.toLocaleString();
    return `${versesInApp} in app · ~${approx}+ verses in traditional editions`;
  }
  if (tier === 'educationalSeries') {
    return `${versesInApp} themed entries (not a full critical edition)`;
  }
  if (tier === 'summaryOrDigest') {
    return `${versesInApp} sūtras (digest of the larger Pratyabhijñā literature)`;
  }
  if (tier === 'rootText') {
    return `${versesInApp} verses in app (complete for this title)`;
  }
  if (tier === 'commentary') {
    return `${versesInApp} passages in app`;
  }
  return `${versesInApp} verses`;
}
