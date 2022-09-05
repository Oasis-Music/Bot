import { makeVar } from '@apollo/client'

interface currentTrack {
  id: string
  title: string
  author: string
  duration: number
  coverImage: string
  fileURL: string
  isPlaying: boolean
}

export const currentTrackVar = makeVar<currentTrack>({} as currentTrack)
export const currentTrackIdVar = makeVar<string>('')

export type { currentTrack }
