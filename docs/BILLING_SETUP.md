# Billing Setup

MindVanta supports two billing modes through `src/lib/subscription.ts`:

- `scaffold` (default): local entitlement for development/testing
- `revenuecat`: adapter path for production purchase/restore sync

## Environment

Set in `.env.local`:

```bash
VITE_BILLING_MODE=scaffold
```

Switch to production adapter:

```bash
VITE_BILLING_MODE=revenuecat
VITE_REVENUECAT_API_KEY_IOS=appl_xxx
VITE_REVENUECAT_API_KEY_ANDROID=goog_xxx
VITE_REVENUECAT_ENTITLEMENT_ID=premium
VITE_REVENUECAT_OFFERING_ID=default
```

## Production integration requirements

For `revenuecat` mode, the app now uses the Capacitor RevenueCat SDK directly (`@revenuecat/purchases-capacitor`).
It will also use `window.RevenueCatPurchases` if present, so existing custom bridges remain compatible.

The adapter maps active entitlements to premium access and persists state in local storage for app startup recovery.

> Production note: the app forces `revenuecat` mode in production builds and blocks scaffold purchases.

## Validation checklist

- Purchase success unlocks premium-gated tabs (`courses`, `library`, `dreams`)
- Restore rehydrates premium after reinstall/login
- Failed purchase/restore surfaces user feedback and analytics events
- RevenueCat entitlement id in dashboard matches `VITE_REVENUECAT_ENTITLEMENT_ID`
