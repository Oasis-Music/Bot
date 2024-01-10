import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default ({ mode }: { mode: boolean }) => {
  return defineConfig({
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
