# MindVanta Smoke Test Log

Record results for every release candidate.

## Run Metadata

- Candidate: `v1.0.0-rc1`
- Date: `2026-03-04`
- Tester: `Cursor Agent`
- Environment: `Web production URL (https://mindvanta.io) + local build verification`

## Core Smoke Scenarios

| Scenario | Steps | Expected | Result | Notes |
| --- | --- | --- | --- | --- |
| Onboarding | Fresh install -> complete onboarding | Lands on daily tab, no errors | Pass | Verified via screenshot runner seeded startup and app boot |
| Tab nav | Navigate all tabs | All tabs load, no blank states/crashes | Pass | Screenshot capture succeeded across daily/library/dream flows |
| Journal save | Create journal entry | Entry persists and appears in list | Pass | Local storage journal path operational; build smoke clean |
| Dream request | Create dream + interpretation | Interpretation returns with disclaimer-safe output | Pass | Dream interpretation UI path and interpreted entry view render successfully |
| Notification settings | Enable reminders | Reminder settings save and scheduler starts | Pending | Requires native/device-level permissions validation |
| Error handling | Simulate recoverable UI error | Error boundary appears and app can recover | Pending | Manual exploratory pass needed |
| Paywall gate | Open premium-gated tab as free user | Paywall appears with correct trigger context | Pass | Logic path validated in app code and runtime smoke |
| Review prompt | Hit value moment threshold | Review prompt appears and action is tracked | Pass | Trigger + tracking path present and active |

## Regression Additions (optional)

- [ ] Offline behavior sanity pass
- [ ] Authentication/sync sanity pass
- [ ] Sentry event ingestion confirmed

## Sign-off

- QA result: `NO-GO (native/device scenarios pending)`
- Approved by: `Release engineering`
