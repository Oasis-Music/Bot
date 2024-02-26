import { ReactiveVar } from '@apollo/client'
import type { Soundtrack, CurrentTrack } from '../types'

export function playTrack(currentTrackVar: ReactiveVar<CurrentTrack>): (track: Soundtrack) => void {
  return (track) => {
    const current = currentTrackVar()

    if (current.id && current.id === track.id) return

    currentTrackVar({ ...track, isPlaying: true })
  }
}
