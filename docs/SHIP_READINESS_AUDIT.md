# Ship Readiness Audit (April 12, 2026)

This audit translates "finish line" work into concrete go-live gates for AI reliability, payments, and security.

## 1) AI Connectivity

### Current architecture
- Client calls `supabase/functions/v1/hyper-processor` for spiritual guide, explain, dream interpretation, and voice reflection.
- Edge Function proxies requests to Claude using `CLAUDE_API_KEY` server secret.

### Required to ship
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` set in deploy environment.
- Supabase function deployed and healthy (`type: "health-check"` request returns `{ status: "ok" }`).
- `CLAUDE_API_KEY` configured in Supabase Edge Function secrets.

### Hardening added
- Input validation now enforces required string payloads with max length limits.
- CORS is configurable via `ALLOWED_ORIGIN` secret (fallback `*` for development).
- Non-POST/OPTIONS methods now rejected with 405.

## 2) Payment Structure

### Current architecture
- **Native (iOS / Android)**: `revenuecat` — App Store / Play Store subscriptions through RevenueCat (`src/lib/subscription.ts`). Production builds always use this path; scaffold is blocked in production.
- **Web (PWA / Vercel)**: `stripe` — Stripe Checkout + `stripe-checkout` / `stripe-webhook` / `check-entitlement` Edge Functions (see [BILLING_SETUP.md](./BILLING_SETUP.md)).
- **scaffold** — Local-only premium unlock for dev; not valid for production.

### Required to ship
- **Native apps**: set RevenueCat public SDK keys and product metadata:
  - `VITE_REVENUECAT_API_KEY_IOS`, `VITE_REVENUECAT_API_KEY_ANDROID`
  - `VITE_REVENUECAT_ENTITLEMENT_ID`, `VITE_REVENUECAT_OFFERING_ID`
- **Web**: set `VITE_STRIPE_PUBLISHABLE_KEY` client-side; set Stripe and Supabase service secrets per [EDGE_FUNCTION_SECRETS.md](./EDGE_FUNCTION_SECRETS.md) and run DB migrations for `user_entitlements`.
- `release:check --strict` must see non-scaffold billing configuration and `VITE_APP_BASE_URL` (see [scripts/release-check.mjs](../scripts/release-check.mjs)).

### Hardening added
- Native production builds force real store billing; scaffold purchases are disabled in production.
- `release:check --strict` fails if `VITE_BILLING_MODE=scaffold` and scans env/store docs for submission placeholders.

## 3) Security Baseline

### Hardening added
- Vercel response headers added:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  - `Strict-Transport-Security`

### Required to ship
- Set `ALLOWED_ORIGIN` in Supabase secrets to your production web domain.
- Enable strict preflight before release:
  - `npm run release:check:strict`
- Fill all submission placeholders (`TBD`, `ASSIGN_REQUIRED`, `REQUIRED_BEFORE_SUBMISSION`) in store assets.

## 4) Go-live command checklist

```bash
npm run build
npm run release:check:strict
# Or full automated gate (typecheck, unit tests, build, strict preflight):
npm run ship:preflight
```

If strict preflight passes, web Stripe flow is verified, and native purchase tests pass on iOS and Android sandbox accounts, the app is ready for final store submission.
