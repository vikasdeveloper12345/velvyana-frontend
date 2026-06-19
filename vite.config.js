import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { seoInjectPlugin } from './vite-seo-plugin.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoInjectPlugin()],

  // 🔥 ADD THIS
  server: {
    host: true,
    allowedHosts: "all",
  },
})