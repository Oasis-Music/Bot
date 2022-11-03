import { createBrowserHistory } from 'history'

type route = 'root' | 'upload' | 'ui' | 'search' | 'test'

type routeNamesMap = {
  [name in route]: string
}

export const routeNames: routeNamesMap = {
  root: '/',
  upload: '/upload',
  ui: '/ui',
  search: '/search',
  test: '/test'
}

export default createBrowserHistory()
