import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Aumentamos el chunkSizeWarningLimit para que deployee bien
  build: {
    chunkSizeWarningLimit: 1600,
  },
  
  plugins: [react()],
  
  // agregamos el BASE para el gh-pages
  base: '/EcommerceReact-Final'
})
