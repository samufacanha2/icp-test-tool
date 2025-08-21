import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve'
  const isGhPages = process.env.GITHUB_PAGES === 'true' || mode === 'gh-pages'
  
  return {
    plugins: [react()],
    base: isGhPages ? '/icp-test/' : './',
    build: {
      outDir: 'docs',
      assetsDir: 'assets',
    }
  }
})
