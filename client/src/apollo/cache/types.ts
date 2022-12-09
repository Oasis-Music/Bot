export type User = {
  id: string
}

export type CurrentTrack = {
  id: string
  title: string
  author: string
  duration: number
  coverImage: string
  fileURL: string
  isPlaying: boolean
}

export type accessToken = {
  userId: string
  firstName: string
  accessUuid: string
}
