# MindVanta Analytics Event Schema

This document defines the baseline event taxonomy for activation, retention, feature usage, and technical health.
Use non-PII properties only and avoid logging free-text journal or dream content.

## Event Table

| Event | Category | When it fires | Suggested properties | Source file |
| --- | --- | --- | --- | --- |
| `app_open` | Activation | App bootstraps successfully | `platform`, `app_version` | `src/main.tsx` |
| `onboarding_start` | Activation | Onboarding flow becomes visible | `entry_point` | `src/App.tsx` |
| `onboarding_complete` | Activation | User finishes onboarding | `duration_seconds` | `src/App.tsx` |
| `first_journal_entry` | Activation | First journal entry is created | `day_number`, `has_voice` | `src/components/Journal/Journal.tsx` |
| `first_dream_entry` | Activation | First dream entry is created | `has_tags`, `has_mood` | `src/components/Dreams/DreamJournal.tsx` |
| `session_duration` | Activation | Session closes or crosses key threshold | `seconds`, `bucket` | `src/App.tsx` |
| `tab_view` | Retention | User changes primary tab | `tab_id` | `src/components/Navigation/TabNavigation.tsx` |
| `streak_milestone` | Retention | New streak milestone is reached | `days`, `title` | `src/lib/streakTracker.ts` |
| `notification_enabled` | Retention | Daily notifications are enabled | `time`, `source` | `src/lib/notifications.ts` |
| `dream_interpret_request` | Feature | User requests dream interpretation | `length_bucket`, `used_follow_up` | `src/lib/dreamAI.ts` |
| `meditation_start` | Feature | Meditation timer starts | `duration_minutes`, `sound` | `src/components/Timer/MeditationTimer.tsx` |
| `meditation_complete` | Feature | Meditation timer completes | `duration_minutes`, `completed` | `src/components/Timer/MeditationTimer.tsx` |
| `study_lesson_start` | Feature | Study lesson opened | `course_id`, `lesson_id` | `src/components/StudyPathways/LessonView.tsx` |
| `lesson_complete` | Feature | Study lesson marked complete | `course_id`, `lesson_id`, `quiz_score` | `src/components/StudyPathways/LessonQuiz.tsx` |
| `spiritual_guide_message` | Feature | Message sent to spiritual guide | `message_length_bucket` | `src/lib/spiritualGuide.ts` |
| `paywall_view` | Monetization | User is shown paywall | `trigger`, `tab_id` | `src/App.tsx` |
| `paywall_cta_click` | Monetization | User selects paywall CTA | `trigger`, `mode` | `src/App.tsx` |
| `paywall_close_no_action` | Monetization | User closes paywall without purchase | `trigger` | `src/App.tsx` |
| `trial_start` | Monetization | User starts trial from paywall | `trigger`, `product_id` | `src/App.tsx` |
| `purchase_success` | Monetization | Purchase completed successfully | `trigger`, `product_id` | `src/App.tsx` |
| `purchase_fail` | Monetization | Purchase failed | `trigger`, `reason` | `src/App.tsx` |
| `restore_success` | Monetization | Restore purchases succeeded | `source` | `src/App.tsx` |
| `restore_fail` | Monetization | Restore purchases failed | `reason` | `src/App.tsx` |
| `review_prompt_shown` | Retention | In-app review prompt is shown | `streak_days`, `journal_entries`, `dream_entries` | `src/App.tsx` |
| `review_prompt_accepted` | Retention | User taps review CTA | none | `src/App.tsx` |
| `review_prompt_later` | Retention | User postpones review prompt | none | `src/App.tsx` |
| `review_prompt_dismissed` | Retention | User permanently dismisses prompt | none | `src/App.tsx` |
| `referral_invite_open` | Growth | User opens invite action | `surface` | `src/components/Layout/AppLayout.tsx` |
| `referral_share_success` | Growth | Invite/share succeeds | `channel` | `src/components/Layout/AppLayout.tsx` |
| `referral_share_cancel` | Growth | Share sheet dismissed | `channel` | `src/components/Layout/AppLayout.tsx` |
| `referral_share_fail` | Growth | Invite/share fails | `channel` | `src/components/Layout/AppLayout.tsx` |
| `error_caught` | Technical | Error boundary or global handler catches error | `scope`, `error_name`, `build` | `src/components/ui/ErrorBoundary.tsx` / `src/main.tsx` |
| `offline_usage` | Technical | App transitions to offline mode | `tab_id`, `connection_type` | `src/components/ui/OfflineIndicator.tsx` |

## Property Conventions

- Use snake_case keys and stable enum values.
- Include `app_version` and `platform` on high-value events when available.
- Prefer coarse buckets over raw values for sensitive/variable fields:
  - `length_bucket`: `short` / `medium` / `long`
  - `seconds_bucket`: `lt_60` / `60_180` / `gt_180`

## Instrumentation Notes

- Do not log personal content from journal entries, dreams, or AI prompts.
- Track only product interactions and metadata needed for funnel analysis.
- Route all events through a single helper (`src/lib/analytics.ts`) so providers can be swapped later.
- If analytics SDK is unavailable, fail silently and keep app behavior unchanged.
