# Device QA Protocol

A concrete, repeatable script for running the MindVanta smoke pass on a physical device. Complete it once per device class and paste the result rows into [DEVICE_QA_MATRIX.md](../store-assets/DEVICE_QA_MATRIX.md) and [SMOKE_TEST_LOG.md](../store-assets/SMOKE_TEST_LOG.md).

## Required devices before submission

| Priority | Platform | Device class |
| --- | --- | --- |
| Must | iOS | One iPhone on iOS 17+ (any size) |
| Must | Android | One Android phone on Android 13+ |
| Should | iOS | One iPad |
| Should | Android | One low-RAM phone (3-4 GB) |

## Setup per device (one time)

1. Install the build:
   - iOS: TestFlight invite link from App Store Connect.
   - Android: Play Console internal testing opt-in URL.
2. Sign into a dedicated QA account (do not use real payment method — use sandbox tester / license-tested account).
3. Fully delete any prior install. Start from a clean state.

## Execute these 12 steps, in order, recording pass/fail

1. **Cold launch.** Tap icon. App reaches onboarding or daily tab within 3s. No crash.
2. **Onboarding.** Complete onboarding. Lands on daily tab. Watch for layout clipping on small screens.
3. **Tab nav.** Tap each of: Daily, Journal, Study (courses), Library, Dreams. Non-premium account must see a paywall for Courses / Library / Dreams. Premium (post-purchase) must see full content.
4. **Day navigation.** On Daily, swipe to yesterday, swipe to tomorrow, use "Today" to jump back. Day number updates.
5. **Journal create.** Go to Journal -> new entry -> type 2-3 lines -> save. Entry appears in list. Kill app. Relaunch. Entry still there.
6. **Dream create + AI interpretation.** Dreams tab -> new dream -> enter text -> request interpretation. Interpretation returns within ~15s with the AI disclaimer visible. If it fails: confirm `CLAUDE_API_KEY` is set on Supabase and `ALLOWED_ORIGIN` covers this client origin.
7. **Notifications.** Settings -> enable daily reminder -> set time to "2 minutes from now" -> background the app. At the scheduled time a notification fires with wisdom text. Tap it -> app opens to Daily.
8. **Offline.** Turn on airplane mode. Relaunch app. Daily loads, Journal loads, Library reads work. Offline indicator appears. AI features fail gracefully (no crash, clear toast).
9. **Purchase (sandbox).** Tap a premium tab -> paywall -> Activate Premium. Purchase succeeds with sandbox account. Gated tabs unlock immediately. Background then foreground app; premium persists.
10. **Restore.** Uninstall app -> reinstall -> complete onboarding again -> paywall -> "Restore Purchases". Premium is restored without a second charge.
11. **Error boundary.** Force a recoverable error if possible (rapidly change days while offline / rotate device during AI call). ErrorBoundary screen appears with "Try again" and recovers.
12. **Sentry ingestion.** While online, from a settings action trigger `console.error('qa-sentry-check')` via a debug build, OR cause any handled exception. Within 5 minutes a matching event appears in the Sentry project dashboard.

## Evidence to capture

For each row you mark pass, capture either:
- A screenshot of the result, named `qa-<device>-<step>.png`, committed to `store-assets/qa-evidence/`, OR
- A one-line note in `SMOKE_TEST_LOG.md` describing observed behavior.

## Fail handling

If any must-ship step (1-10) fails:
- Freeze submission.
- Open an issue with the device, OS version, exact step, and expected vs. actual.
- Do not flip `DEVICE_QA_MATRIX.md` sign-off from `CONDITIONAL-GO` to `GO` until all failures are closed or explicitly deferred with justification.

## Closeout

After at least one iOS and one Android device have completed steps 1-12 cleanly:

1. Fill the matching row in [DEVICE_QA_MATRIX.md](../store-assets/DEVICE_QA_MATRIX.md).
2. Flip the sign-off line to `GO`.
3. Update [SMOKE_TEST_LOG.md](../store-assets/SMOKE_TEST_LOG.md) with the build id and the tester name.
4. Proceed to the submission runbook in [NATIVE_RELEASE.md](./NATIVE_RELEASE.md) step 8.
