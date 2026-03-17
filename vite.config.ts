import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueDevtools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(), tailwindcss(), vueDevtools()],
  server: {
    proxy: {
      // En desarrollo local, redirige /api/* al backend en :8080
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // NO rewritimos la ruta porque el backend espera /api/...
      }
    }
  }
})
