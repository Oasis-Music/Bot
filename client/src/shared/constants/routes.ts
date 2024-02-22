const enum Routes {
  root,
  explore,
  upload,
  settings,
  auth,
  terms
}

export const ROUTER_NAMES: Record<keyof typeof Routes, string> = {
  root: '/',
  auth: '/auth',
  upload: '/upload',
  terms: '/terms',
  explore: '/explore',
  settings: '/settings'
}
