import { classifyLicenseAndTier } from '../../src/core/ingestion/licenseClassifier';
import type { SourceIngestionTier } from '../../src/core/ingestion/types';

const IA_METADATA = 'https://archive.org/metadata';

export type ArchiveMetadataFile = {
  name: string;
  format?: string;
  size?: string;
};

export type ArchiveMetadataResponse = {
  metadata?: {
    identifier?: string;
    title?: string;
    creator?: string;
    publisher?: string;
    date?: string;
    year?: string;
    language?: string;
    licenseurl?: string;
    license?: string;
    mediatype?: string;
    /** e.g. Possible copyright status */
    'possible-copyright-status'?: string;
    [key: string]: unknown;
  };
  files?: ArchiveMetadataFile[];
};

export async function fetchArchiveMetadata(identifier: string): Promise<ArchiveMetadataResponse> {
  const url = `${IA_METADATA}/${encodeURIComponent(identifier)}`;
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`Archive metadata ${identifier}: HTTP ${res.status}`);
  }
  return res.json() as Promise<ArchiveMetadataResponse>;
}

export function pickPreferredFileFormat(files: ArchiveMetadataFile[] | undefined): string | null {
  if (!files?.length) return null;
  const pdf = files.find((f) => f.name?.toLowerCase().endsWith('.pdf'));
  if (pdf) return 'pdf';
  const txt = files.find((f) => f.name?.toLowerCase().endsWith('.txt'));
  if (txt) return 'txt';
  return files[0]?.format ?? null;
}

export function mapArchiveToCandidateFields(
  identifier: string,
  meta: ArchiveMetadataResponse,
  workId: string,
  tier: SourceIngestionTier
) {
  const m = meta.metadata ?? {};
  const licenseUrl = typeof m.licenseurl === 'string' ? m.licenseurl : null;
  const licenseParts = [m.license, licenseUrl].filter(Boolean).join(' ');
  const yearRaw = m.year ?? m.date ?? '';
  const yearMatch = String(yearRaw).match(/\b(19|20)\d{2}\b/);
  const publicationYear = yearMatch ? parseInt(yearMatch[0], 10) : null;
  const files = meta.files ?? [];
  const fileFormat = pickPreferredFileFormat(files);

  const classification = classifyLicenseAndTier({
    ingestion_tier: tier,
    licenseUrl,
    licenseText: licenseParts,
    copyrightRegionHint:
      typeof m['possible-copyright-status'] === 'string' ? m['possible-copyright-status'] : null,
    sourceDomain: 'archive.org',
    sourceUrl: `https://archive.org/details/${identifier}`,
  });

  return {
    work_id: workId,
    title: typeof m.title === 'string' ? m.title : null,
    source_url: `https://archive.org/details/${identifier}`,
    source_domain: 'archive.org',
    source_type: 'internet_archive',
    internet_archive_identifier: identifier,
    publication_year: publicationYear,
    editor: null as string | null,
    translator: null as string | null,
    publisher: typeof m.publisher === 'string' ? m.publisher : null,
    language: typeof m.language === 'string' ? m.language : null,
    script: null as string | null,
    file_format: fileFormat,
    license_claim: licenseParts || null,
    license_url: licenseUrl,
    license_confidence: classification.license_confidence,
    commercial_use_allowed: classification.commercial_use_allowed,
    derivative_use_allowed: classification.derivative_use_allowed,
    attribution_required: classification.attribution_required,
    public_domain_evidence: {
      archive_identifier: identifier,
      possible_copyright_status: m['possible-copyright-status'] ?? null,
    } as Record<string, unknown>,
    ingestion_tier: tier,
    classifier_rationale_codes: classification.rationale_codes,
    metadata_snapshot: meta as unknown as Record<string, unknown>,
    fetched_at: new Date().toISOString(),
    status: classification.proposed_status,
    notes: null as string | null,
  };
}
