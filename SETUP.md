# MindVanta - Setup Guide

## Development Setup

1. **Install dependencies:**
   ```bash
   cd daily-vijnana-app
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

## Stability (Avoiding PC Shutdowns)

If your PC shuts down or restarts during development/build, reduce system load with these steps:

1. **Work outside OneDrive:**
   - This repo is currently under a OneDrive path, which can add heavy sync I/O during `npm run dev` and `npm run build`.
   - Prefer moving/cloning the repo to a non-synced path like `C:\Dev\Book of Wisdom`.

2. **Optional Node memory cap (PowerShell):**
   ```powershell
   $env:NODE_OPTIONS="--max-old-space-size=4096"
   npm run dev
   ```
   Use `2048` instead of `4096` if your machine has lower RAM.

3. **Avoid parallel heavy tasks:**
   - Do not run build + screenshot generation + multiple AI/indexing-heavy tasks at the same time.
   - Close other heavy desktop apps while building on lower-end hardware.

## Supabase Setup (AI + Cloud Sync)

1. **Create a Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project

2. **Configure environment variables:**
   Create a `.env.local` file in the root directory:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Deploy Edge Function (`hyper-processor`):**
   ```bash
   npx supabase login
   npx supabase link --project-ref coihujjfdhpqfwmibfbi
   npx supabase functions deploy hyper-processor
   ```

4. **Set Claude API Key as secret:**
   - Go to Supabase Dashboard > Project Settings > Edge Functions > Secrets
   - Add: `CLAUDE_API_KEY` = `your-claude-api-key`

5. **Apply database schema:**
   - Open Supabase SQL Editor and run `supabase-schema.sql`
   - Or use CLI migrations (recommended for repeatable releases)

## Capacitor Setup (for Native Apps)

1. **Install Capacitor:**
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
   npx cap init "Daily Vijnana Wisdom" "com.vijnana.daily"
   ```

2. **Build the web app:**
   ```bash
   npm run build
   ```

3. **Add platforms:**
   ```bash
   npx cap add ios
   npx cap add android
   ```

4. **Sync and open:**
   ```bash
   npx cap sync
   npx cap open ios    # Opens Xcode
   npx cap open android # Opens Android Studio
   ```

## App Store Submission

### iOS (Apple App Store)
1. Apple Developer Account ($99/year)
2. Configure app in App Store Connect
3. Generate screenshots
4. Submit for review

### Android (Google Play Store)
1. Google Developer Account ($25 one-time)
2. Create app listing in Play Console
3. Generate feature graphic
4. Submit for review

## RevenueCat Setup (for Subscriptions)

1. Create RevenueCat account at [revenuecat.com](https://revenuecat.com)
2. Configure products in App Store Connect / Play Console
3. Link products in RevenueCat
4. Add SDK to app (configured in `src/lib/subscription.ts`)





