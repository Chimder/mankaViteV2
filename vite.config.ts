import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'

export default defineConfig({
  plugins: [
    // react({
    //   babel: {
    //     plugins: [['babel-plugin-react-compiler']],
    //   },
    // }),
    checker({ typescript: false }),
    react(),
  ],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
})
