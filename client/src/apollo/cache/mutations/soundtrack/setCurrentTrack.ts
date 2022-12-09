import { ReactiveVar } from '@apollo/client'
import type { CurrentTrack } from '../../types'

export default (
  currentTrackVar: ReactiveVar<CurrentTrack>,
  currentTrackIdVar: ReactiveVar<string>,
  isPlayingVar: ReactiveVar<boolean>
): ((rack: CurrentTrack) => void) => {
  return (track: CurrentTrack): void => {
    currentTrackVar(track)
    currentTrackIdVar(track.id)
    isPlayingVar(true)
  }
}
