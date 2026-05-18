import type { LicenseStatus, ReviewStatus } from './types';

export function getReviewStatusLabel(status: ReviewStatus | undefined): string {
  if (!status) return 'Draft';

  switch (status) {
    case 'draft':
      return 'Draft';
    case 'needs_review':
      return 'Needs Review';
    case 'approved':
      return 'Approved';
    case 'rejected':
      return 'Rejected';
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}

export function getLicenseStatusLabel(status: LicenseStatus): string {
  switch (status) {
    case 'public_domain_us':
      return 'Public Domain';
    case 'open_license':
      return 'Open License';
    case 'source_text_only':
      return 'Guided Commentary';
    case 'needs_review':
      return 'Needs Review';
    case 'do_not_import':
      return 'Do Not Import';
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}
