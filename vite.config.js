import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 750,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined
          }

          if (id.includes('three/examples')) {
            return 'three-extras'
          }

          if (id.includes('@react-three/fiber')) {
            return 'react-three-fiber'
          }

          if (id.includes('/three/src/renderers/')) {
            return 'three-renderers'
          }

          if (
            id.includes('/three/src/math/') ||
            id.includes('/three/src/core/')
          ) {
            return 'three-foundation'
          }

          if (
            id.includes('/three/src/geometries/') ||
            id.includes('/three/src/materials/') ||
            id.includes('/three/src/objects/') ||
            id.includes('/three/src/lights/') ||
            id.includes('/three/src/scenes/') ||
            id.includes('/three/src/cameras/') ||
            id.includes('/three/src/textures/')
          ) {
            return 'three-scene'
          }

          if (id.includes('/three/')) {
            return 'three-misc'
          }

          if (id.includes('react-dom') || id.includes('/react/')) {
            return 'react-vendor'
          }

          return undefined
        },
      },
    },
  },
})
