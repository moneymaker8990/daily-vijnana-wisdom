# KPI Dashboard Specification

Use this document to configure your analytics dashboard and weekly review.

## Activation

- Install -> `onboarding_complete` conversion rate
- `app_open` -> `session_duration` (>180s) rate
- `first_journal_entry` rate
- `first_dream_entry` rate

## Retention

- D1 / D7 / D30 retention cohorts from `app_open`
- `tab_view` weekly active frequency by tab
- `streak_milestone` progression distribution

## Monetization

- Paywall views by trigger (`paywall_view`)
- Paywall close without action (`paywall_close_no_action`)
- Trial start rate (`trial_start`)
- Purchase success/failure (`purchase_success`, `purchase_fail`)
- Restore success/failure (`restore_success`, `restore_fail`)

## Product Quality

- `error_caught` trend
- Sentry crash-free users %
- Top regressions by release version

## Growth

- Review prompt funnel (`review_prompt_shown` -> `review_prompt_accepted`)
- Referral funnel (`referral_invite_open` -> `referral_share_success`)

## Weekly Review Cadence

1. Check anomalies vs prior 7 days.
2. Identify one conversion bottleneck and one retention bottleneck.
3. Define one product change and one messaging change for next iteration.
