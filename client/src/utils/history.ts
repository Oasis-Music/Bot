import { createBrowserHistory } from 'history'

type RouteName = 'root' | 'upload' | 'ui' | 'search' | 'test'

export const routeNames: Record<RouteName, string> = {
  root: '/',
  upload: '/upload',
  ui: '/ui',
  search: '/search',
  test: '/test'
}

export default createBrowserHistory()
