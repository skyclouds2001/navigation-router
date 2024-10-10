import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {},
  },
  css: {
    preprocessorMaxWorkers: true,
    devSourcemap: true,
  },
  json: {
    namedExports: false,
    stringify: true,
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    open: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
    open: true,
  },
})
