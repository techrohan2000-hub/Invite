import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Project site: https://<user>.github.io/Invite/
// Docker/nginx serves from /, so base is '/' there via env.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE ?? '/Invite/',
})
