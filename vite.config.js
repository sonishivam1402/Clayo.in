import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7212', // ASP.NET Web API
        changeOrigin: true,
        secure: false // Accept self-signed certs in dev
      }
    }
  }
})
