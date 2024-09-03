import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias:{
        '@/lib': resolve('src/main/lib'),
        '@utils': resolve('src/utils'),
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    assetsInclude: "src/renderer/assets/**",
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@/assets': resolve('src/renderer/src/assets'),
        '@/components': resolve('src/renderer/src/components'),
        '@/utils': resolve('src/renderer/src/utils'),
        '@utils': resolve('src/utils'),
      }
    },
    plugins: [react()]
  }
})
