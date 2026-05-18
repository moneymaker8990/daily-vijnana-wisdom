import { useState, useEffect, useMemo } from 'react';
import { getAllSources, getVerseCount } from '@core/library/engine';
import { getAllLibraryTexts } from '@core/library/adapter';
import type { Source } from '@core/library/types';
import { formatVerseScopeLine, getContentTierShortLabel } from '@core/library/contentTierDisplay';
import type { LibraryText } from '@data/library/types';
import { TextReader } from './TextReader';
import { SegmentReader } from './SegmentReader';
import { MindvantaRenderingReader } from './MindvantaRenderingReader';
import { WorkDetailView } from './WorkDetailView';
import { getCatalogReaderMode } from './readerRouting';
import { getReadingProgress, type ReadingProgress } from '@lib/readingProgress';
import { getDraftRenderingsForWork } from '@core/catalog/renderingReview';
import { getRenderingLevelLabel } from '@core/catalog/renderingLevels';
import { getLicenseStatusLabel } from '@core/catalog/reviewStatusLabels';
import {
  AVAILABILITY_MODE_LABELS,
  getAllCatalogWorks,
  getApprovedCatalogWorksForSurface,
  getShippingVersionForLegacySource,
  getVersionsForWork,
  KASHMIR_FILTER_DIMENSIONS,
} from '@core/catalog/catalogEngine';
import type { AvailabilityMode, TextWork } from '@core/catalog/types';

type StudyLibraryProps = {
  onOpenNondualTantraPath?: () => void;
};

/** Normalize any edge cases so Nondual Tantra UX always attaches to Kashmir-lineage sources. */
function isTantricSource(source: Source): boolean {
  return source.tradition.trim() === 'Tantric';
}

function sourceMatchesSearch(source: Source, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  const tierLabel = getContentTierShortLabel(source.contentTier);
  const haystack = [
    source.name,
    source.description,
    source.tradition,
    source.subtitle ?? '',
    tierLabel ?? '',
    ...(source.searchKeywords ?? []),
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(q);
}

function workMatchesSearch(work: TextWork, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  const haystack = [
    work.title_primary,
    ...work.title_alt,
    work.summary_short,
    work.author_attribution,
    work.tradition,
    ...(work.themes ?? []),
    ...work.tags,
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(q);
}

export function StudyLibrary({ onOpenNondualTantraPath }: StudyLibraryProps) {
  const [selectedWorkSlug, setSelectedWorkSlug] = useState<string | null>(null);
  const [selectedSegmentWorkSlug, setSelectedSegmentWorkSlug] = useState<string | null>(null);
  const [selectedRenderingWorkSlug, setSelectedRenderingWorkSlug] = useState<string | null>(null);
  const [readerReturnSlug, setReaderReturnSlug] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<LibraryText | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sources, setSources] = useState<Source[]>([]);
  const [libraryTexts, setLibraryTexts] = useState<LibraryText[]>([]);
  const [progress, setProgress] = useState<Record<string, ReadingProgress>>({});
  const [nondualIntroOpen, setNondualIntroOpen] = useState(false);
  const [filterAvailability, setFilterAvailability] = useState<Set<AvailabilityMode>>(new Set());
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<number | null>(null);

  useEffect(() => {
    const allSources = getAllSources();
    setSources(allSources);

    const allTexts = getAllLibraryTexts();
    setLibraryTexts(allTexts);

    const progressMap: Record<string, ReadingProgress> = {};
    allSources.forEach((source) => {
      const p = getReadingProgress(source.id);
      if (p) progressMap[source.id] = p;
    });
    setProgress(progressMap);
  }, []);

  const catalogWorksFiltered = useMemo(() => {
    return getApprovedCatalogWorksForSurface('library_card').filter((work) => {
      if (!workMatchesSearch(work, searchQuery)) return false;
      if (filterAvailability.size > 0 && !filterAvailability.has(work.availability_mode)) return false;
      if (filterTag && !work.tags.includes(filterTag) && !(work.themes ?? []).includes(filterTag)) return false;
      if (filterDifficulty != null && work.difficulty !== filterDifficulty) return false;
      return true;
    });
  }, [searchQuery, filterAvailability, filterTag, filterDifficulty]);

  const catalogFilterThemes = useMemo(() => {
    const themes = new Set<string>(KASHMIR_FILTER_DIMENSIONS.themes);
    getApprovedCatalogWorksForSurface('library_card').forEach((work) => {
      work.tags.forEach((tag) => themes.add(tag));
      work.themes?.forEach((theme) => themes.add(theme));
    });
    return [...themes].sort((a, b) => a.localeCompare(b));
  }, []);

  const getInitialVerse = (sourceId: string): number => {
    const p = progress[sourceId];
    if (p?.lastVerseIndex !== undefined) {
      return p.lastVerseIndex;
    }
    return 0;
  };

  const openReaderForLegacySource = (legacySourceId: string, returnSlug: string) => {
    const src = sources.find((s) => s.id === legacySourceId);
    const text = libraryTexts.find((t) => t.registrySourceId === legacySourceId || (src && t.title === src.name));
    if (text) {
      setReaderReturnSlug(returnSlug);
      setSelectedText(text);
    }
  };

  if (selectedText) {
    const source = sources.find((s) => s.id === selectedText.registrySourceId || s.name === selectedText.title);
    const initialVerse = source ? getInitialVerse(source.id) : 0;

    return (
      <TextReader
        text={selectedText}
        onBack={() => {
          setSelectedText(null);
          if (readerReturnSlug) {
            setSelectedWorkSlug(readerReturnSlug);
            setReaderReturnSlug(null);
          }
        }}
        initialVerse={initialVerse}
      />
    );
  }

  if (selectedSegmentWorkSlug) {
    const work = getAllCatalogWorks().find((w) => w.slug === selectedSegmentWorkSlug);
    const version = work ? getVersionsForWork(work.id)[0] : undefined;

    if (work && version) {
      return (
        <SegmentReader
          work={work}
          version={version}
          onBack={() => {
            setSelectedSegmentWorkSlug(null);
            setSelectedWorkSlug(selectedSegmentWorkSlug);
          }}
        />
      );
    }

    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setSelectedSegmentWorkSlug(null)}
          className="text-sm text-white/60 hover:text-white"
        >
          Library
        </button>
        <p className="text-white/70">This catalog work is not available for the segment reader.</p>
      </div>
    );
  }

  if (selectedRenderingWorkSlug) {
    const work = getAllCatalogWorks().find((w) => w.slug === selectedRenderingWorkSlug);
    const renderings = getDraftRenderingsForWork(selectedRenderingWorkSlug);

    if (work) {
      return (
        <MindvantaRenderingReader
          work={work}
          renderings={renderings}
          onBack={() => {
            setSelectedRenderingWorkSlug(null);
            setSelectedWorkSlug(selectedRenderingWorkSlug);
          }}
        />
      );
    }
  }

  if (selectedWorkSlug) {
    const work = getAllCatalogWorks().find((w) => w.slug === selectedWorkSlug);
    const legacy = work?.legacy_registry_source_id;
    const verseCount = legacy ? getVerseCount(legacy) : 0;
    const version = legacy ? getShippingVersionForLegacySource(legacy) : getVersionsForWork(work?.id ?? '')[0];
    const readerMode = getCatalogReaderMode(work, version);

    return (
      <WorkDetailView
        workSlug={selectedWorkSlug}
        verseCountInReader={verseCount}
        onBack={() => setSelectedWorkSlug(null)}
        onNavigateToWork={(slug) => setSelectedWorkSlug(slug)}
        onOpenReader={
          readerMode === 'legacy' && legacy
            ? () => openReaderForLegacySource(legacy, selectedWorkSlug)
            : readerMode === 'segment'
              ? () => {
                  setSelectedSegmentWorkSlug(selectedWorkSlug);
                  setSelectedWorkSlug(null);
                }
              : work?.renderingLevel
                ? () => {
                    setSelectedRenderingWorkSlug(selectedWorkSlug);
                    setSelectedWorkSlug(null);
                  }
                : undefined
        }
      />
    );
  }

  const filteredSources = sources.filter((source) => sourceMatchesSearch(source, searchQuery));

  const nonTantricSources = filteredSources.filter((s) => !isTantricSource(s));

  const sourcesByTradition = nonTantricSources.reduce(
    (acc, source) => {
      const tradition = source.tradition;
      if (!acc[tradition]) acc[tradition] = [];
      acc[tradition].push(source);
      return acc;
    },
    {} as Record<string, Source[]>
  );

  const traditionOrder = ['Hindu', 'Tantric', 'Buddhist', 'Taoist', 'Zen', 'Sufi', 'ChristianMystic', 'Hermetic', 'Stoic'];
  const getTraditionOrder = (tradition: string) => {
    const index = traditionOrder.indexOf(tradition);
    return index === -1 ? Number.MAX_SAFE_INTEGER : index;
  };
  const sortedTraditions = Object.keys(sourcesByTradition).sort(
    (a, b) => getTraditionOrder(a) - getTraditionOrder(b)
  );

  const toggleAvailability = (mode: AvailabilityMode) => {
    setFilterAvailability((prev) => {
      const next = new Set(prev);
      if (next.has(mode)) next.delete(mode);
      else next.add(mode);
      return next;
    });
  };

  const clearFilters = () => {
    setFilterAvailability(new Set());
    setFilterTag(null);
    setFilterDifficulty(null);
  };

  const hasActiveFilters = filterAvailability.size > 0 || filterTag != null || filterDifficulty != null;

  return (
    <div className="space-y-6">
      <div className="text-center pb-4 border-b border-white/10">
        <p className="text-sm text-white/60">
          Nondual Tantra shelf uses the Kashmir catalog; other traditions open the reader directly
        </p>
      </div>

      <div className="relative" role="search">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search titles, themes, authors..."
          aria-label="Search titles, themes, and authors"
          className="w-full px-4 py-3 pl-10 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="space-y-8">
        {catalogWorksFiltered.length > 0 && (
          <div key="sacred-text-catalog" className="space-y-3">
            <div className="rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-500/15 to-indigo-500/10 p-5 md:p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">
                  📚
                </span>
                <div className="min-w-0 flex-1 space-y-2">
                  <h3 className="text-lg md:text-xl font-serif text-white tracking-tight">Sacred Text Catalog</h3>
                  <p className="text-sm text-violet-200/85 leading-relaxed">
                    Approved public-domain, open, and guided commentary entries for Library, Study, and Reflection
                  </p>
                  <p className="text-xs text-white/50 leading-relaxed max-w-2xl mx-auto md:mx-0">
                    Open any work for source attribution, licensing posture, related courses, prompts, and reader access when approved.
                  </p>
                </div>
              </div>
            </div>
            {onOpenNondualTantraPath && (
              <div className="rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-indigo-600/5 p-4 md:p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium uppercase tracking-wider text-violet-300/90">Guided path</span>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/70">Study</span>
                      <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-200/90">
                        Practice
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-serif text-white">Entering Nondual Tantra</h3>
                    <p className="text-sm text-white/65 leading-relaxed max-w-2xl">
                      Five curriculum layers (intro, recognition, practice, commentary, advanced synthesis) map to catalog
                      work slugs — see course for lesson links.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenNondualTantraPath}
                    className="shrink-0 w-full sm:w-auto px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-sm font-medium shadow-lg shadow-violet-500/20 hover:from-violet-400 hover:to-indigo-400 transition-all text-center"
                  >
                    Open guided path
                  </button>
                </div>
              </div>
            )}
            <div className="rounded-xl border border-white/10 bg-white/[0.07] overflow-hidden">
              <button
                type="button"
                onClick={() => setNondualIntroOpen(!nondualIntroOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                aria-expanded={nondualIntroOpen}
              >
                <span className="font-medium text-white text-sm md:text-base">What Is Nondual Tantra?</span>
                <svg
                  className={`w-5 h-5 text-white/50 shrink-0 transition-transform ${nondualIntroOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {nondualIntroOpen && (
                <div className="px-4 pb-4 pt-0 border-t border-white/10 space-y-3 text-sm text-white/75 leading-relaxed">
                  <p>
                    <strong className="text-white/90 font-medium">Śiva</strong> names pure awareness;{' '}
                    <strong className="text-white/90 font-medium">Śakti</strong> names its dynamism in living experience.
                  </p>
                  <p className="text-white/60 text-xs">
                    Depth does not require embedding every copyrighted translation. This shelf separates honest metadata and
                    Mindvanta study layers from approved reader segments.
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-white/10 bg-black/20 p-3 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-xs uppercase tracking-wider text-violet-300/70 font-medium">Filters</h4>
                {hasActiveFilters && (
                  <button type="button" onClick={clearFilters} className="text-[11px] text-violet-300/90 hover:text-white">
                    Clear filters
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {KASHMIR_FILTER_DIMENSIONS.availability_modes.map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => toggleAvailability(mode)}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      filterAvailability.has(mode)
                        ? 'bg-violet-500 text-white'
                        : 'bg-white/10 text-white/65 hover:bg-white/15'
                    }`}
                  >
                    {AVAILABILITY_MODE_LABELS[mode]}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-[10px] text-white/40 uppercase tracking-wider">Theme</span>
                {catalogFilterThemes.slice(0, 28).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setFilterTag((t) => (t === tag ? null : tag))}
                    className={`rounded-full px-2 py-0.5 text-[10px] capitalize ${
                      filterTag === tag ? 'bg-emerald-500/40 text-emerald-100' : 'bg-white/5 text-white/50'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-[10px] text-white/40 uppercase tracking-wider">Difficulty</span>
                <button
                  type="button"
                  onClick={() => setFilterDifficulty(null)}
                  className={`rounded-full px-2 py-0.5 text-[10px] ${
                    filterDifficulty == null ? 'bg-white/20 text-white' : 'bg-white/5 text-white/50'
                  }`}
                >
                  All
                </button>
                {([1, 2, 3, 4, 5] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setFilterDifficulty((x) => (x === d ? null : d))}
                    className={`rounded-full px-2 py-0.5 text-[10px] ${
                      filterDifficulty === d ? 'bg-white/20 text-white' : 'bg-white/5 text-white/50'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <h4 className="text-xs uppercase tracking-wider text-violet-300/70 font-medium flex items-center gap-2">
              <span>📚</span>
              <span>Approved works</span>
              <span className="text-white/30">({catalogWorksFiltered.length})</span>
            </h4>
            <div className="grid gap-3">
              {catalogWorksFiltered.map((work) => (
                <CatalogWorkCard
                  key={work.id}
                  work={work}
                  sources={sources}
                  onSelect={() => setSelectedWorkSlug(work.slug)}
                  progress={work.legacy_registry_source_id ? progress[work.legacy_registry_source_id] : undefined}
                  verseCount={work.legacy_registry_source_id ? getVerseCount(work.legacy_registry_source_id) : 0}
                />
              ))}
            </div>
          </div>
        )}

        {sortedTraditions.map((tradition) => (
          <div key={tradition} className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-violet-300/70 font-medium flex items-center gap-2">
              <span>{getTraditionIcon(tradition)}</span>
              <span>{getTraditionLabel(tradition)}</span>
              <span className="text-white/30">({sourcesByTradition[tradition].length})</span>
            </h3>

            <div className="grid gap-3">
              {sourcesByTradition[tradition].map((source) => (
                <SourceCard
                  key={source.id}
                  source={source}
                  onSelect={() => {
                    const text = libraryTexts.find((t) => t.registrySourceId === source.id || t.title === source.name);
                    if (text) setSelectedText(text);
                  }}
                  progress={progress[source.id]}
                  actualVerseCount={getVerseCount(source.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4 border-t border-white/10">
        <p className="text-xs text-white/40">
          {sources.reduce((sum, s) => sum + getVerseCount(s.id), 0)} verses loaded • {sources.length} sacred texts (engine)
          · {getApprovedCatalogWorksForSurface('library_card').length} approved catalog works
        </p>
      </div>
    </div>
  );
}

type CatalogWorkCardProps = {
  work: TextWork;
  sources: Source[];
  onSelect: () => void;
  progress?: ReadingProgress;
  verseCount: number;
};

function CatalogWorkCard({ work, sources, onSelect, progress, verseCount }: CatalogWorkCardProps) {
  const legacySourceId = work.legacy_registry_source_id;
  const source = legacySourceId ? sources.find((s) => s.id === legacySourceId) : undefined;
  const progressPercent =
    progress && verseCount > 0 ? Math.round((progress.lastVerseIndex / verseCount) * 100) : 0;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full text-left bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 border border-white/10 transition-all duration-300 group hover:from-white/15 hover:to-white/10 hover:border-white/20"
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl flex-shrink-0">{source?.icon ?? '📜'}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="text-base font-serif text-white group-hover:text-violet-200 transition-colors">
              {work.title_primary}
            </h3>
            <span className="shrink-0 rounded-full border border-violet-400/35 bg-violet-500/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-violet-200/95">
              {AVAILABILITY_MODE_LABELS[work.availability_mode]}
            </span>
            {work.licenseStatus && (
              <span className="shrink-0 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-200/90">
                {getLicenseStatusLabel(work.licenseStatus)}
              </span>
            )}
            {work.renderingLevel && (
              <span className="shrink-0 rounded-full border border-indigo-400/25 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-indigo-200/90">
                {getRenderingLevelLabel(work.renderingLevel)}
              </span>
            )}
          </div>
          <p className="text-xs text-white/50 mb-2 line-clamp-2">{work.summary_short}</p>
          <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] text-white/45">
            <span className="rounded-full bg-white/5 px-2 py-1">{work.tradition}</span>
            <span className="rounded-full bg-white/5 px-2 py-1">{work.approx_date}</span>
            <span className="rounded-full bg-white/5 px-2 py-1">Difficulty {work.difficulty}/5</span>
          </div>
          <div className="flex flex-col gap-0.5 text-xs text-white/40">
            {source ? (
              <span>{formatVerseScopeLine(source, verseCount)}</span>
            ) : (
              <span>Guided study and metadata — no reader bundle linked</span>
            )}
            {progress && progressPercent > 0 && <span className="text-violet-300">{progressPercent}% read</span>}
          </div>
          {progress && progressPercent > 0 && verseCount > 0 && (
            <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}
        </div>
        <div className="flex-shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true">
          <svg className="w-5 h-5 text-white/40 group-hover:text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}

type SourceCardProps = {
  source: Source;
  onSelect: () => void;
  progress?: ReadingProgress;
  actualVerseCount: number;
};

function SourceCard({ source, onSelect, progress, actualVerseCount }: SourceCardProps) {
  const progressPercent = progress ? Math.round((progress.lastVerseIndex / actualVerseCount) * 100) : 0;
  const traditionLabel = isTantricSource(source) ? 'Nondual Tantra' : getTraditionLabel(source.tradition);

  return (
    <button
      onClick={onSelect}
      className="w-full text-left bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 border border-white/10 transition-all duration-300 group hover:from-white/15 hover:to-white/10 hover:border-white/20"
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl flex-shrink-0">{source.icon || '📜'}</div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="text-base font-serif text-white group-hover:text-violet-200 transition-colors truncate">
              {source.name}
            </h3>
            {getContentTierShortLabel(source.contentTier) && (
              <span
                className="shrink-0 rounded-full border border-violet-400/35 bg-violet-500/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-violet-200/95"
                title="How this title is represented in the app"
              >
                {getContentTierShortLabel(source.contentTier)}
              </span>
            )}
          </div>
          {source.subtitle && (
            <p className="text-xs text-white/50 mb-2 line-clamp-2">{source.subtitle}</p>
          )}
          <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] text-white/45">
            <span className="rounded-full bg-white/5 px-2 py-1">{traditionLabel}</span>
            {source.period && <span className="rounded-full bg-white/5 px-2 py-1">{source.period}</span>}
          </div>

          <div className="flex flex-col gap-0.5 text-xs text-white/40">
            <span>{formatVerseScopeLine(source, actualVerseCount)}</span>
            {progress && progressPercent > 0 && (
              <span className="text-violet-300">{progressPercent}% read</span>
            )}
          </div>

          {progress && progressPercent > 0 && (
            <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}
        </div>

        <div className="flex-shrink-0 transition-transform group-hover:translate-x-1">
          <svg className="w-5 h-5 text-white/40 group-hover:text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}

function getTraditionIcon(tradition: string): string {
  const icons: Record<string, string> = {
    Hindu: '🙏',
    Tantric: '🕉️',
    Buddhist: '☸️',
    Taoist: '☯️',
    Zen: '🌀',
    Sufi: '🌹',
    ChristianMystic: '✝️',
    Hermetic: '⚗️',
    Stoic: '🏛️',
  };
  return icons[tradition] || '📜';
}

function getTraditionLabel(tradition: string): string {
  const labels: Record<string, string> = {
    Hindu: 'Hindu Tradition',
    Tantric: 'Tantric Tradition',
    Buddhist: 'Buddhist Tradition',
    Taoist: 'Taoist Tradition',
    Zen: 'Zen Tradition',
    Sufi: 'Sufi Tradition',
    ChristianMystic: 'Christian Mysticism',
    Hermetic: 'Hermetic Tradition',
    Stoic: 'Stoic Tradition',
  };
  return labels[tradition] || tradition;
}
