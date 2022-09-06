import { ReactiveVar } from '@apollo/client'
import type { currentTrack } from '../../variables'

export default (
  currentTrackVar: ReactiveVar<currentTrack>,
  currentTrackIdVar: ReactiveVar<string>,
  isPlayingVar: ReactiveVar<boolean>
): ((rack: currentTrack) => void) => {
  return (track: currentTrack): void => {
    currentTrackVar(track)
    currentTrackIdVar(track.id)
    isPlayingVar(true)
  }
}
