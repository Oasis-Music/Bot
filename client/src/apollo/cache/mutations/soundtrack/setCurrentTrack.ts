import { ReactiveVar } from '@apollo/client'
import type { CurrentTrack } from '../../types'

export default (currentTrackVar: ReactiveVar<CurrentTrack>): ((rack: CurrentTrack) => void) => {
  return (track: CurrentTrack): void => {
    track.isPlaying = true
    currentTrackVar({ ...track })
  }
}
