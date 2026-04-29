import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { AuthProvider } from './components/Auth';
import { ErrorBoundary, ToastProvider } from './components/ui';
import './index.css';

function showFatal(message: string, detail?: string) {
  const root = document.getElementById('root');
  if (!root) return;
  const safe = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  root.innerHTML = `<div style="color:#e2e8f0;padding:2rem;font-family:system-ui,sans-serif;max-width:36rem;margin:0 auto;line-height:1.5">
    <h1 style="font-size:1.15rem;margin:0 0 1rem;font-weight:600">Could not start MindVanta</h1>
    <p style="margin:0 0 0.75rem;opacity:0.92">${safe(message)}</p>
    ${detail ? `<pre style="font-size:11px;opacity:0.78;white-space:pre-wrap;word-break:break-word;margin:0 0 1rem">${safe(detail)}</pre>` : ''}
    <p style="margin:0;font-size:13px;opacity:0.72">If this appeared after an update, try a hard refresh (Ctrl+Shift+R), or clear this site's data / unregister the service worker, then reload.</p>
  </div>`;
}

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

if (sentryDsn) {
  try {
    Sentry.init({
      dsn: sentryDsn,
      tracesSampleRate: 0.1,
      environment: import.meta.env.MODE,
    });

    window.addEventListener('error', (event) => {
      Sentry.captureException(event.error ?? new Error(event.message));
    });

    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
      Sentry.captureException(reason);
    });
  } catch {
    // Invalid DSN or Sentry blocked — do not block the app.
  }
}

const rootEl = document.getElementById('root');

if (!rootEl) {
  document.body.insertAdjacentHTML(
    'beforeend',
    '<p style="color:#e2e8f0;padding:2rem;font-family:system-ui">This page is missing <code>#root</code>.</p>'
  );
} else {
  void import('./App')
    .then(({ default: App }) => {
      try {
        ReactDOM.createRoot(rootEl).render(
          <React.StrictMode>
            <ErrorBoundary>
              <AuthProvider>
                <ToastProvider>
                  <App />
                </ToastProvider>
              </AuthProvider>
            </ErrorBoundary>
          </React.StrictMode>
        );
      } catch (err) {
        console.error(err);
        showFatal(
          'The user interface failed to render.',
          err instanceof Error ? err.message : String(err)
        );
      }
    })
    .catch((err: unknown) => {
      console.error(err);
      const msg = err instanceof Error ? err.message : String(err);
      showFatal(
        'The application bundle could not be loaded. This is common right after a deploy when an old tab or offline copy still points at removed files.',
        msg
      );
    });
}
