/**
 * MoodTrends - Weekly timeline, monthly comparison, and mood streak
 *
 * Computes all data from existing JournalEntry array.
 */

import { useMemo } from 'react';
import type { JournalEntry, MoodType } from '@lib/journalStorage';
import { moodInfo } from '@data/journalPrompts';

type MoodTrendsProps = {
  entries: JournalEntry[];
};

// ── Helpers ──────────────────────────────────────────────────────────

function getWeekKey(date: Date): string {
  // ISO week-based key: YYYY-Www
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  const weekNum = 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
  return `${d.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
}

function getMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function getDominantMood(moods: MoodType[]): MoodType | null {
  if (moods.length === 0) return null;
  const counts = new Map<MoodType, number>();
  for (const m of moods) counts.set(m, (counts.get(m) ?? 0) + 1);
  let max: MoodType = moods[0];
  let maxCount = 0;
  for (const [mood, count] of counts) {
    if (count > maxCount) { max = mood; maxCount = count; }
  }
  return max;
}

// Mood → color for bar charts
const MOOD_COLORS: Record<string, string> = {
  peaceful: 'bg-teal-400',
  grateful: 'bg-amber-400',
  inspired: 'bg-violet-400',
  reflective: 'bg-blue-400',
  anxious: 'bg-orange-400',
  sad: 'bg-indigo-400',
  joyful: 'bg-yellow-400',
  neutral: 'bg-slate-400',
};

// ── Component ────────────────────────────────────────────────────────

export function MoodTrends({ entries }: MoodTrendsProps) {
  const { weeklyTimeline, monthComparison, moodStreak } = useMemo(() => {
    // ── Weekly timeline (past 8 weeks) ──
    const now = new Date();
    const weeks: { key: string; moods: MoodType[]; count: number }[] = [];

    // Build week buckets
    const weekMap = new Map<string, MoodType[]>();
    for (const e of entries) {
      const d = new Date(e.date);
      const wk = getWeekKey(d);
      if (!weekMap.has(wk)) weekMap.set(wk, []);
      weekMap.get(wk)!.push(e.mood);
    }

    // Generate last 8 weeks
    for (let i = 7; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i * 7);
      const wk = getWeekKey(d);
      const moods = weekMap.get(wk) ?? [];
      weeks.push({ key: wk, moods, count: moods.length });
    }

    // ── Monthly comparison ──
    const thisMonthKey = getMonthKey(now);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthKey = getMonthKey(lastMonth);

    const thisMonthMoods: Record<string, number> = {};
    const lastMonthMoods: Record<string, number> = {};

    for (const e of entries) {
      const mk = getMonthKey(new Date(e.date));
      if (mk === thisMonthKey) {
        thisMonthMoods[e.mood] = (thisMonthMoods[e.mood] ?? 0) + 1;
      } else if (mk === lastMonthKey) {
        lastMonthMoods[e.mood] = (lastMonthMoods[e.mood] ?? 0) + 1;
      }
    }

    const allMoodsSet = new Set([...Object.keys(thisMonthMoods), ...Object.keys(lastMonthMoods)]);
    const monthComparison = Array.from(allMoodsSet).map(mood => ({
      mood: mood as MoodType,
      thisMonth: thisMonthMoods[mood] ?? 0,
      lastMonth: lastMonthMoods[mood] ?? 0,
    })).sort((a, b) => b.thisMonth - a.thisMonth);

    // ── Mood streak ──
    const sorted = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    let moodStreak: { mood: MoodType; days: number } | null = null;
    if (sorted.length >= 2) {
      const firstMood = sorted[0].mood;
      let count = 1;
      for (let i = 1; i < sorted.length; i++) {
        if (sorted[i].mood === firstMood) count++;
        else break;
      }
      if (count >= 2) {
        moodStreak = { mood: firstMood, days: count };
      }
    }

    return {
      weeklyTimeline: weeks,
      monthComparison,
      moodStreak,
    };
  }, [entries]);

  const maxWeeklyCount = Math.max(...weeklyTimeline.map(w => w.count), 1);

  return (
    <div className="space-y-5">
      {/* Weekly Timeline */}
      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
        <h3 className="text-white font-medium mb-4 flex items-center gap-2">
          <span>📊</span>
          <span>Weekly Mood Timeline</span>
        </h3>

        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {weeklyTimeline.map(week => {
            const dominant = getDominantMood(week.moods);
            const info = dominant ? moodInfo[dominant] : null;
            const barHeight = week.count > 0 ? Math.max(20, (week.count / maxWeeklyCount) * 80) : 4;

            return (
              <div key={week.key} className="flex flex-col items-center gap-1.5 min-w-[40px]">
                {/* Mood emoji */}
                <span className="text-base">{info?.icon ?? '·'}</span>
                {/* Bar */}
                <div className="w-6 bg-white/5 rounded-full flex flex-col-reverse" style={{ height: 80 }}>
                  <div
                    className={`w-full rounded-full transition-all ${
                      dominant ? (MOOD_COLORS[dominant] ?? 'bg-white/30') : 'bg-white/10'
                    }`}
                    style={{ height: barHeight }}
                  />
                </div>
                {/* Count */}
                <span className="text-[10px] text-white/30">{week.count || '-'}</span>
              </div>
            );
          })}
        </div>
        <p className="text-[10px] text-white/20 text-center mt-2">Past 8 weeks</p>
      </div>

      {/* Monthly Comparison */}
      {monthComparison.length > 0 && (
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
          <h3 className="text-white font-medium mb-4 flex items-center gap-2">
            <span>📅</span>
            <span>This Month vs Last Month</span>
          </h3>

          <div className="space-y-2.5">
            {monthComparison.map(({ mood, thisMonth, lastMonth }) => {
              const info = moodInfo[mood];
              if (!info) return null;
              const diff = thisMonth - lastMonth;
              const arrow = diff > 0 ? '↑' : diff < 0 ? '↓' : '→';
              const arrowColor = diff > 0 ? 'text-emerald-400' : diff < 0 ? 'text-red-400' : 'text-white/40';

              return (
                <div key={mood} className="flex items-center gap-2 text-sm">
                  <span>{info.icon}</span>
                  <span className="text-white/70 flex-1">{info.label}</span>
                  <span className="text-white/40 text-xs w-8 text-right">{lastMonth}</span>
                  <span className={`text-sm font-medium w-4 text-center ${arrowColor}`}>{arrow}</span>
                  <span className="text-white text-xs w-8">{thisMonth}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mood Streak */}
      {moodStreak && (
        <div className="bg-gradient-to-r from-violet-500/15 to-purple-500/15 rounded-xl p-4 border border-violet-400/20 text-center">
          <p className="text-sm text-white/80">
            You've been feeling{' '}
            <span className="font-medium text-white">
              {moodInfo[moodStreak.mood]?.icon} {moodInfo[moodStreak.mood]?.label?.toLowerCase()}
            </span>{' '}
            for{' '}
            <span className="font-medium text-white">{moodStreak.days} entries</span>
          </p>
        </div>
      )}
    </div>
  );
}
