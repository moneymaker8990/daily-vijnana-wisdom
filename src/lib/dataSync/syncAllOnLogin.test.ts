import { describe, expect, it } from 'vitest';
import { downloadNamesToSkipAfterUploadFailures } from './index';

describe('downloadNamesToSkipAfterUploadFailures', () => {
  it('maps each upload failure to its download scope', () => {
    const skip = downloadNamesToSkipAfterUploadFailures([
      'journal_upload',
      'study_upload',
    ]);
    expect(skip.has('journal_download')).toBe(true);
    expect(skip.has('study_download')).toBe(true);
    expect(skip.has('dream_download')).toBe(false);
  });

  it('returns empty set when uploads succeeded', () => {
    expect(downloadNamesToSkipAfterUploadFailures([]).size).toBe(0);
  });
});
