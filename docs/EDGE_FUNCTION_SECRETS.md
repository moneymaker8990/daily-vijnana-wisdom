# Edge Function Secrets

> **End-to-end runbook (migrations + secrets + deploy + health check):** [SUPABASE_PHASE_B_RUNBOOK.md](./SUPABASE_PHASE_B_RUNBOOK.md)

All Supabase Edge Functions read secrets from the Supabase environment, **not** from client-side `.env` files.

Set them in the Supabase Dashboard (Project Settings > Edge Functions > Secrets) or via the CLI:

```bash
supabase secrets set KEY=value
```

## Required for AI features (`hyper-processor`)

| Secret | Description | How to get it |
|--------|-------------|---------------|
| `CLAUDE_API_KEY` | Anthropic API key | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |

## Optional for AI features

| Secret | Description | Default |
|--------|-------------|---------|
| `ALLOWED_ORIGIN` | CORS `Access-Control-Allow-Origin` for browser calls to `stripe-checkout` and `check-entitlement` | `*` in dev; in production use your site origin. **Comma-separate** multiple origins, e.g. `https://mindvanta.io,https://www.mindvanta.io`. The deployed functions also treat **www** and **apex** as the same site when one is listed. |

## Required for web subscriptions (`stripe-checkout`, `stripe-webhook`)

| Secret | Description | How to get it |
|--------|-------------|---------------|
| `STRIPE_SECRET_KEY` | Stripe secret API key | [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Create a webhook endpoint in Stripe Dashboard, copy the signing secret |
| `STRIPE_PRICE_ID_MONTHLY` | Default Stripe Price ID for monthly premium | Create a product + price in Stripe Dashboard, copy the `price_xxx` ID |
| `STRIPE_TRIAL_PERIOD_DAYS` | (Optional) e.g. `7` to add a card-on-file free trial on Checkout subscriptions | Set on the `stripe-checkout` function; `trialing` is already treated as premium in webhooks |
| `APP_BASE_URL` | Base URL for checkout success/cancel redirects | `https://mindvanta.io` |

## Deploying edge functions

```bash
# Link to your Supabase project (one-time)
supabase link --project-ref coihujjfdhpqfwmibfbi

# Deploy all functions
supabase functions deploy

# Deploy a single function
supabase functions deploy hyper-processor
supabase functions deploy stripe-checkout
supabase functions deploy stripe-webhook
supabase functions deploy stripe-reconcile
supabase functions deploy check-entitlement
```

`stripe-reconcile` writes `user_entitlements` when: (1) the client posts `{ "sessionId": "cs_..." }` after Checkout, or (2) the client posts `{ "lookupByEmail": true }` on “Restore purchases” to match the signed-in user’s **email** to a Stripe customer and active subscription (if the row was never created by the webhook).

## Verifying the setup

After deploying and setting secrets, test the health check:

```bash
curl -X POST \
  https://coihujjfdhpqfwmibfbi.supabase.co/functions/v1/hyper-processor \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "apikey: YOUR_ANON_KEY" \
  -d '{"type": "health-check"}'
```

Expected response:
```json
{"status": "ok", "ai_configured": true}
```

If `ai_configured` is `false`, the `CLAUDE_API_KEY` secret is missing.
