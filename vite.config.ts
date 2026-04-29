import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

const __dirname = dirname(fileURLToPath(import.meta.url))

const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8')) as {
  version: string
}

function resolveProductionBuildId(): string {
  const sha =
    process.env.VERCEL_GIT_COMMIT_SHA ??
    process.env.CF_PAGES_COMMIT_SHA ??
    process.env.GITHUB_SHA ??
    ''
  const trimmed = sha.trim()
  if (trimmed.length >= 7) return trimmed.slice(0, 12)
  return `${pkg.version}-local`
}

/** Replaces Vite’s module entry with an inline script that can clear SW/cache before inject. */
function extractViteModuleScript(html: string): { full: string; src: string } | null {
  const re = /<script\b[^>]*>[\s\S]*?<\/script>/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) !== null) {
    const tag = m[0]
    if (!/\btype\s*=\s*["']module["']/i.test(tag)) continue
    const srcM = /\bsrc\s*=\s*["']([^"']+)["']/i.exec(tag)
    if (!srcM) continue
    return { full: tag, src: srcM[1] }
  }
  return null
}

function buildBootstrapInlineScript(buildId: string, entrySrc: string): string {
  const BUILD_ID = JSON.stringify(buildId)
  const ENTRY = JSON.stringify(entrySrc)
  return [
    '(function(){',
    `var BUILD_ID=${BUILD_ID};`,
    `var ENTRY=${ENTRY};`,
    "var KEY='mindvanta_build_id';",
    'function loadApp(){',
    'function inject(){',
    "var s=document.createElement('script');",
    "s.type='module';",
    's.src=ENTRY;',
    "s.crossOrigin='anonymous';",
    'document.body.appendChild(s);',
    '}',
    "if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',inject,{once:true});}else{inject();}",
    '}',
    "if(BUILD_ID==='dev'){loadApp();return;}",
    'var prev=null;try{prev=localStorage.getItem(KEY);}catch(e){}',
    'if(prev===BUILD_ID){loadApp();return;}',
    'var hadReg=false;var hadCaches=false;',
    'Promise.all([',
    "'serviceWorker' in navigator?navigator.serviceWorker.getRegistrations().then(function(regs){hadReg=regs.length>0;return Promise.all(regs.map(function(r){return r.unregister();}))}):Promise.resolve(),",
    "'caches' in window?caches.keys().then(function(keys){hadCaches=keys.length>0;return Promise.all(keys.map(function(k){return caches.delete(k);}))}):Promise.resolve()",
    ']).then(function(){',
    'try{localStorage.setItem(KEY,BUILD_ID);}catch(e){}',
    'var fresh=prev===null&&!hadReg&&!hadCaches;',
    'if(fresh){loadApp();return;}',
    'window.location.reload();',
    '}).catch(function(){',
    'try{localStorage.setItem(KEY,BUILD_ID);}catch(e){}',
    'loadApp();',
    '});',
    '})();',
  ].join('')
}

function mindvantaBootstrapPlugin(buildId: string): Plugin {
  return {
    name: 'mindvanta-bootstrap',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const found = extractViteModuleScript(html)
        if (!found) return html
        const inline = buildBootstrapInlineScript(buildId, found.src)
        return html.replace(found.full, `<script>${inline}</script>`)
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const productionBuildId = mode === 'production' ? resolveProductionBuildId() : 'dev'

  return {
    define: {
      'import.meta.env.VITE_BUILD_ID': JSON.stringify(productionBuildId),
    },
    resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@lib': resolve(__dirname, 'src/lib'),
      '@core': resolve(__dirname, 'src/core'),
      '@data': resolve(__dirname, 'src/data'),
      '@hooks': resolve(__dirname, 'src/hooks'),
    },
    },
    build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/src/core/library/') || id.includes('/src/data/entries/')) {
            return 'library';
          }
          if (id.includes('/src/components/DayView/')) {
            return 'daily';
          }
          if (id.includes('/src/components/Journal/')) {
            return 'journal';
          }
          if (id.includes('/src/components/Dreams/')) {
            return 'dreams';
          }
          if (id.includes('/src/components/StudyPathways/') || id.includes('/src/components/Study/')) {
            return 'study';
          }
        },
      },
    },
    },
    plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'MindVanta',
        short_name: 'MindVanta',
        description: 'Ancient wisdom for modern seekers - sacred texts, meditation, and dream journal',
        theme_color: '#1e1b4b',
        background_color: '#0f0d1a',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        categories: ['lifestyle', 'health', 'education'],
        icons: [
          {
            src: 'icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: 'icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: 'icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        // Do not precache JS or HTML: stale shells + hashed chunks cause blank
        // pages after deploy. Shell and bundles load from network when online.
        globPatterns: ['**/*.{css,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-network-first',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 32,
                maxAgeSeconds: 60 * 60 * 24,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    }),
    mindvantaBootstrapPlugin(productionBuildId),
    ],
  }
})
