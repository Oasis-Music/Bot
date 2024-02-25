export const enum PlaylistType {
  User = 1,
  Explore
}

export type User = {
  id: string
}

export type Soundtrack = {
  id: string
  title: string
  author: string
  duration: number
  coverURL: string | null
  audioURL: string
  attached: boolean // INFO: without user context always - false
}

export interface CurrentTrack extends Soundtrack {
  isPlaying: boolean
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
