# Crash Reporting Setup (Sentry)

This project uses Sentry for frontend crash reporting in React.

## 1) Create a Sentry project

1. Go to `https://sentry.io`.
2. Create an organization/project for this app.
3. Choose the JavaScript/React SDK.
4. Copy the DSN value.

## 2) Configure environment variables

Add this to your local `.env` (or deployment environment):

```bash
VITE_SENTRY_DSN=https://<key>@o<org-id>.ingest.sentry.io/<project-id>
```

If `VITE_SENTRY_DSN` is not set, Sentry initialization is skipped.

## 3) Current integration points

- `src/main.tsx`
  - Initializes Sentry with `Sentry.init()`
  - Adds global handlers for `window.error` and `unhandledrejection`
- `src/components/ui/ErrorBoundary.tsx`
  - Captures component errors with React stack context

## 4) Optional source maps for release debugging

Source maps can be uploaded during CI/CD for better stack traces:

1. Install Sentry CLI in CI.
2. Create an auth token in Sentry.
3. Upload source maps after `npm run build`.

Keep auth tokens only in secure CI secrets.
