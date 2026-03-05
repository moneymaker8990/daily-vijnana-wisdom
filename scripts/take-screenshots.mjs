/**
 * App Store Screenshot Generator
 *
 * Seeds localStorage with realistic mock data, then captures 6 key screens
 * at 3 device sizes (iPhone 6.7", iPhone 6.5", Android) — 18 screenshots total.
 *
 * Usage:
 *   node scripts/take-screenshots.mjs [--url https://mindvanta.io] [--platform ios|android|all] [--clean]
 *
 * Prerequisites:
 *   npm i -D @playwright/test && npx playwright install chromium
 */

import { chromium } from '@playwright/test';
import { mkdirSync, rmSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_BASE_DIR = resolve(__dirname, '..', 'store-assets', 'screenshots');

// Allow overriding the URL via --url flag
const urlFlagIndex = process.argv.indexOf('--url');
const APP_URL = urlFlagIndex !== -1 ? process.argv[urlFlagIndex + 1] : 'https://mindvanta.io';
const platformFlagIndex = process.argv.indexOf('--platform');
const PLATFORM = platformFlagIndex !== -1 ? process.argv[platformFlagIndex + 1] : 'all';
const CLEAN_OUTPUT = process.argv.includes('--clean');

// ---------------------------------------------------------------------------
// Device definitions
// ---------------------------------------------------------------------------
const DEVICES = [
  { name: 'iphone-6.7', platform: 'ios', viewport: { width: 430, height: 932 }, scale: 3 },
  { name: 'iphone-6.5', platform: 'ios', viewport: { width: 414, height: 896 }, scale: 3 },
  { name: 'android-phone', platform: 'android', viewport: { width: 412, height: 915 }, scale: 2.625 },
];

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------
const today = new Date();
const todayISO = today.toISOString();
const todayDate = today.toISOString().split('T')[0];

function daysAgo(n) {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d;
}

const MOCK_DATA = {
  mindvanta_onboarding_complete: 'true',

  mindvanta_user_state: JSON.stringify({
    currentDay: 42,
    lastVisited: todayISO,
  }),

  mindvanta_streak_data: JSON.stringify({
    current: 7,
    longest: 14,
    totalDays: 42,
    lastVisit: todayDate,
  }),

  mindvanta_text_size: 'medium',

  mindvanta_shown_milestones: JSON.stringify([3, 7, 14, 30]),

  mindvanta_dreams: JSON.stringify([
    {
      id: 'dream-1',
      date: daysAgo(1).toISOString().split('T')[0],
      title: 'The Infinite Library',
      content: 'I wandered through an endless library where every book contained a different version of my life. The shelves stretched upward into golden light. A wise old librarian handed me a blank book and said, "This is the one that matters." I opened it and saw my own handwriting filling the pages as I watched.',
      mood: 'mysterious',
      symbols: ['library', 'books', 'light'],
      tags: ['lucid', 'wisdom'],
      interpretation: {
        summary: 'This dream reflects a deep encounter with your inner wisdom and the multiplicity of potential within you. The infinite library symbolizes the vast repository of your unconscious mind — every unlived possibility, every road not taken.',
        symbols: [
          { symbol: 'Library', meaning: 'The unconscious mind and accumulated wisdom — a space of infinite knowledge waiting to be explored.' },
          { symbol: 'Blank Book', meaning: 'Your unwritten future and creative potential. The power of conscious choice in shaping your life narrative.' },
          { symbol: 'Golden Light', meaning: 'Higher consciousness and spiritual illumination reaching down into the realm of knowledge.' },
        ],
        psychologicalInsight: 'The dream suggests you are at a crossroads where past patterns (the written books) are giving way to conscious authorship of your life. The librarian — your inner sage — affirms that presence and intention matter more than predetermined paths.',
        spiritualConnection: 'This mirrors the Tantric teaching that consciousness is the author of all experience. Like Verse 42 of the Vijnana Bhairava Tantra: "Wherever the mind goes, there is the supreme state." Your dream library is a map of awareness itself.',
        actionSuggestion: 'Begin a morning journaling practice. Write freely for 10 minutes upon waking, letting the "blank book" of your dream continue to fill with your authentic voice.',
        generatedAt: daysAgo(1).toISOString(),
      },
      createdAt: daysAgo(1).toISOString(),
      updatedAt: daysAgo(1).toISOString(),
    },
    {
      id: 'dream-2',
      date: daysAgo(3).toISOString().split('T')[0],
      title: 'Ocean of Stars',
      content: 'I was swimming in an ocean that reflected the night sky perfectly — I couldn\'t tell where the water ended and space began. Each stroke sent ripples through the constellations. I felt completely at peace, like breathing for the first time.',
      mood: 'peaceful',
      symbols: ['ocean', 'stars', 'swimming'],
      tags: ['peaceful', 'nature'],
      createdAt: daysAgo(3).toISOString(),
      updatedAt: daysAgo(3).toISOString(),
    },
    {
      id: 'dream-3',
      date: daysAgo(5).toISOString().split('T')[0],
      title: 'The Mountain Path',
      content: 'I was hiking a mountain trail in thick fog. Each step revealed just enough path ahead. Other hikers appeared and disappeared in the mist. At the summit the fog parted and I could see a thousand mountains stretching to the horizon, each peak glowing with soft light.',
      mood: 'joyful',
      symbols: ['mountain', 'fog', 'path'],
      tags: ['adventure', 'clarity'],
      createdAt: daysAgo(5).toISOString(),
      updatedAt: daysAgo(5).toISOString(),
    },
  ]),

  mindvanta_journal: JSON.stringify([
    {
      id: 'journal-1',
      date: todayDate,
      title: 'Morning stillness',
      content: 'Sat with the sunrise today. Twenty minutes of silence before the world woke up. The quality of attention felt different — less grasping, more receiving. I noticed how the light changed moment to moment, and how my breath naturally deepened without effort.',
      gratitudes: ['The quiet hour before dawn', 'A warm cup of tea', 'This practice of showing up'],
      mood: 'peaceful',
      moodIntensity: 4,
      tags: ['meditation', 'morning'],
      isPrivate: false,
      wordCount: 68,
      createdAt: todayISO,
      updatedAt: todayISO,
    },
    {
      id: 'journal-2',
      date: daysAgo(1).toISOString().split('T')[0],
      title: 'Verse 12 resonated deeply',
      content: 'Today\'s passage from the Vijnana Bhairava Tantra struck me: "At the point of sleep, when sleep has not yet come and wakefulness vanishes, at this point Being is revealed." I\'ve been noticing that liminal space before sleep. There\'s a vastness there.',
      gratitudes: ['Ancient wisdom still alive', 'The liminal space', 'My growing awareness'],
      mood: 'inspired',
      moodIntensity: 5,
      tags: ['tantra', 'insight'],
      isPrivate: false,
      wordCount: 64,
      createdAt: daysAgo(1).toISOString(),
      updatedAt: daysAgo(1).toISOString(),
    },
    {
      id: 'journal-3',
      date: daysAgo(3).toISOString().split('T')[0],
      title: 'Walked in the rain',
      content: 'Took a long walk in the rain today without an umbrella. Everything felt cleansed. I thought about the Tao Te Ching — water that flows around obstacles. My mind felt the same way: thoughts arose and dissolved without sticking.',
      gratitudes: ['Rain on my face', 'Healthy legs to walk', 'Letting go of control'],
      mood: 'reflective',
      moodIntensity: 3,
      tags: ['nature', 'taoism'],
      isPrivate: false,
      wordCount: 55,
      createdAt: daysAgo(3).toISOString(),
      updatedAt: daysAgo(3).toISOString(),
    },
    {
      id: 'journal-4',
      date: daysAgo(6).toISOString().split('T')[0],
      title: 'Difficult day, but present',
      content: 'Anxiety surfaced this morning — old patterns. But I sat with it instead of running. The Gita verse about equanimity came to mind. Not pushing away, not grasping. Just witnessing. By evening the storm had passed and I felt grateful for the practice.',
      gratitudes: ['The courage to sit with discomfort', 'Evening peace', 'This journey'],
      mood: 'grateful',
      moodIntensity: 4,
      tags: ['challenge', 'growth'],
      isPrivate: false,
      wordCount: 58,
      createdAt: daysAgo(6).toISOString(),
      updatedAt: daysAgo(6).toISOString(),
    },
  ]),

  mindvanta_journal_stats: JSON.stringify({
    totalEntries: 38,
    currentStreak: 7,
    longestStreak: 14,
    totalWords: 2847,
    avgWordsPerEntry: 75,
    moodDistribution: {
      peaceful: 12,
      grateful: 8,
      inspired: 7,
      reflective: 5,
      anxious: 2,
      sad: 1,
      joyful: 2,
      neutral: 1,
    },
    mostUsedTags: [
      { tag: 'meditation', count: 15 },
      { tag: 'insight', count: 9 },
      { tag: 'nature', count: 7 },
    ],
    entriesByMonth: {
      '2026-01': 14,
      '2026-02': 24,
    },
    journalingDays: Array.from({ length: 7 }, (_, i) =>
      daysAgo(i).toISOString().split('T')[0]
    ),
  }),

  mindvanta_favorites: JSON.stringify([
    {
      id: 'fav-1',
      dayNumber: 12,
      title: 'Verse 12 — Gateway of Sleep',
      text: 'At the point of sleep, when sleep has not yet come and wakefulness vanishes, at this point Being is revealed.',
      source: 'Vijnana Bhairava Tantra',
      savedAt: daysAgo(5).getTime(),
    },
    {
      id: 'fav-2',
      dayNumber: 28,
      title: 'Chapter 2, Verse 47',
      text: 'You have the right to work, but never to the fruit of work. You should never engage in action for the sake of reward.',
      source: 'Bhagavad Gita',
      savedAt: daysAgo(10).getTime(),
    },
    {
      id: 'fav-3',
      dayNumber: 7,
      title: 'Verse 8 — The Way',
      text: 'The highest good is like water. Water gives life to the ten thousand things and does not strive.',
      source: 'Tao Te Ching',
      savedAt: daysAgo(15).getTime(),
    },
  ]),

  mindvanta_study_progress: JSON.stringify([]),

  mindvanta_reading_progress: JSON.stringify({
    'vijnana-bhairava-tantra': {
      sourceId: 'vijnana-bhairava-tantra',
      lastVerseId: 'vbt-12',
      lastVerseIndex: 11,
      chapter: 1,
      verseNumber: 12,
      lastRead: daysAgo(1).toISOString(),
      bookmarkedVerses: ['vbt-1', 'vbt-12'],
      completedVerses: Array.from({ length: 12 }, (_, i) => `vbt-${i + 1}`),
    },
    'tao-te-ching': {
      sourceId: 'tao-te-ching',
      lastVerseId: 'tao-8',
      lastVerseIndex: 7,
      chapter: 1,
      verseNumber: 8,
      lastRead: daysAgo(3).toISOString(),
      bookmarkedVerses: ['tao-1', 'tao-8'],
      completedVerses: Array.from({ length: 8 }, (_, i) => `tao-${i + 1}`),
    },
  }),
};

// ---------------------------------------------------------------------------
// Screenshot capture definitions
// ---------------------------------------------------------------------------

/**
 * Each screenshot defines:
 *   - name: filename suffix
 *   - capture: async function that navigates & waits, then returns (screenshots are taken after)
 */
const SCREENSHOTS = [
  {
    name: '01-daily-view',
    capture: async (page) => {
      // Click the "Today" tab
      await page.locator('nav button:has-text("Today")').click();
      // Wait for wisdom card content to render
      await page.waitForTimeout(2000);
    },
  },
  {
    name: '02-meditation-timer',
    capture: async (page) => {
      // The meditation button is a fixed floating button with 🧘 emoji
      const meditationBtn = page.locator('button:has-text("🧘")');
      await meditationBtn.waitFor({ state: 'visible', timeout: 5000 });
      await meditationBtn.click();
      // Wait for meditation screen to render
      await page.waitForTimeout(1500);
    },
  },
  {
    name: '03-sacred-library',
    capture: async (page) => {
      // Close meditation if open (press Escape)
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
      // Click the "Library" tab
      await page.locator('nav button:has-text("Library")').click();
      await page.waitForTimeout(2000);
    },
  },
  {
    name: '04-text-reader',
    capture: async (page) => {
      // From library, click into Vijnana Bhairava Tantra
      const textCard = page.locator('button:has-text("Vijnana Bhairava Tantra")').first();
      await textCard.waitFor({ state: 'visible', timeout: 5000 });
      await textCard.click();
      // Wait for text reader to load
      await page.waitForTimeout(2000);
    },
  },
  {
    name: '05-dream-journal',
    capture: async (page) => {
      // Go back from text reader if we're in it — look for back button
      const backBtn = page.locator('button:has-text("Back"), button:has-text("Library")').first();
      if (await backBtn.isVisible().catch(() => false)) {
        await backBtn.click();
        await page.waitForTimeout(500);
      }
      // Click the "Dreams" tab
      await page.locator('nav button:has-text("Dreams")').click();
      await page.waitForTimeout(2000);
    },
  },
  {
    name: '06-dream-interpretation',
    capture: async (page) => {
      // Click the first dream (which has an interpretation — "The Infinite Library")
      const dreamCard = page.locator('button:has-text("The Infinite Library")').first();
      await dreamCard.waitFor({ state: 'visible', timeout: 5000 });
      await dreamCard.click();
      await page.waitForTimeout(1000);
      // Click "View Interpretation" button
      const interpretBtn = page.locator('button:has-text("View Interpretation")');
      await interpretBtn.waitFor({ state: 'visible', timeout: 5000 });
      await interpretBtn.click();
      await page.waitForTimeout(1500);
    },
  },
];

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  if (!['all', 'ios', 'android'].includes(PLATFORM)) {
    throw new Error(`Invalid --platform value "${PLATFORM}". Use one of: all, ios, android`);
  }

  const outputRoot = PLATFORM === 'all' ? OUTPUT_BASE_DIR : resolve(OUTPUT_BASE_DIR, PLATFORM);
  if (CLEAN_OUTPUT) {
    rmSync(outputRoot, { recursive: true, force: true });
  }
  mkdirSync(resolve(OUTPUT_BASE_DIR, 'ios'), { recursive: true });
  mkdirSync(resolve(OUTPUT_BASE_DIR, 'android'), { recursive: true });

  const devices = PLATFORM === 'all' ? DEVICES : DEVICES.filter((d) => d.platform === PLATFORM);

  console.log(`Capturing screenshots from: ${APP_URL}`);
  console.log(`Platform: ${PLATFORM}`);
  console.log(`Output directory: ${outputRoot}\n`);

  const browser = await chromium.launch();
  let totalCaptured = 0;

  for (const device of devices) {
    console.log(`\n--- ${device.name} (${device.viewport.width}x${device.viewport.height} @${device.scale}x) ---`);

    const context = await browser.newContext({
      viewport: device.viewport,
      deviceScaleFactor: device.scale,
      isMobile: true,
      hasTouch: true,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    });

    const page = await context.newPage();

    // Navigate to app and seed localStorage
    await page.goto(APP_URL, { waitUntil: 'domcontentloaded' });

    // Seed localStorage with mock data
    await page.evaluate((data) => {
      for (const [key, value] of Object.entries(data)) {
        localStorage.setItem(key, value);
      }
    }, MOCK_DATA);

    // Reload so the app reads the seeded data
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Capture each screenshot
    for (const screenshot of SCREENSHOTS) {
      const filename = `${screenshot.name}.png`;
      const filepath = resolve(OUTPUT_BASE_DIR, device.platform, `${device.name}_${filename}`);

      try {
        await screenshot.capture(page);
        await page.screenshot({ path: filepath, fullPage: false });
        console.log(`  ✓ ${filename}`);
        totalCaptured++;
      } catch (err) {
        console.error(`  ✗ ${filename}: ${err.message}`);
      }
    }

    await context.close();
  }

  await browser.close();

  console.log(`\nDone! ${totalCaptured}/${devices.length * SCREENSHOTS.length} screenshots saved to:`);
  console.log(`  ${outputRoot}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
