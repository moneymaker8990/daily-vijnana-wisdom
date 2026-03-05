import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import App from './App';
import { AuthProvider } from './components/Auth';
import { ErrorBoundary, ToastProvider } from './components/ui';
import { track } from './lib/analytics';
import './index.css';

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

if (sentryDsn) {
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
}

track('app_open', {
  platform: 'web',
  app_version: import.meta.env.VITE_APP_VERSION ?? 'unknown',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
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









