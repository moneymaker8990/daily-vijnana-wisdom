import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
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
  plugins: [react(), tailwindcss()],
})
