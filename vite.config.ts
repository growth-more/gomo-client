import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://dev.gomo.ai.kr',
        changeOrigin: true,
        cookiePathRewrite: {
          '/members/refresh': 'api/members/refresh',
        },
      },
    },
  },
})
