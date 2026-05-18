import type { CandidateWorkflowStatus, ClassifierRationaleCode, SourceIngestionTier } from './types';

export type LicenseClassificationInput = {
  /** Tier 1 = IA / KSTS candidates; 2 = GRETIL, Muktabodha; 3 = blocked hosts */
  ingestion_tier: SourceIngestionTier;
  /** Raw license URL from provider metadata */
  licenseUrl: string | null | undefined;
  /** Concatenated license / rights text (lowercased before rules) */
  licenseText: string | null | undefined;
  /** e.g. metadata.copyright or Archive Possible-copyright-status */
  copyrightRegionHint: string | null | undefined;
  sourceDomain: string;
  sourceUrl: string;
};

export type LicenseClassification = {
  /** Default workflow state for a freshly ingested row */
  proposed_status: CandidateWorkflowStatus;
  /** If true, primary text could in principle ship after human approval */
  production_text_eligible: boolean;
  /** Mindvanta is commercial: NC / unclear = false */
  commercial_eligible: boolean;
  license_confidence: 'high' | 'medium' | 'low';
  rationale_codes: ClassifierRationaleCode[];
  commercial_use_allowed: boolean;
  derivative_use_allowed: boolean;
  attribution_required: boolean;
};

const BLOCKED_HOST_HINTS = ['scribd.com', 'scribd.'];

function hostBlocked(domain: string, url: string): boolean {
  const d = domain.toLowerCase();
  const u = url.toLowerCase();
  if (BLOCKED_HOST_HINTS.some((h) => d.includes(h) || u.includes(h))) return true;
  return false;
}

function includesNc(text: string): boolean {
  return (
    text.includes('by-nc') ||
    text.includes('noncommercial') ||
    text.includes('non-commercial') ||
    /\bcc\s+by-nc\b/i.test(text)
  );
}

/**
 * Conservative classifier — assists humans; does not replace counsel.
 */
export function classifyLicenseAndTier(input: LicenseClassificationInput): LicenseClassification {
  const rationale: ClassifierRationaleCode[] = [];
  const url = (input.licenseUrl ?? '').toLowerCase();
  const text = (input.licenseText ?? '').toLowerCase();
  const combined = `${url} ${text}`;

  if (input.ingestion_tier === 'tier3_blocked' || hostBlocked(input.sourceDomain, input.sourceUrl)) {
    rationale.push('tier3_blocked_domain');
    if (hostBlocked(input.sourceDomain, input.sourceUrl)) rationale.push('blocked_scribd');
    return {
      proposed_status: 'blocked',
      production_text_eligible: false,
      commercial_eligible: false,
      license_confidence: 'high',
      rationale_codes: rationale,
      commercial_use_allowed: false,
      derivative_use_allowed: false,
      attribution_required: true,
    };
  }

  if (input.ingestion_tier === 'tier2_reference_only') {
    rationale.push('tier2_reference_only');
    return {
      proposed_status: 'bibliography_only',
      production_text_eligible: false,
      commercial_eligible: false,
      license_confidence: 'medium',
      rationale_codes: rationale,
      commercial_use_allowed: false,
      derivative_use_allowed: false,
      attribution_required: true,
    };
  }

  if (includesNc(combined)) {
    rationale.push('license_nc_detected');
    return {
      proposed_status: 'bibliography_only',
      production_text_eligible: false,
      commercial_eligible: false,
      license_confidence: 'high',
      rationale_codes: rationale,
      commercial_use_allowed: false,
      derivative_use_allowed: false,
      attribution_required: true,
    };
  }

  const cc0 =
    combined.includes('cc0') ||
    url.includes('creativecommons.org/publicdomain/zero');
  if (cc0) {
    rationale.push('license_cc0');
    rationale.push('license_commercial_ok');
    return {
      proposed_status: 'needs_review',
      production_text_eligible: true,
      commercial_eligible: true,
      license_confidence: 'medium',
      rationale_codes: rationale,
      commercial_use_allowed: true,
      derivative_use_allowed: true,
      attribution_required: false,
    };
  }

  const pdm =
    combined.includes('publicdomain') ||
    combined.includes('public domain mark') ||
    url.includes('creativecommons.org/publicdomain/mark');
  if (pdm) {
    rationale.push('license_public_domain_mark');
    rationale.push('license_commercial_ok');
    return {
      proposed_status: 'needs_review',
      production_text_eligible: true,
      commercial_eligible: true,
      license_confidence: 'medium',
      rationale_codes: rationale,
      commercial_use_allowed: true,
      derivative_use_allowed: true,
      attribution_required: false,
    };
  }

  const copyHint = (input.copyrightRegionHint ?? '').toLowerCase();
  if (copyHint.includes('not_in_copyright') || copyHint.includes('no copyright')) {
    rationale.push('license_us_public_domain_evidence');
    return {
      proposed_status: 'needs_review',
      production_text_eligible: true,
      commercial_eligible: false,
      license_confidence: 'low',
      rationale_codes: rationale,
      commercial_use_allowed: false,
      derivative_use_allowed: false,
      attribution_required: true,
    };
  }

  if (combined.includes('by') && combined.includes('creativecommons.org') && !includesNc(combined)) {
    rationale.push('license_commercial_ok');
    return {
      proposed_status: 'needs_review',
      production_text_eligible: true,
      commercial_eligible: true,
      license_confidence: 'low',
      rationale_codes: rationale,
      commercial_use_allowed: true,
      derivative_use_allowed: true,
      attribution_required: true,
    };
  }

  rationale.push('license_unclear');
  if (!combined.trim()) rationale.push('no_license_metadata');
  return {
    proposed_status: 'needs_review',
    production_text_eligible: false,
    commercial_eligible: false,
    license_confidence: 'low',
    rationale_codes: rationale,
    commercial_use_allowed: false,
    derivative_use_allowed: false,
    attribution_required: true,
  };
}
