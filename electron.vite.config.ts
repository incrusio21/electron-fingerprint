import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias:{
        '@main': resolve('src/main'),
        '@/lib': resolve('src/main/lib'),
        '@preload': resolve('src/preload'),
        '@models': resolve('src/models'),
        '@schemas': resolve('src/schemas'),
        '@utils': resolve('src/utils'),
        '@fyo': resolve('src/fyo'),
        '@fixtures': resolve('fixtures'),
      }
    }
  },
  preload: {
    resolve: {
      alias: {
        '@preload': resolve('src/preload'),
        '@utils': resolve('src/utils'),
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    assetsInclude: "src/renderer/assets/**",
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@/assets': resolve('src/renderer/src/assets'),
        '@/components': resolve('src/renderer/src/components'),
        '@/pages': resolve('src/renderer/src/pages'),
        '@/utils': resolve('src/renderer/src/utils'),
        '@/hooks': resolve('src/renderer/src/hooks'),
        '@/store': resolve('src/renderer/src/store'),
        '@fyo': resolve('src/fyo'),
        '@models': resolve('src/models'),
        '@schemas': resolve('src/schemas'),
        '@utils': resolve('src/utils'),
        '@fixtures': resolve('fixtures'),
      }
    },
    plugins: [react()]
  }
})
