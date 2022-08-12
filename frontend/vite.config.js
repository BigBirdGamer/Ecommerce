import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    origin: 'localhost:3000',
    port: 3001,
    proxy: { "^/api/.*" : "http://localhost:3000/" },
  }
})
