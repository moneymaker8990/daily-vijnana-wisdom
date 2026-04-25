# Ship Day Runbook

One-page checklist for the person pressing "Submit for Review". Execute top to bottom.

## Gate 0 — Automated preflight

```bash
npm ci
npm run ship:preflight
```

This runs typecheck, unit tests, production build, and strict release preflight. It must exit 0. If it fails, stop and fix.

## Gate 1 — Public URLs live

```bash
npm run verify:urls
```

Must show `OK 200` for `/privacy-policy.html` and `/terms-of-service.html` on `https://mindvanta.io`. The app stores will reject the listing without reachable legal URLs.

## Gate 2 — Store assets present

```bash
npm run assets:feature-graphic
```

Verify on disk:
- [ ] `store-assets/feature-graphic.png` (1024x500)
- [ ] `store-assets/screenshots/iphone-6.7/` (6 PNGs)
- [ ] `store-assets/screenshots/iphone-6.5/` (6 PNGs)
- [ ] `store-assets/screenshots/android-phone/` (6 PNGs)

If screenshots are missing: `npm run release:prep`.

## Gate 3 — Billing wired end-to-end

Run the full validation block in [docs/BILLING_SETUP.md](./docs/BILLING_SETUP.md) before this gate is green:

- [ ] Sandbox iOS purchase unlocks premium tabs, restores after reinstall.
- [ ] Sandbox Android purchase unlocks premium tabs, restores after reinstall.
- [ ] Stripe test-mode checkout completes and `user_entitlements` row is written.

## Gate 4 — Device QA complete

Follow [docs/DEVICE_QA_PROTOCOL.md](./docs/DEVICE_QA_PROTOCOL.md) on at least one iPhone and one Android. When all 12 steps pass, update:

- [ ] [store-assets/DEVICE_QA_MATRIX.md](./store-assets/DEVICE_QA_MATRIX.md) — fill row, flip sign-off to `GO`
- [ ] [store-assets/SMOKE_TEST_LOG.md](./store-assets/SMOKE_TEST_LOG.md) — build id + tester name + `PASS`

## Gate 5 — Version bump + native sync

```bash
# Edit "version" in package.json if this is not 1.0.0
npm run sync-versions -- --bump-build
npx cap sync ios
npx cap sync android
```

## Gate 6 — iOS upload

Follow [docs/NATIVE_RELEASE.md](./docs/NATIVE_RELEASE.md) section 4. When Xcode shows "Upload succeeded":

- [ ] Build appears in App Store Connect -> TestFlight
- [ ] App Store Connect listing: metadata pasted from [store-assets/APP_STORE_METADATA.md](./store-assets/APP_STORE_METADATA.md)
- [ ] Screenshots uploaded for iPhone 6.7" and 6.5"
- [ ] Privacy Policy URL: `https://mindvanta.io/privacy-policy.html`
- [ ] Review notes pasted from [store-assets/REVIEW_EVIDENCE_PACK.md](./store-assets/REVIEW_EVIDENCE_PACK.md)
- [ ] In-app purchase `mindvanta_premium_monthly` attached to this submission
- [ ] Submit for Review

## Gate 7 — Android upload

Follow [docs/NATIVE_RELEASE.md](./docs/NATIVE_RELEASE.md) sections 5-6. When AAB is built:

- [ ] Play Console -> Production -> Create new release -> upload `app-release.aab`
- [ ] Store listing: copy from [store-assets/APP_STORE_METADATA.md](./store-assets/APP_STORE_METADATA.md)
- [ ] Feature graphic uploaded
- [ ] Screenshots uploaded for phone
- [ ] Data safety form completed
- [ ] Content rating questionnaire completed
- [ ] Subscription `mindvanta_premium_monthly` activated
- [ ] Review release -> Start rollout to Production

## Gate 8 — Post-submission monitoring (first 7 days)

Follow the protocol in [store-assets/SUBMISSION_RUNBOOK.md](./store-assets/SUBMISSION_RUNBOOK.md) "Post-Launch Monitoring Protocol":

- [ ] Sentry crash-free sessions trend graph bookmarked
- [ ] Supabase function logs tab bookmarked; stripe-webhook 5xx alert configured
- [ ] First review response within 48h of publication
- [ ] Hotfix branch protocol understood (bump patch, repeat ship:preflight)
