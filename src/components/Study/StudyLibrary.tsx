import { useState, useEffect } from 'react';
import { getAllSources, getVerseCount } from '@core/library/engine';
import { getAllLibraryTexts } from '@core/library/adapter';
import type { Source } from '@core/library/types';
import type { LibraryText } from '@data/library/types';
import { TextReader } from './TextReader';
import { getReadingProgress, type ReadingProgress } from '@lib/readingProgress';

type StudyLibraryProps = {
  onOpenNondualTantraPath?: () => void;
};

/** Normalize any edge cases so Nondual Tantra UX always attaches to Kashmir-lineage sources. */
function isTantricSource(source: Source): boolean {
  return source.tradition.trim() === 'Tantric';
}

/** Stable browse order for the Nondual Tantra shelf (flagship → core sūtras → selections → study themes). */
const NONDUAL_TEXT_ORDER: string[] = [
  'vijnana-bhairava-tantra',
  'shiva-sutras',
  'spanda-karika',
  'pratyabhijnahridayam',
  'tantraloka-selections',
  'paramarthasara-selections',
];

function nondualSectionSort(a: Source, b: Source): number {
  const ia = NONDUAL_TEXT_ORDER.indexOf(a.id);
  const ib = NONDUAL_TEXT_ORDER.indexOf(b.id);
  const ra = ia === -1 ? 1000 : ia;
  const rb = ib === -1 ? 1000 : ib;
  if (ra !== rb) return ra - rb;
  return a.name.localeCompare(b.name);
}

function sourceMatchesSearch(source: Source, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  const haystack = [
    source.name,
    source.description,
    source.tradition,
    source.subtitle ?? '',
    ...(source.searchKeywords ?? []),
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(q);
}

export function StudyLibrary({ onOpenNondualTantraPath }: StudyLibraryProps) {
  const [selectedText, setSelectedText] = useState<LibraryText | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sources, setSources] = useState<Source[]>([]);
  const [libraryTexts, setLibraryTexts] = useState<LibraryText[]>([]);
  const [progress, setProgress] = useState<Record<string, ReadingProgress>>({});
  const [nondualIntroOpen, setNondualIntroOpen] = useState(false);

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

  const handleSelectText = (source: Source) => {
    const text = libraryTexts.find((t) => t.registrySourceId === source.id || t.title === source.name);
    if (text) {
      setSelectedText(text);
    }
  };

  const getInitialVerse = (sourceId: string): number => {
    const p = progress[sourceId];
    if (p?.lastVerseIndex !== undefined) {
      return p.lastVerseIndex;
    }
    return 0;
  };

  if (selectedText) {
    const source = sources.find((s) => s.id === selectedText.registrySourceId || s.name === selectedText.title);
    const initialVerse = source ? getInitialVerse(source.id) : 0;

    return (
      <TextReader text={selectedText} onBack={() => setSelectedText(null)} initialVerse={initialVerse} />
    );
  }

  const filteredSources = sources.filter((source) => sourceMatchesSearch(source, searchQuery));

  const tantricSources = filteredSources.filter(isTantricSource).sort(nondualSectionSort);
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

  return (
    <div className="space-y-6">
      <div className="text-center pb-4 border-b border-white/10">
        <p className="text-sm text-white/60">
          Browse complete texts by tradition, period, and reading progress
        </p>
      </div>

      <div className="relative" role="search">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search texts, traditions, themes..."
          aria-label="Search texts, traditions, and themes"
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
        {tantricSources.length > 0 && (
          <div key="nondual-tantra" className="space-y-3">
            <div className="rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-500/15 to-indigo-500/10 p-5 md:p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">
                  🕉️
                </span>
                <div className="min-w-0 flex-1 space-y-2">
                  <h3 className="text-lg md:text-xl font-serif text-white tracking-tight">Nondual Tantra</h3>
                  <p className="text-sm text-violet-200/85 leading-relaxed">
                    Kashmir Shaivism, Trika, Recognition, and the Practice of Awareness
                  </p>
                  <p className="text-xs text-white/50 leading-relaxed max-w-2xl mx-auto md:mx-0">
                    Here, &quot;tantra&quot; does not mean pop-culture sexual tantra. This library focuses on contemplative
                    nondual Shaiva Tantra: study of the texts and gentle meditative integration in daily life.
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
                      Seven modules: what tantra means here, Śiva and Śakti, the body and energy, the three upāyas,
                      recognition, spanda, and working with the Vijñāna Bhairava—with reflection and timed practices.
                    </p>
                    <ol className="list-decimal list-inside text-xs text-white/50 space-y-1 pt-1">
                      <li>What Tantra Actually Means</li>
                      <li>Śiva and Śakti</li>
                      <li>Awareness, Energy, and the Body</li>
                      <li>The Three Upāyas</li>
                      <li>Recognition: You Are Not Separate</li>
                      <li>Spanda: The Pulse of Consciousness</li>
                      <li>Practice from the Vijñāna Bhairava</li>
                    </ol>
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
                    In this section, <strong className="text-white/90 font-medium">Shiva</strong> names pure awareness — the
                    open field in which experience appears — and <strong className="text-white/90 font-medium">Shakti</strong>{' '}
                    names its dynamic power: energy, creativity, and the pulse of attention itself. The world and body are
                    treated as sacred expression, not obstacles to overcome.
                  </p>
                  <p>
                    Liberation is framed as <strong className="text-white/90 font-medium">recognition</strong> (pratyabhijñā):
                    remembering what was never truly absent. Practice points toward direct perception — resting in awareness
                    while living an ordinary human life — rather than escape or dogma.
                  </p>
                  <p className="text-white/60 text-xs">
                    Use the texts for study; use the guided path and practices for slow integration. Nothing here replaces
                    qualified human teaching where that is appropriate.
                  </p>
                  {onOpenNondualTantraPath && (
                    <button
                      type="button"
                      onClick={onOpenNondualTantraPath}
                      className="mt-2 w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-sm font-medium shadow-lg shadow-violet-500/20 hover:from-violet-400 hover:to-indigo-400 transition-all"
                    >
                      Open guided path: Entering Nondual Tantra
                    </button>
                  )}
                </div>
              )}
            </div>
            <h4 className="text-xs uppercase tracking-wider text-violet-300/70 font-medium flex items-center gap-2">
              <span>📚</span>
              <span>Texts in this section</span>
              <span className="text-white/30">({tantricSources.length})</span>
            </h4>
            <div className="grid gap-3">
              {tantricSources.map((source) => (
                <SourceCard
                  key={source.id}
                  source={source}
                  onSelect={() => handleSelectText(source)}
                  progress={progress[source.id]}
                  actualVerseCount={getVerseCount(source.id)}
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
                  onSelect={() => handleSelectText(source)}
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
          {sources.reduce((sum, s) => sum + getVerseCount(s.id), 0)} verses loaded • {sources.length} sacred texts
        </p>
      </div>
    </div>
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
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-serif text-white group-hover:text-violet-200 transition-colors truncate">
              {source.name}
            </h3>
          </div>
          {source.subtitle && (
            <p className="text-xs text-white/50 mb-2 line-clamp-2">{source.subtitle}</p>
          )}
          <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] text-white/45">
            <span className="rounded-full bg-white/5 px-2 py-1">{traditionLabel}</span>
            {source.period && <span className="rounded-full bg-white/5 px-2 py-1">{source.period}</span>}
          </div>

          <div className="flex items-center gap-3 text-xs text-white/40">
            <span>{actualVerseCount} verses</span>
            {progress && progressPercent > 0 && (
              <>
                <span className="text-white/20">•</span>
                <span className="text-violet-300">{progressPercent}% read</span>
              </>
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
