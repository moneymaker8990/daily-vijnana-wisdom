import { describe, expect, it } from 'vitest';
import { classifyLicenseAndTier } from '@core/ingestion/licenseClassifier';

describe('licenseClassifier', () => {
  it('blocks Tier 2 from commercial production defaults', () => {
    const r = classifyLicenseAndTier({
      ingestion_tier: 'tier2_reference_only',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
      licenseText: 'CC BY-NC-SA',
      copyrightRegionHint: null,
      sourceDomain: 'gretil.sub.uni-goettingen.de',
      sourceUrl: 'https://gretil.sub.uni-goettingen.de/',
    });
    expect(r.commercial_eligible).toBe(false);
    expect(r.proposed_status).toBe('bibliography_only');
    expect(r.rationale_codes).toContain('tier2_reference_only');
  });

  it('detects NC in license URL', () => {
    const r = classifyLicenseAndTier({
      ingestion_tier: 'tier1_production_candidate',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc/4.0/',
      licenseText: '',
      copyrightRegionHint: null,
      sourceDomain: 'archive.org',
      sourceUrl: 'https://archive.org/details/foo',
    });
    expect(r.commercial_eligible).toBe(false);
    expect(r.rationale_codes).toContain('license_nc_detected');
  });

  it('treats CC0 as commercial-eligible candidate for human review', () => {
    const r = classifyLicenseAndTier({
      ingestion_tier: 'tier1_production_candidate',
      licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      licenseText: 'cc0',
      copyrightRegionHint: null,
      sourceDomain: 'archive.org',
      sourceUrl: 'https://archive.org/details/foo',
    });
    expect(r.proposed_status).toBe('needs_review');
    expect(r.commercial_eligible).toBe(true);
    expect(r.commercial_use_allowed).toBe(true);
    expect(r.rationale_codes).toContain('license_cc0');
  });

  it('blocks scribd-like hosts', () => {
    const r = classifyLicenseAndTier({
      ingestion_tier: 'tier1_production_candidate',
      licenseUrl: null,
      licenseText: null,
      copyrightRegionHint: null,
      sourceDomain: 'scribd.com',
      sourceUrl: 'https://scribd.com/doc/1',
    });
    expect(r.proposed_status).toBe('blocked');
    expect(r.rationale_codes).toContain('blocked_scribd');
  });
});
