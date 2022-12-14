import { ReactiveVar } from '@apollo/client'
import type { CurrentTrack } from '../../types'

export default (currentTrackVar: ReactiveVar<CurrentTrack>): (() => void) => {
  return (): void => {
    const t = currentTrackVar()
    t.isPlaying = !t.isPlaying
    currentTrackVar({ ...t })
  }
}
