# MindVanta Monetization Architecture Decision

This document records the current monetization boundary and future implementation direction.

## Decision Summary

- **Model:** Freemium
- **Principle:** Preserve core daily value for all users, monetize depth and continuity features.
- **Status:** Architecture defined; paywall mechanics implementation deferred to a later phase.

## Free vs Premium Boundary

### Free Core

- Daily wisdom experience
- Basic journal usage
- Limited sacred library access
- Basic study access

### Premium Scope (future implementation)

- Full sacred library access
- Advanced study pathways
- Deeper AI dream interpretation
- Multi-device sync enhancements
- Premium audio content packs

## Planned Paywall Triggers (not yet implemented)

- Completion of a 7-day streak
- Unlocking second course module
- Requesting advanced dream breakdown
- Exporting reflection history

## UX Guardrails

- Explain premium using value and continuity, not pressure tactics.
- Keep essential spiritual practice and reflection features usable without subscription.
- Present clear feature comparison before purchase.

## Billing Stack Decision

- **Current choice:** Hybrid adapter implemented in `src/lib/subscription.ts`
  - `scaffold` mode for development/testing
  - `revenuecat` adapter mode for production purchase/restore flow
- **Reference points:**
  - `docs/BILLING_SETUP.md`
  - `SETUP.md` RevenueCat section

## Next Implementation Tasks

1. Wire native RevenueCat bridge in Capacitor runtime and verify purchase/restore on both stores.
2. Finalize product IDs and introductory offer strategy.
3. Add paywall experiment variants and remote-config thresholds.
4. Track cohort conversion by trigger and offer variant.
