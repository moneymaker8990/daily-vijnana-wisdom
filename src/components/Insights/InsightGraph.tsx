import { loadJournalEntries } from '@lib/journalStorage';
import { loadDreams } from '@lib/dreamStorage';
import { getAllCourses } from '@core/study/registry';
import { getCourseCompletionPercent, getCourseProgress } from '@core/study/progress';

type NextActionTab = 'journal' | 'courses' | 'dreams' | 'library';

type InsightGraphProps = {
  onNavigateTab?: (tab: NextActionTab) => void;
};

type DailyPoint = {
  dayKey: string;
  reflections: number;
};

function getRecentDayKeys(days: number): string[] {
  const keys: string[] = [];
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    keys.push(d.toISOString().split('T')[0]);
  }
  return keys;
}

function buildDailyReflectionSeries(): DailyPoint[] {
  const dayKeys = getRecentDayKeys(14);
  const map = new Map<string, number>();
  dayKeys.forEach((k) => map.set(k, 0));

  for (const entry of loadJournalEntries()) {
    const key = entry.date.split('T')[0];
    if (map.has(key)) map.set(key, (map.get(key) ?? 0) + 1);
  }

  for (const dream of loadDreams()) {
    const key = dream.date.split('T')[0];
    if (map.has(key)) map.set(key, (map.get(key) ?? 0) + 1);
  }

  return dayKeys.map((k) => ({ dayKey: k, reflections: map.get(k) ?? 0 }));
}

function getTopJournalMood(): string | null {
  const entries = loadJournalEntries();
  if (entries.length === 0) return null;

  const counts = new Map<string, number>();
  for (const entry of entries) {
    counts.set(entry.mood, (counts.get(entry.mood) ?? 0) + 1);
  }

  let topMood: string | null = null;
  let topCount = -1;
  for (const [mood, count] of counts.entries()) {
    if (count > topCount) {
      topMood = mood;
      topCount = count;
    }
  }
  return topMood;
}

function getMostActiveCourse(): { title: string; percent: number } | null {
  const courses = getAllCourses();
  let best: { title: string; percent: number } | null = null;

  for (const course of courses) {
    const progress = getCourseProgress(course.id);
    if (!progress) continue;
    const percent = getCourseCompletionPercent(course.id, course.lessons.length);
    if (!best || percent > best.percent) {
      best = { title: course.title, percent };
    }
  }
  return best;
}

function getNextStep(): { label: string; tab: NextActionTab } {
  const journals = loadJournalEntries().length;
  const dreams = loadDreams().length;
  const activeCourse = getMostActiveCourse();

  if (journals === 0) {
    return {
      label: 'When it feels right, a few lines in the journal can deepen the day—entirely optional.',
      tab: 'journal',
    };
  }
  if (activeCourse && activeCourse.percent < 100) {
    return {
      label: `You might pick up where you left off in “${activeCourse.title}.”`,
      tab: 'courses',
    };
  }
  if (journals >= 3 && dreams < 2) {
    return {
      label: 'If dreams have been visiting you, capturing one can be a quiet companion to the texts.',
      tab: 'dreams',
    };
  }
  return {
    label: 'The sacred library is there whenever you want to save a passage for another moment.',
    tab: 'library',
  };
}

function actionLabelForTab(tab: NextActionTab): string {
  switch (tab) {
    case 'journal':
      return 'Open journal';
    case 'courses':
      return 'Open study';
    case 'dreams':
      return 'Open dreams';
    case 'library':
      return 'Open library';
  }
}

export function InsightGraph({ onNavigateTab }: InsightGraphProps) {
  const series = buildDailyReflectionSeries();
  const totalReflections = series.reduce((sum, point) => sum + point.reflections, 0);
  const hasReflectionActivity = totalReflections > 0;
  const maxValue = hasReflectionActivity ? Math.max(...series.map((s) => s.reflections), 1) : 0;
  const topMood = getTopJournalMood();
  const course = getMostActiveCourse();
  const nextStep = getNextStep();

  return (
    <section className="bg-gradient-to-br from-white/[0.07] to-white/[0.03] rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/[0.08]">
      <h3 className="text-[10px] sm:text-xs font-medium text-white/50 uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3">
        Your recent notes
      </h3>

      {hasReflectionActivity ? (
        <div className="mb-4">
          <div className="flex items-end gap-1.5 h-20">
            {series.map((point) => {
              const pct =
                maxValue > 0 && point.reflections > 0
                  ? (point.reflections / maxValue) * 100
                  : 0;
              return (
                <div key={point.dayKey} className="flex-1 flex items-end min-h-[2px]">
                  <div
                    className="w-full rounded-sm bg-violet-400/35 hover:bg-violet-300/45 transition-colors"
                    style={{ height: `${pct}%` }}
                    title={`${point.dayKey}: ${point.reflections} reflections`}
                  />
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-[11px] text-white/45">
            Last fourteen days: {totalReflections} journal or dream note{totalReflections === 1 ? '' : 's'}
          </p>
        </div>
      ) : (
        <p className="text-sm text-white/55 leading-relaxed mb-4">
          No journal or dream notes in the last two weeks. That is fine—writing is optional, whenever it feels
          called for.
        </p>
      )}

      <div className="grid gap-2 text-xs text-white/65 mb-4">
        <div className="bg-white/[0.04] rounded-lg px-3 py-2 border border-white/[0.06]">
          A mood that often shows up in your journal:{' '}
          {topMood ? (
            <span className="text-white/85 capitalize">{topMood}</span>
          ) : (
            <span className="text-white/85">As you write, a pattern may emerge in its own time.</span>
          )}
        </div>
        <div className="bg-white/[0.04] rounded-lg px-3 py-2 border border-white/[0.06]">
          Study you have open:{' '}
          <span className="text-white/85">
            {course ? `“${course.title}” — about ${course.percent}% along` : 'No path opened yet—you can begin whenever you like.'}
          </span>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
        <p className="text-[11px] text-white/50 mb-2">Open when ready</p>
        <p className="text-sm text-white/80 mb-3 leading-relaxed">{nextStep.label}</p>
        {onNavigateTab && (
          <button
            type="button"
            onClick={() => onNavigateTab(nextStep.tab)}
            className="text-xs px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-white/90 border border-white/15 transition-colors"
          >
            {actionLabelForTab(nextStep.tab)}
          </button>
        )}
      </div>
    </section>
  );
}
