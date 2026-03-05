# MindVanta Submission Runbook

Repeatable process for iOS and Android releases.

## Owners and Timing

- Release manager: `Caleb`
- QA sign-off owner: `Release engineering`
- Target submission date: `2026-03-11`

## Prerequisites

- Node.js 18+
- Apple Developer and Google Play Console accounts
- Xcode installed for iOS builds
- Android Studio installed for Android builds
- Required env vars set (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, optional `VITE_SENTRY_DSN`)
- Submission references ready:
  - `store-assets/APP_STORE_METADATA.md`
  - `store-assets/SUBMISSION_CHECKLIST.md`
  - `store-assets/REVIEW_EVIDENCE_PACK.md`

## Release Steps

1. **Preflight checks**
   - Run `npm run release:check`.
   - For strict validation right before submit, run `npm run release:check:strict`.
   - For full automated prep (strict check + build + screenshots), run `npm run release:prep`.
   - Optional for local testing without screenshots: `npm run release:prep -- --skip-screenshots`.

2. **Versioning**
   - Update version in `package.json`.
   - Verify app identity in `capacitor.config.ts` (`appId`, `appName`).
   - Sync any platform-specific version/build numbers if required by Xcode/Android Studio.

3. **Web build verification**
   - Run `npm run build`.
   - Confirm successful output and smoke test main flows.
   - Optional: generate screenshots using `scripts/take-screenshots.mjs` (supports `--platform` and `--clean`).

4. **Capacitor sync**
   - Run `npx cap sync ios`.
   - Run `npx cap sync android`.

5. **iOS submission**
   - Run `npx cap open ios`.
   - In Xcode:
     - Set Team and signing configuration.
     - Confirm Bundle Identifier is `app.mindvanta.main`.
     - Confirm Version/Build.
     - Product -> Archive.
     - Distribute App -> App Store Connect.
   - In App Store Connect:
     - Fill metadata from `store-assets/APP_STORE_METADATA.md`.
     - Upload screenshots.
     - Add privacy policy URL.
     - Add review notes from `store-assets/REVIEW_EVIDENCE_PACK.md` (AI disclaimer + permissions rationale).
     - Submit for review.

6. **Android submission**
   - Run `npx cap open android`.
   - In Android Studio:
     - Build signed App Bundle (AAB).
     - Use secure keystore.
   - In Google Play Console:
     - Complete app content + data safety.
     - Fill store listing from `store-assets/APP_STORE_METADATA.md`.
     - Upload screenshots and feature graphic.
     - Upload AAB and submit for review.

## Post-Submission

- Track review status:
  - iOS: App Store Connect -> TestFlight / App Review
  - Android: Google Play Console -> Publishing overview
- Monitor reliability dashboards:
  - Sentry project dashboard
  - Platform crash dashboards (if enabled later)
- Record final status and release notes in project docs.

## Rollback/Hotfix Notes

- If rejected, capture the rejection reason and update `store-assets/REVIEW_EVIDENCE_PACK.md`.
- For urgent fixes, bump patch version and repeat this runbook.

## Go/No-Go Launch Gates

Release to production only if every gate is green:

1. **Build and smoke gates**
   - `npm run build` passes on release commit
   - `store-assets/SMOKE_TEST_LOG.md` marked PASS for all core scenarios
   - `store-assets/DEVICE_QA_MATRIX.md` completed for required device classes
2. **Compliance gates**
   - Privacy and Terms URLs are publicly reachable over HTTPS
   - `store-assets/REVIEW_EVIDENCE_PACK.md` updated for current build behavior
   - Store listing metadata and screenshots are finalized and consistent
3. **Reliability gates**
   - Sentry DSN configured for release environment
   - No unresolved blocker crash in latest release candidate test window
4. **Monetization gates**
   - Paywall surfaces render and gated tabs behave correctly
   - Purchase/restore paths validated for current billing mode
5. **Analytics gates**
   - Core events confirmed in telemetry pipeline (`app_open`, onboarding, paywall, purchase/restore, review prompt)

If any gate fails, status is **NO-GO** and release is deferred.

## Post-Launch Monitoring Protocol (First 7 Days)

- **Hour 0-2**
  - Confirm crash ingestion and event flow for new version
  - Verify purchases/restores and entitlement checks from real sessions
- **Daily for 7 days**
  - Review crash-free trend and top exception groups
  - Review activation funnel and paywall conversion by trigger
  - Check App Store / Play reviews and support channels for regressions
- **Escalation**
  - If crash spike or payment regression appears, freeze rollout and prepare hotfix
  - Document incident timeline and mitigation in release notes
