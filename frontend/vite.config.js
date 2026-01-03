import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 500,
      binaryInterval: 1000,
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
    hmr: {
      clientPort: 5173,
      protocol: 'ws',
      host: 'localhost',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    reporters: ['default', ['junit', { outputFile: './test-results.xml' }]],
  },
})
