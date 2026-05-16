import { describe, expect, it } from 'vitest';
import type { TextVersion, TextWork } from '@core/catalog/types';
import { getCatalogReaderMode } from '@components/Study/readerRouting';

const work: TextWork = {
  id: 'tantraloka',
  slug: 'tantraloka',
  title_primary: 'Tantraloka',
  title_alt: [],
  author_attribution: 'Abhinavagupta',
  tradition: 'Kashmir Shaivism',
  genre: 'tantra',
  approx_date: '10th century',
  difficulty: 5,
  summary_short: 'A large text.',
  summary_long: 'A large text.',
  why_it_matters: 'It matters.',
  status_badge: 'active',
  availability_mode: 'root_text',
  source_license_status: 'pd',
  allowed_surfaces: ['library_card', 'segment_reader'],
  included_in_app: [],
  not_included_yet: [],
  bibliography: [],
  related_text_ids: [],
  curriculum_order: 1,
  tags: [],
  licenseStatus: 'public_domain_us',
  reviewStatus: 'approved',
};

const version: TextVersion = {
  id: 'tantraloka-version',
  work_id: 'tantraloka',
  language: 'Sanskrit',
  license_type: 'public_domain_claim',
  license_notes: 'Public domain source.',
  attribution_required: true,
  commercial_use_allowed: true,
  derivative_use_allowed: true,
  approved_for_shipping: true,
  approved_surfaces: ['segment_reader'],
};

describe('catalog reader routing', () => {
  it('uses the segment reader for approved catalog works without legacy registry IDs', () => {
    expect(getCatalogReaderMode(work, version)).toBe('segment');
  });

  it('uses the segment reader for legacy-backed catalog works with explicit segment preference', () => {
    const segmentPreferredWork: TextWork = {
      ...work,
      legacy_registry_source_id: 'tantraloka-selections',
      preferred_reader: 'segment',
    };

    expect(getCatalogReaderMode(segmentPreferredWork, version)).toBe('segment');
  });

  it('keeps the legacy reader for approved catalog works with bundled verse sources', () => {
    expect(getCatalogReaderMode({ ...work, legacy_registry_source_id: 'shiva-sutras' }, version)).toBe('legacy');
  });

  it('hides reader access when the version is not approved for the segment reader', () => {
    expect(getCatalogReaderMode(work, { ...version, approved_surfaces: ['library_card'] })).toBe('none');
  });

  it('hides explicit segment preference when the selected version is not approved for the segment reader', () => {
    const segmentPreferredWork: TextWork = {
      ...work,
      legacy_registry_source_id: 'tantraloka-selections',
      preferred_reader: 'segment',
    };

    expect(getCatalogReaderMode(segmentPreferredWork, { ...version, approved_surfaces: ['library_card'] })).toBe('none');
  });
});
