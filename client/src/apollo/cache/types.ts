export type User = {
  id: string
}

export type Soundtrack = {
  id: string
  title: string
  author: string
  duration: number
  coverURL?: string | null | undefined
  audioURL: string
  attached: boolean
}

export type CurrentTrack = {
  id: string
  title: string
  author: string
  duration: number
  coverURL?: string | null | undefined
  audioURL: string
  isPlaying: boolean
  attached: boolean // without user context always - false
}

export type accessToken = {
  userId: string
  firstName: string
  accessUuid: string
}