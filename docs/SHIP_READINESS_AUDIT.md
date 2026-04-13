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
- Billing modes:
  - `scaffold` (local entitlement for development)
  - `revenuecat` (real purchase/restore flow)

### Required to ship
- Set `VITE_BILLING_MODE=revenuecat`.
- Set RevenueCat keys:
  - `VITE_REVENUECAT_API_KEY_IOS`
  - `VITE_REVENUECAT_API_KEY_ANDROID`
  - `VITE_REVENUECAT_ENTITLEMENT_ID`
  - `VITE_REVENUECAT_OFFERING_ID`

### Hardening added
- Production builds now force `revenuecat` mode and block scaffold purchases.
- `release:check --strict` now fails if billing mode is scaffold.

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
```

If strict preflight passes and native purchase tests pass on both iOS + Android sandbox accounts, app is ready for final store submission.
