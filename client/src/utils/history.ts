import { createBrowserHistory } from 'history'

type RouteName = 'root' | 'upload' | 'ui' | 'search' | 'test' | 'auth'

export const routeNames: Record<RouteName, string> = {
  root: '/',
  auth: '/auth',
  upload: '/upload',
  ui: '/ui',
  search: '/search',
  test: '/test'
}

export default createBrowserHistory()
