import { defineConfig, loadEnv, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
import fs from 'fs'

export default ({ mode = 'development' }: UserConfig) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  const withHttps = process.env.VITE_WITH_HTTPS == 'true' || undefined

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
      port: 3001,
      https: withHttps && {
        key: fs.readFileSync('./cert/localhost.key'),
        cert: fs.readFileSync('./cert/localhost.crt')
      }
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
