// import { createBrowserRouter } from 'react-router-dom'

type RouteName = 'root' | 'upload' | 'ui' | 'explore' | 'auth' | 'settings'

export const routeNames: Record<RouteName, string> = {
  root: '/',
  auth: '/auth',
  upload: '/upload',
  ui: '/ui',
  explore: '/explore',
  settings: '/settings'
}

// export default createBrowserRouter()
