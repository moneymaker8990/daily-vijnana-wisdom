/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_BUILD_ID: string;
  readonly VITE_SENTRY_DSN?: string;
}
