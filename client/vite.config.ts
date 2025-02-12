import { defineConfig, loadEnv, type UserConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import svg from '@neodx/svg/vite'
import viteReact from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default ({ mode = 'development' }: UserConfig) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  const isDev = mode === 'development'
  const withHttps = process.env.VITE_WITH_HTTPS == 'true' || undefined

  return defineConfig({
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
      TanStackRouterVite({
        autoCodeSplitting: true,
        routesDirectory: './src/pages/routes',
        generatedRouteTree: './src/shared/lib/routeTree.gen.ts'
      }),
      viteReact(),
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
      port: 3001,
      host: true
    },
    build: {
      outDir: 'build'
    }
    // define: {
    //   'process.env.NODE_ENV': `"${mode}"`
    // }
  })
}
