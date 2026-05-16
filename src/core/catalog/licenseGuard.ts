import type { LicenseSurface, TextVersion, TextWork } from './types';

/**
 * Throws in development when UI would render primary text on a non-approved surface.
 * Production: log only (avoid bricking users) — CI tests are the hard gate.
 */
export function assertApprovedForSurface(
  version: TextVersion | undefined,
  surface: LicenseSurface,
  context: string
): void {
  if (!version) {
    if (import.meta.env.DEV) {
      throw new Error(`[LicenseGuard] Missing TextVersion for ${context}`);
    }
    console.warn(`[LicenseGuard] Missing TextVersion for ${context}`);
    return;
  }
  if (!version.approved_for_shipping) {
    const msg = `[LicenseGuard] Version ${version.id} is not approved for shipping (${context})`;
    if (import.meta.env.DEV) throw new Error(msg);
    console.warn(msg);
    return;
  }
  if (!version.approved_surfaces.includes(surface)) {
    const msg = `[LicenseGuard] Surface "${surface}" not approved for version ${version.id} (${context})`;
    if (import.meta.env.DEV) throw new Error(msg);
    console.warn(msg);
  }
}

export function canRenderSegmentReader(version: TextVersion | undefined): boolean {
  return (
    !!version &&
    version.approved_for_shipping &&
    version.approved_surfaces.includes('segment_reader')
  );
}

export function canRenderWorkOnSurface(work: TextWork | undefined, surface: LicenseSurface): boolean {
  if (!work) return false;
  if (!work.allowed_surfaces.includes(surface)) return false;
  if (work.licenseStatus === 'do_not_import' || work.licenseStatus === 'needs_review') return false;
  if (work.reviewStatus && work.reviewStatus !== 'approved') return false;

  if (surface === 'library_card' && work.libraryEligible === false) return false;
  if (surface === 'study_guide' && work.courseEligible === false) return false;
  if (surface === 'search_index' && work.libraryEligible === false && work.courseEligible === false) return false;
  if (surface === 'segment_reader') return work.allowed_surfaces.includes('segment_reader');

  return true;
}
