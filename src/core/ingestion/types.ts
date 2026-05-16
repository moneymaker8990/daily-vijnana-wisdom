/**
 * Ingestion pipeline types aligned with Supabase tables
 * (see supabase/migrations/*_source_ingestion_catalog.sql).
 */

export type CandidateWorkflowStatus =
  | 'candidate'
  | 'needs_review'
  | 'approved_root_text'
  | 'approved_translation'
  | 'bibliography_only'
  | 'blocked';

export type SourceIngestionTier =
  | 'tier1_production_candidate'
  | 'tier2_reference_only'
  | 'tier3_blocked';

export type CatalogVersionType =
  | 'sanskrit_root'
  | 'transliteration'
  | 'english_translation'
  | 'commentary'
  | 'summary';

export type LicenseConfidence = 'high' | 'medium' | 'low';

export type ClassifierRationaleCode =
  | 'tier2_reference_only'
  | 'tier3_blocked_domain'
  | 'license_nc_detected'
  | 'license_cc0'
  | 'license_public_domain_mark'
  | 'license_us_public_domain_evidence'
  | 'license_commercial_ok'
  | 'license_unclear'
  | 'blocked_scribd'
  | 'no_license_metadata';

export type SourceCandidateRow = {
  id: string;
  work_id: string;
  title: string | null;
  source_url: string;
  source_domain: string;
  source_type: string;
  internet_archive_identifier: string | null;
  publication_year: number | null;
  license_claim: string | null;
  license_url: string | null;
  license_confidence: LicenseConfidence;
  commercial_use_allowed: boolean;
  status: CandidateWorkflowStatus;
  ingestion_tier: SourceIngestionTier;
  classifier_rationale_codes: string[];
  notes: string | null;
  fetched_at: string | null;
};
