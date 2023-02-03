import { createBrowserHistory } from 'history'

type RouteName = 'root' | 'upload' | 'ui' | 'explore' | 'test' | 'auth' | 'settings'

export const routeNames: Record<RouteName, string> = {
  root: '/',
  auth: '/auth',
  upload: '/upload',
  ui: '/ui',
  explore: '/explore',
  test: '/test',
  settings: '/settings'
}

export default createBrowserHistory()
