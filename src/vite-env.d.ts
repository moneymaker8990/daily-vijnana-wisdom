/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BUILD_ID: string;
  readonly VITE_SENTRY_DSN?: string;
}
