import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { RenderingDetailView } from '@components/Study/RenderingDetailView';
import { KRAMASTOTRA_RENDERINGS } from '@core/catalog/kashmir/kramastotra';
import { getLicenseStatusLabel, getReviewStatusLabel } from '@core/catalog/reviewStatusLabels';

describe('rendering review UI helpers', () => {
  it('formats review and license statuses for app-facing badges', () => {
    expect(getReviewStatusLabel('needs_review')).toBe('Needs Review');
    expect(getReviewStatusLabel('draft')).toBe('Draft');
    expect(getLicenseStatusLabel('source_text_only')).toBe('Guided Commentary');
  });

  it('shows per-rendering review metadata in the rendering detail view', () => {
    const html = renderToStaticMarkup(<RenderingDetailView rendering={KRAMASTOTRA_RENDERINGS[0]} />);

    expect(html).toContain('Draft');
    expect(html).toContain('Sanskrit Review Needed');
    expect(html).toContain('Review metadata:');
    expect(html).toContain('Mindvanta editorial review');
  });
});
