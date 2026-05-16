import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  ingestTextDirectory,
  splitChapters,
  stripProjectGutenbergBoilerplate,
} from '../../scripts/ingestion/ingestTexts';

describe('text ingestion pipeline', () => {
  it('removes Project Gutenberg wrappers and production credits', () => {
    const cleaned = stripProjectGutenbergBoilerplate(`
Produced by Example Volunteers
*** START OF THE PROJECT GUTENBERG EBOOK TEST ***
Transcribed from the 1899 edition by Example Volunteers
Updated editions will replace the previous one
CHAPTER I
The teaching begins.
*** END OF THE PROJECT GUTENBERG EBOOK TEST ***
Project Gutenberg License
`);

    expect(cleaned).toContain('CHAPTER I');
    expect(cleaned).toContain('The teaching begins.');
    expect(cleaned).not.toContain('Produced by');
    expect(cleaned).not.toContain('Transcribed from');
    expect(cleaned).not.toContain('Updated editions');
    expect(cleaned).not.toContain('Project Gutenberg License');
  });

  it('splits chapter headings into ordered chapters', () => {
    const chapters = splitChapters('CHAPTER I\nFirst body\n\nCHAPTER II\nSecond body');

    expect(chapters).toEqual([
      { id: 'chapter-1', title: 'CHAPTER I', order: 1, body: 'First body' },
      { id: 'chapter-2', title: 'CHAPTER II', order: 2, body: 'Second body' },
    ]);
  });

  it('writes review-gated processed output and backs up existing files', () => {
    const root = mkdtempSync(join(tmpdir(), 'mindvanta-ingest-'));
    try {
      const rawDir = join(root, 'raw', 'upanishads');
      const processedDir = join(root, 'processed');
      mkdirSync(rawDir, { recursive: true });
      writeFileSync(join(rawDir, 'source.txt'), 'CHAPTER I\nThe Self is light.', { flag: 'wx' });

      const first = ingestTextDirectory({
        slug: 'upanishads',
        title: 'Upanishads',
        rawDir,
        processedDir,
      });
      const second = ingestTextDirectory({
        slug: 'upanishads',
        title: 'Upanishads',
        rawDir,
        processedDir,
      });
      const output = JSON.parse(readFileSync(first.outputPath, 'utf8')) as {
        reviewStatus: string;
        excerpts: { reviewStatus: string }[];
      };

      expect(output.reviewStatus).toBe('needs_review');
      expect(output.excerpts.length).toBeGreaterThan(0);
      expect(output.excerpts.every((excerpt) => excerpt.reviewStatus === 'needs_review')).toBe(true);
      expect(second.backupPath).toBeTruthy();
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
