# Billing Setup

MindVanta ships three complementary billing paths, selected automatically by [src/lib/subscription.ts](../src/lib/subscription.ts):

| Platform | Mode | Source of truth |
| --- | --- | --- |
| iOS (native) | `revenuecat` | App Store Connect subscription, fronted by RevenueCat |
| Android (native) | `revenuecat` | Play Console subscription, fronted by RevenueCat |
| Web (PWA / mindvanta.io) | `stripe` | Stripe recurring price + `stripe-webhook` Edge Function |

In production, native builds are forced to `revenuecat` regardless of `VITE_BILLING_MODE`. Scaffold mode is hard-blocked in production builds.

## Single source of truth for IDs

To avoid drift between the four consoles, standardize on these canonical IDs and use them everywhere:

| Concept | Canonical ID | Used by |
| --- | --- | --- |
| Entitlement | `premium` | `VITE_REVENUECAT_ENTITLEMENT_ID`, RevenueCat dashboard |
| Offering | `default` | `VITE_REVENUECAT_OFFERING_ID`, RevenueCat dashboard |
| Monthly product | `mindvanta_premium_monthly` | App Store Connect, Play Console, RevenueCat, Stripe nickname |

## Client environment (`.env.local`)

```bash
VITE_BILLING_MODE=revenuecat
VITE_REVENUECAT_API_KEY_IOS=appl_XXXXXXXXXXXXXXXXXX
VITE_REVENUECAT_API_KEY_ANDROID=goog_XXXXXXXXXXXXXXXXXX
VITE_REVENUECAT_ENTITLEMENT_ID=premium
VITE_REVENUECAT_OFFERING_ID=default
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_XXXXXXXXXXXXXXXXXX
```

## Supabase Edge Function secrets (server-side)

See [EDGE_FUNCTION_SECRETS.md](./EDGE_FUNCTION_SECRETS.md). Summary:

```bash
supabase secrets set \
  CLAUDE_API_KEY=sk-ant-... \
  ALLOWED_ORIGIN=https://mindvanta.io \
  STRIPE_SECRET_KEY=sk_live_... \
  STRIPE_WEBHOOK_SECRET=whsec_... \
  STRIPE_PRICE_ID_MONTHLY=price_... \
  APP_BASE_URL=https://mindvanta.io
```

## Apple — App Store Connect

1. My Apps -> MindVanta (`app.mindvanta.main`) -> **Monetization -> Subscriptions**.
2. Create a Subscription Group: `MindVanta Premium`.
3. Create a Subscription:
   - Reference name: `MindVanta Premium Monthly`
   - Product ID: `mindvanta_premium_monthly`
   - Duration: 1 Month
4. Fill localizations, review screenshot, price tier.
5. Submit the subscription **with** the first binary in the same review.

## Google — Play Console

1. Play Console -> MindVanta -> **Monetize with Play -> Products -> Subscriptions**.
2. Create subscription:
   - Product ID: `mindvanta_premium_monthly`
   - Base plan: `monthly`, auto-renewing, 1 month
   - Offer: default offer active
3. Activate the base plan.

## RevenueCat

1. Add project "MindVanta" with iOS + Android apps.
2. Apps -> iOS: paste the App Store Connect shared secret and in-app purchase key.
3. Apps -> Android: upload the Play Console service account JSON.
4. **Entitlements** -> create `premium`.
5. **Products** -> import `mindvanta_premium_monthly` from both stores, attach to entitlement `premium`.
6. **Offerings** -> create `default`, add a package containing the monthly product.
7. Copy the iOS and Android public SDK keys into `VITE_REVENUECAT_API_KEY_IOS` / `VITE_REVENUECAT_API_KEY_ANDROID`.

## Stripe (web path)

1. Dashboard -> Products -> New: `MindVanta Premium`.
2. Add recurring price, `$X.XX` / month. Copy the `price_...` ID into `STRIPE_PRICE_ID_MONTHLY`.
3. Developers -> Webhooks -> Add endpoint:
   - URL: `https://coihujjfdhpqfwmibfbi.supabase.co/functions/v1/stripe-webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`
   - Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
4. Paste the publishable key into `VITE_STRIPE_PUBLISHABLE_KEY`.

## End-to-end validation

Gating lives in [`PREMIUM_TABS`](../src/lib/subscription.ts) — `courses`, `library`, `dreams` must all unlock after a successful purchase on each channel.

1. **iOS sandbox**: TestFlight build with a sandbox tester; purchase; verify `courses`/`library`/`dreams` unlock. Reinstall app -> "Restore Purchases" rehydrates entitlement.
2. **Android internal test track**: license-tested Google account; purchase; verify unlock; uninstall and reinstall -> restore works.
3. **Stripe test mode**: sign in on `https://mindvanta.io`, trigger paywall, complete Stripe Checkout with test card `4242 4242 4242 4242`. `check-entitlement` function should read `user_entitlements` row written by `stripe-webhook` and return `tier: "premium"`.

Do not set `VITE_BILLING_MODE=revenuecat` in production until steps 1-2 have passed end-to-end at least once.

## Diagnosing failures

| Symptom | Likely cause |
| --- | --- |
| `RevenueCat SDK unavailable` toast | `VITE_REVENUECAT_API_KEY_IOS`/`_ANDROID` missing or wrong for that platform |
| Paywall opens Stripe Checkout but never unlocks | `stripe-webhook` not receiving events, or `SUPABASE_SERVICE_ROLE_KEY` missing server-side |
| Purchase succeeds but entitlement stays `free` | Entitlement ID in RevenueCat dashboard does not match `VITE_REVENUECAT_ENTITLEMENT_ID` |
| Purchase blocked with "Scaffold billing is disabled in production" | You're in a prod build with `VITE_BILLING_MODE=scaffold`. Fix env. |
