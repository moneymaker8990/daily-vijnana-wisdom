import { loadJournalEntries } from '@lib/journalStorage';
import { loadDreams } from '@lib/dreamStorage';
import { getStreakData } from '@lib/streakTracker';
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
  const streak = getStreakData().current;
  const journals = loadJournalEntries().length;
  const dreams = loadDreams().length;
  const activeCourse = getMostActiveCourse();

  if (streak < 3) {
    return { label: 'Write a short journal reflection to build your streak.', tab: 'journal' };
  }
  if (activeCourse && activeCourse.percent < 100) {
    return { label: `Continue "${activeCourse.title}" to keep your momentum.`, tab: 'courses' };
  }
  if (journals >= 3 && dreams < 2) {
    return { label: 'Record your next dream and look for recurring themes.', tab: 'dreams' };
  }
  return { label: 'Open the sacred library and save one passage for tomorrow.', tab: 'library' };
}

export function InsightGraph({ onNavigateTab }: InsightGraphProps) {
  const series = buildDailyReflectionSeries();
  const maxValue = Math.max(...series.map((s) => s.reflections), 1);
  const totalReflections = series.reduce((sum, point) => sum + point.reflections, 0);
  const topMood = getTopJournalMood();
  const course = getMostActiveCourse();
  const nextStep = getNextStep();

  return (
    <section className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/12">
      <h3 className="text-[10px] sm:text-xs font-medium text-white/50 uppercase tracking-[0.2em] mb-3">
        Insight Graph v1
      </h3>

      <div className="mb-4">
        <div className="flex items-end gap-1.5 h-20">
          {series.map((point) => (
            <div key={point.dayKey} className="flex-1 flex items-end">
              <div
                className="w-full rounded-sm bg-violet-400/60 hover:bg-violet-300/70 transition-colors"
                style={{ height: `${Math.max(6, (point.reflections / maxValue) * 100)}%` }}
                title={`${point.dayKey}: ${point.reflections} reflections`}
              />
            </div>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-white/45">Last 14 days: {totalReflections} journal/dream reflections</p>
      </div>

      <div className="grid gap-2 text-xs text-white/70 mb-4">
        <div className="bg-white/5 rounded-lg px-3 py-2 border border-white/5">
          Top journal mood: <span className="text-white/90 capitalize">{topMood ?? 'Not enough data yet'}</span>
        </div>
        <div className="bg-white/5 rounded-lg px-3 py-2 border border-white/5">
          Study momentum:{' '}
          <span className="text-white/90">
            {course ? `${course.title} (${course.percent}%)` : 'No course started yet'}
          </span>
        </div>
      </div>

      <div className="rounded-lg border border-violet-400/25 bg-violet-500/10 p-3">
        <p className="text-xs text-violet-200/90 mb-2">Next best step</p>
        <p className="text-sm text-white/85 mb-3">{nextStep.label}</p>
        {onNavigateTab && (
          <button
            onClick={() => onNavigateTab(nextStep.tab)}
            className="text-xs px-3 py-1.5 rounded-md bg-violet-500 hover:bg-violet-400 text-white transition-colors"
          >
            Go to next step
          </button>
        )}
      </div>
    </section>
  );
}
