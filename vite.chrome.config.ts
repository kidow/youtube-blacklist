import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

const fetchVersion = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html: string) {
      return html.replace(
        /__APP_VERSION__/,
        `v${process.env.npm_package_version}`
      )
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), fetchVersion()],
  build: {
    emptyOutDir: false,
    outDir: resolve(__dirname, 'dist'),
    lib: {
      formats: ['iife'],
      entry: resolve(__dirname, './src/background/index.ts'),
      name: 'Tweton'
    },
    rollupOptions: {
      output: {
        entryFileNames: 'background.js',
        extend: true
      }
    }
  }
})
