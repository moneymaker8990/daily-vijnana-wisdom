const STORAGE_KEY = 'mindvanta_build_id';

/**
 * On production, compares the baked-in build id to the last successful boot.
 * If the app was upgraded—or there is leftover Workbox storage from before this
 * feature—unregister service workers, clear Cache Storage, persist the new id,
 * and reload once so the shell can never keep pointing at deleted hashed chunks.
 */
export async function prepareCacheForCurrentBuild(
  buildId: string,
  isProduction: boolean
): Promise<void> {
  if (!isProduction || typeof window === 'undefined') return;

  let previous: string | null = null;
  try {
    previous = localStorage.getItem(STORAGE_KEY);
  } catch {
    // ignore
  }

  if (previous === buildId) return;

  let hadRegistrations = false;
  let hadCacheKeys = false;

  try {
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      hadRegistrations = regs.length > 0;
      await Promise.all(regs.map((r) => r.unregister()));
    }
    if ('caches' in window) {
      const keys = await caches.keys();
      hadCacheKeys = keys.length > 0;
      await Promise.all(keys.map((name) => caches.delete(name)));
    }
  } catch {
    // ignore — still persist build id and optionally reload
  }

  try {
    localStorage.setItem(STORAGE_KEY, buildId);
  } catch {
    // ignore
  }

  const looksLikeFreshInstall = previous === null && !hadRegistrations && !hadCacheKeys;
  if (looksLikeFreshInstall) return;

  window.location.reload();
}
