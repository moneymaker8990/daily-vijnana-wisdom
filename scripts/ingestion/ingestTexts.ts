import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { basename, join } from 'node:path';
import { pathToFileURL } from 'node:url';

export type ReviewStatus = 'draft' | 'needs_review' | 'approved' | 'rejected';

export type ProcessedChapter = {
  id: string;
  title: string;
  order: number;
  body: string;
};

export type ProcessedText = {
  slug: string;
  title: string;
  reviewStatus: ReviewStatus;
  generatedAt: string;
  chapters: ProcessedChapter[];
  excerpts: {
    id: string;
    chapterId: string;
    title: string;
    body: string;
    reviewStatus: ReviewStatus;
  }[];
  metadata: {
    licenseStatus: 'needs_review';
    attribution: string;
  };
};

export type IngestTextDirectoryOptions = {
  slug: string;
  title: string;
  rawDir: string;
  processedDir: string;
};

export type IngestTextDirectoryResult = {
  outputPath: string;
  backupPath?: string;
};

export function stripProjectGutenbergBoilerplate(input: string): string {
  const normalized = normalizeLineBreaks(input);
  const lines = normalized.split('\n');
  const startIndex = lines.findIndex((line) => /\*\*\*\s*START OF (THE )?PROJECT GUTENBERG/i.test(line));
  const endIndex = lines.findIndex((line) => /\*\*\*\s*END OF (THE )?PROJECT GUTENBERG/i.test(line));
  const contentStart = startIndex >= 0 ? startIndex + 1 : 0;
  const contentEnd = endIndex >= 0 ? endIndex : lines.length;

  return lines
    .slice(contentStart, contentEnd)
    .filter((line) => !isProjectGutenbergCreditLine(line))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function splitChapters(input: string): ProcessedChapter[] {
  const lines = normalizeLineBreaks(input).split('\n');
  const chapters: ProcessedChapter[] = [];
  let currentTitle = 'Complete Text';
  let currentBody: string[] = [];

  function pushChapter() {
    const body = currentBody.join('\n').trim();
    if (!body) return;
    const order = chapters.length + 1;
    chapters.push({
      id: `chapter-${order}`,
      title: currentTitle,
      order,
      body,
    });
  }

  for (const line of lines) {
    if (isChapterHeading(line)) {
      pushChapter();
      currentTitle = line.trim();
      currentBody = [];
    } else {
      currentBody.push(line);
    }
  }

  pushChapter();
  return chapters;
}

export function ingestTextDirectory(options: IngestTextDirectoryOptions): IngestTextDirectoryResult {
  mkdirSync(options.processedDir, { recursive: true });

  const rawFiles = readdirSync(options.rawDir)
    .filter((file) => file.toLowerCase().endsWith('.txt'))
    .sort();
  const rawText = rawFiles
    .map((file) => readFileSync(join(options.rawDir, file), 'utf8'))
    .join('\n\n');
  const cleaned = stripProjectGutenbergBoilerplate(rawText);
  const chapters = splitChapters(cleaned);
  const processed = buildProcessedText(options.slug, options.title, chapters);
  const outputPath = join(options.processedDir, `${options.slug}.json`);
  const backupPath = backupExistingFile(outputPath);

  writeFileSync(outputPath, `${JSON.stringify(processed, null, 2)}\n`, 'utf8');

  return {
    outputPath,
    backupPath,
  };
}

function normalizeLineBreaks(input: string): string {
  return input.replace(/\r\n?/g, '\n');
}

function isProjectGutenbergCreditLine(line: string): boolean {
  const trimmed = line.trim();
  return (
    /^Produced by\b/i.test(trimmed) ||
    /^Transcribed from\b/i.test(trimmed) ||
    /^Updated editions\b/i.test(trimmed) ||
    /^Project Gutenberg\b/i.test(trimmed)
  );
}

function isChapterHeading(line: string): boolean {
  return /^(chapter|book|canto|part)\s+[ivxlcdm\d]+/i.test(line.trim());
}

function buildProcessedText(slug: string, title: string, chapters: ProcessedChapter[]): ProcessedText {
  return {
    slug,
    title,
    reviewStatus: 'needs_review',
    generatedAt: new Date().toISOString(),
    chapters,
    excerpts: chapters.slice(0, 8).map((chapter) => ({
      id: `${slug}-${chapter.id}-excerpt-1`,
      chapterId: chapter.id,
      title: chapter.title,
      body: chapter.body.slice(0, 600).trim(),
      reviewStatus: 'needs_review',
    })),
    metadata: {
      licenseStatus: 'needs_review',
      attribution: 'Generated stub; add verified author, translator, edition, and source before approval.',
    },
  };
}

function backupExistingFile(outputPath: string): string | undefined {
  if (!existsSync(outputPath)) return undefined;

  const backupPath = `${outputPath}.bak-${Date.now()}`;
  copyFileSync(outputPath, backupPath);
  return backupPath;
}

function runCli() {
  const root = process.cwd();
  const rawRoot = join(root, 'content', 'sacred-texts', 'raw');
  const processedDir = join(root, 'content', 'sacred-texts', 'processed');

  if (!existsSync(rawRoot)) {
    console.error(`Raw text directory not found: ${rawRoot}`);
    process.exit(1);
  }

  const entries = readdirSync(rawRoot)
    .map((entry) => join(rawRoot, entry))
    .filter((entryPath) => statSync(entryPath).isDirectory());

  for (const rawDir of entries) {
    const slug = basename(rawDir);
    const title = slug
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
    const result = ingestTextDirectory({ slug, title, rawDir, processedDir });
    console.log(`Processed ${slug} -> ${result.outputPath}`);
    if (result.backupPath) console.log(`Backup written: ${result.backupPath}`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli();
}
