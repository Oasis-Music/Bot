import { makeVar } from '@apollo/client'
import type { CurrentTrack } from './types'

export const currentTrackVar = makeVar<CurrentTrack>({
  isPlaying: false,
  id: '',
  title: '',
  author: '',
  duration: 0,
  coverURL: null,
  audioURL: '',
  attached: false
})

import { playTrack, playPause } from './actions'

export const SoundtrackStore = {
  play: playTrack(currentTrackVar),
  playPause: playPause(currentTrackVar)
}
