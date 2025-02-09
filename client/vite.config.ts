import { defineConfig, loadEnv, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import tailwindcss from '@tailwindcss/vite'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
import fs from 'fs'
import svg from '@neodx/svg/vite'

export default ({ mode = 'development' }: UserConfig) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  const isDev = mode === 'development'
  const withHttps = process.env.VITE_WITH_HTTPS == 'true' || undefined

  return defineConfig({
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/app/styles/main.scss" as *;`
        }
      }
    },
    define: {
      // info: https://www.apollographql.com/docs/react/development-testing/reducing-bundle-size
      'globalThis.__DEV__': isDev ? 'true' : 'false'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      react(),
      svgr(),
      viteTsconfigPaths(),
      tailwindcss(),
      svg({
        root: 'src/shared/assets/svg-icons',
        output: 'public/sprites',
        group: true,
        fileName: '{name}.{hash:8}.svg',
        metadata: {
          path: 'src/shared/lib/sprite.gen.ts',
          runtime: {
            size: true,
            viewBox: true
          }
        }
      })
    ],
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
