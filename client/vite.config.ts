import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default ({ mode }: { mode: boolean }) => {
  return defineConfig({
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/app/styles/main.scss" as *;`
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [react(), svgr(), viteTsconfigPaths()],
    server: {
      port: 3001
    },
    preview: {
      open: false,
      port: 3001
    },
    build: {
      outDir: 'build'
    }
    // define: {
    //   'process.env.NODE_ENV': `"${mode}"`
    // }
  })
}
