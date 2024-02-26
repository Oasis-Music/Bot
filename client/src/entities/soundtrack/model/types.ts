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
