# MindVanta Device QA Matrix

Use this matrix as release evidence before submitting to App Store / Play.

## Test Scope

- Build: `v1.0.0`
- Candidate date: `2026-04-12`
- Tester: `Cursor Agent (ship-readiness hardening pass)`

## Device Coverage Matrix

| Platform | Device Class | Device | OS Version | Build Installed | Result | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| iOS | Small phone | iPhone SE / mini class | iOS 17+ | No | Not run | Physical device pass still required before submit |
| iOS | Large phone | iPhone 14/15 Pro Max class | iOS 17+ | No | Not run | Playwright emulation passed for iPhone 6.7 and 6.5 |
| iOS | Tablet | iPad Pro/Air class | iPadOS 17+ | No | Not run | iPad-class physical test still required |
| Android | Low-end phone | 3-4GB RAM device | Android 12+ | No | Not run | Physical low-end validation pending |
| Android | Mainstream phone | Mid/high device | Android 13+ | No | Not run | Playwright emulation passed for Android phone |
| Android | Tablet | 8-10in tablet | Android 13+ | No | Not run | Tablet physical test still required |

## Required Flow Checklist (run on each primary phone)

- [x] App launch and onboarding completes without crash (web emulation)
- [x] Daily tab loads and day navigation works (web emulation)
- [x] Journal create/edit/delete works (web emulation seeded state)
- [x] Dream create/edit/delete works (web emulation seeded state)
- [x] Dream interpretation request works (with network) (production URL check + seeded interpretation view)
- [x] Study tab loads and lesson navigation works (web emulation)
- [x] Library tab opens and text navigation works (web emulation)
- [ ] Notifications can be enabled and scheduled (requires native/manual verification)
- [ ] Offline mode still allows core local features (requires offline/manual verification)
- [x] Paywall prompt appears on premium-gated path (build smoke + app behavior)
- [ ] Restore purchase flow (when production billing enabled) (pending RevenueCat product setup)

## Sign-off

- QA owner: `Release engineering`
- Date: `2026-04-12`
- Release decision: `CONDITIONAL-GO (hardening applied; physical device validation required before final submit)`
