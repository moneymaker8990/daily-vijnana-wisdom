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

3. **Deploy Edge Functions:**
   ```bash
   npx supabase login
   npx supabase link --project-ref coihujjfdhpqfwmibfbi
   npx supabase functions deploy hyper-processor
   npx supabase functions deploy stripe-checkout
   npx supabase functions deploy stripe-webhook
   npx supabase functions deploy check-entitlement
   ```

4. **Set Edge Function secrets** — see [docs/EDGE_FUNCTION_SECRETS.md](./docs/EDGE_FUNCTION_SECRETS.md) for the full list (CLAUDE_API_KEY, ALLOWED_ORIGIN, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_ID_MONTHLY, APP_BASE_URL, SUPABASE_SERVICE_ROLE_KEY).

5. **Apply database schema:**
   - Open Supabase SQL Editor and run `supabase-schema.sql`
   - Or use CLI migrations (recommended for repeatable releases)

## Capacitor Setup (for Native Apps)

The `ios/` and `android/` folders are already checked in; you do **not** need to re-init Capacitor. App identity is already set:

- `appId`: `app.mindvanta.main`
- `appName`: `MindVanta`
- iOS bundle identifier: `app.mindvanta.main`
- Android applicationId: `com.mindvanta.app` (see [docs/NATIVE_RELEASE.md](./docs/NATIVE_RELEASE.md) for the one-time bundle-ID reconciliation decision)

Typical flow:

```bash
npm run build
npm run sync-versions          # sync package.json version into native projects
npm run sync-versions -- --bump-build   # also bump native build numbers
npx cap sync
npx cap open ios               # Opens Xcode
npx cap open android           # Opens Android Studio
```

For the full signed-release flow see [docs/NATIVE_RELEASE.md](./docs/NATIVE_RELEASE.md).

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





