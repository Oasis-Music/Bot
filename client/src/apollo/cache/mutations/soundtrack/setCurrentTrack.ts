import { ReactiveVar } from '@apollo/client'
import type { CurrentTrack } from '../../types'

export default (currentTrackVar: ReactiveVar<CurrentTrack>): ((rack: CurrentTrack) => void) => {
  return (newCurrentTrack: CurrentTrack): void => {
    const current = currentTrackVar()
    if (current.id === newCurrentTrack.id) return

    newCurrentTrack.isPlaying = true
    currentTrackVar({ ...newCurrentTrack })
  }
}
