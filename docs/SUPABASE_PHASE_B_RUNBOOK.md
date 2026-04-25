# Phase B — Supabase backend (migrations, secrets, functions, smoke test)

This runbook matches your production checklist. Run commands from the repo root: `daily-vijnana-app/`.

## Prerequisites (one-time)

1. [Install the Supabase CLI](https://supabase.com/docs/guides/cli) (or use `npx supabase` as below).
2. **Authenticate the CLI** (picks the account that owns the project):
   ```bash
   npx supabase login
   ```
   Or set a [personal access token](https://supabase.com/dashboard/account/tokens) (never commit it):
   ```powershell
   $env:SUPABASE_ACCESS_TOKEN = "sbp_..."   # Windows PowerShell
   ```
3. **Confirm the project** you are linking. Default ref in this repo: `coihujjfdhpqfwmibfbi` (see `VITE_SUPABASE_URL`). If you use a different project, change `--project-ref` everywhere.

## Step 4 — Apply database schema (migrations)

Migrations live in `supabase/migrations/` and apply **in filename order**:

| File | Purpose |
|------|--------|
| `20260412000000_initial_schema.sql` | Core app tables, RLS, `update_updated_at_column()` |
| `20260412100000_user_entitlements.sql` | `user_entitlements` + RLS (Stripe / entitlement sync) |

**Link** (once per machine, from `daily-vijnana-app`):

```bash
npx supabase link --project-ref coihujjfdhpqfwmibfbi
```

You will be prompted for the **database password** (Project Settings → Database, if you do not have it set).

**Push** migrations to the linked remote:

```bash
npx supabase db push
```

**Alternative (Dashboard):** open Supabase → **SQL Editor**, paste each migration file in order, run. Prefer `db push` so remote migration history matches the repo.

## Step 5 — Set Edge Function secrets

Secrets are **not** in Vite. Set them in **Project Settings → Edge Functions → Secrets**, or:

```bash
# One line per secret is fine; or pass multiple KEY=value pairs in one `secrets set` (CLI syntax may vary by version):
npx supabase secrets set CLAUDE_API_KEY=sk-ant-... --project-ref coihujjfdhpqfwmibfbi
npx supabase secrets set ALLOWED_ORIGIN=https://mindvanta.io --project-ref coihujjfdhpqfwmibfbi
```

**Stripe (web billing)** — set when you are ready for live/test web checkout:

```bash
npx supabase secrets set STRIPE_SECRET_KEY=sk_live_... --project-ref coihujjfdhpqfwmibfbi
npx supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_... --project-ref coihujjfdhpqfwmibfbi
npx supabase secrets set STRIPE_PRICE_ID_MONTHLY=price_... --project-ref coihujjfdhpqfwmibfbi
npx supabase secrets set APP_BASE_URL=https://mindvanta.io --project-ref coihujjfdhpqfwmibfbi
```

**Service role (required for `stripe-webhook` to write `user_entitlements`):**  
Copy **service_role** from **Project Settings → API** (server-only, never in the browser):

```bash
npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJ... --project-ref coihujjfdhpqfwmibfbi
```

> Supabase also injects `SUPABASE_URL` and related defaults for functions; your functions still expect `SUPABASE_SERVICE_ROLE_KEY` in webhook code. Never put the service role in frontend env.

Full table: [EDGE_FUNCTION_SECRETS.md](./EDGE_FUNCTION_SECRETS.md).

## Step 6 — Deploy Edge Functions

From `daily-vijnana-app`:

```bash
npx supabase functions deploy hyper-processor
npx supabase functions deploy stripe-checkout
npx supabase functions deploy stripe-webhook
npx supabase functions deploy check-entitlement
```

Or deploy all known functions: `npx supabase functions deploy` (if your CLI version supports it).

## Step 7 — Smoke test AI (`hyper-processor` health)

With `.env.local` present (or `HYPER_URL` + `HYPER_ANON_KEY` set):

```bash
npm run test:ai-health
```

**Expected:** HTTP 200 and JSON `{"status":"ok","ai_configured":true}`. This only proves the function is deployed and `CLAUDE_API_KEY` is set; it does not validate Stripe or DB migrations by itself.

### Optional: confirm `user_entitlements` in SQL Editor

Run in **SQL Editor** (after migrations):

```sql
SELECT to_regclass('public.user_entitlements') AS user_entitlements_table;
```

You should see `user_entitlements` (not null). If null, run Step 4.

**Manual curl** (replace `YOUR_ANON_KEY`):

```bash
curl -X POST "https://coihujjfdhpqfwmibfbi.supabase.co/functions/v1/hyper-processor" ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_ANON_KEY" ^
  -H "apikey: YOUR_ANON_KEY" ^
  -d "{\"type\":\"health-check\"}"
```

**Expected:** `{"status":"ok","ai_configured":true}`. If `ai_configured` is `false`, set `CLAUDE_API_KEY` in Edge Function secrets and redeploy `hyper-processor`.

## npm scripts (shortcuts)

See [package.json](../package.json): `supabase:link`, `supabase:db:push`, `supabase:functions:deploy:all`, `test:ai-health`.
