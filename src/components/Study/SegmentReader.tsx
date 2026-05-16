import { useEffect, useState } from 'react';
import type { ChapterLoadResult } from '@core/catalog/largeWorkArchitecture';
import type { TextVersion, TextWork } from '@core/catalog/types';
import { assertApprovedForSurface } from '@core/catalog/licenseGuard';
import type { LargeTextSegment } from '@core/catalog/largeTextSegments';
import { supabase } from '@lib/supabase';
import { loadApprovedChapterSegments } from '@lib/ingestion/segmentChapterLoader';

type SegmentReaderProps = {
  work: TextWork;
  version: TextVersion;
  onBack: () => void;
  initialChapter?: number;
};

function getSegmentBody(segment: LargeTextSegment): string | undefined {
  return segment.translation ?? segment.transliteration ?? segment.devanagari ?? segment.commentary ?? undefined;
}

function SegmentCard({ segment }: { segment: LargeTextSegment }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">{segment.displayLabel}</span>
        {segment.contentKind && (
          <span className="rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 text-[11px] uppercase tracking-wider text-violet-200/80">
            {segment.contentKind.replace(/_/g, ' ')}
          </span>
        )}
      </div>

      {segment.devanagari && (
        <p className="font-serif text-xl leading-relaxed text-white/90">{segment.devanagari}</p>
      )}
      {segment.transliteration && (
        <p className="text-sm leading-relaxed text-violet-100/80 italic">{segment.transliteration}</p>
      )}
      {segment.translation && (
        <div className="border-t border-white/10 pt-4">
          <h3 className="mb-2 text-xs uppercase tracking-wider text-violet-300/70">Translation</h3>
          <p className="text-base leading-relaxed text-white/80">{segment.translation}</p>
        </div>
      )}
      {segment.commentary && (
        <div className="border-t border-white/10 pt-4">
          <h3 className="mb-2 text-xs uppercase tracking-wider text-white/45">Commentary</h3>
          <p className="text-sm leading-relaxed text-white/65">{segment.commentary}</p>
        </div>
      )}
      {!getSegmentBody(segment) && (
        <p className="text-sm text-white/45">This approved segment has no displayable text fields yet.</p>
      )}
    </article>
  );
}

export function SegmentReader({ work, version, onBack, initialChapter = 1 }: SegmentReaderProps) {
  const [chapterIndex, setChapterIndex] = useState(initialChapter);
  const [result, setResult] = useState<ChapterLoadResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    assertApprovedForSurface(version, 'segment_reader', `SegmentReader:${work.id}`);
  }, [version, work.id]);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setResult(null);
    void loadApprovedChapterSegments(supabase, { workId: work.id, chapterIndex })
      .then((nextResult) => {
        if (!cancelled) setResult(nextResult);
      })
      .catch((err) => {
        if (!cancelled) {
          setResult({
            ref: { workId: work.id, chapterIndex },
            status: 'error',
            segments: [],
            errorMessage: err instanceof Error ? err.message : String(err),
          });
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [chapterIndex, work.id]);

  const chapterTitle = `Chapter ${chapterIndex}`;

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 transition-colors hover:text-white"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">Library</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setChapterIndex((current) => Math.max(1, current - 1))}
            disabled={chapterIndex <= 1 || isLoading}
            className="rounded-lg bg-white/5 px-3 py-2 text-sm text-white/65 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:text-white/20"
          >
            Previous
          </button>
          <label className="flex items-center gap-2 text-xs text-white/50">
            Chapter
            <input
              type="number"
              min={1}
              value={chapterIndex}
              onChange={(event) => setChapterIndex(Math.max(1, Number(event.target.value) || 1))}
              className="w-20 rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-sm text-white"
            />
          </label>
          <button
            type="button"
            onClick={() => setChapterIndex((current) => current + 1)}
            disabled={isLoading}
            className="rounded-lg bg-white/5 px-3 py-2 text-sm text-white/65 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:text-white/20"
          >
            Next
          </button>
        </div>
      </div>

      <header className="space-y-2 text-center">
        <p className="text-xs uppercase tracking-wider text-violet-300/70">Lazy segment reader</p>
        <h1 className="font-serif text-2xl text-white">{work.title_primary}</h1>
        <p className="text-sm text-white/50">{chapterTitle}</p>
      </header>

      {isLoading && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center text-sm text-white/60">
          Loading approved segments...
        </div>
      )}

      {!isLoading && result?.status === 'error' && (
        <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-5 text-sm text-red-100/85">
          Could not load this chapter: {result.errorMessage ?? 'Unknown error'}
        </div>
      )}

      {!isLoading && result?.status === 'empty' && (
        <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-5 text-sm text-amber-100/85">
          No approved public segments are available for {chapterTitle}. This may mean the version is not approved yet,
          the chapter has not been ingested, or RLS is correctly hiding unapproved rows.
        </div>
      )}

      {!isLoading && result?.status === 'ready' && (
        <div className="space-y-4">
          {result.segments.map((segment) => (
            <SegmentCard key={segment.id} segment={segment} />
          ))}
        </div>
      )}
    </div>
  );
}
