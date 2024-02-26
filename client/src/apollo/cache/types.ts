export const enum PlaylistType {
  User = 1,
  Explore
}

export type User = {
  id: string
}

export type accessToken = {
  userId: string
  firstName: string
  accessUuid: string
}

export type snackbarEvent = {
  type: 'error' | 'success'
  message: string
}
