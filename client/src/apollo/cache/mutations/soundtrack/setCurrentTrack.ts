import { ReactiveVar } from '@apollo/client'
import type { Soundtrack, CurrentTrack } from '@/entities/soundtrack'

export default (currentTrackVar: ReactiveVar<CurrentTrack>): ((track: Soundtrack) => void) => {
  return (track) => {
    const current = currentTrackVar()
    if (current.id === track.id) return

    currentTrackVar({ ...track, isPlaying: true })
  }
}
