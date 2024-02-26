import { ReactiveVar } from '@apollo/client'
import type { CurrentTrack } from '../types'

export function playPause(currentTrackVar: ReactiveVar<CurrentTrack>): () => void {
  return (): void => {
    const t = currentTrackVar()
    t.isPlaying = !t.isPlaying
    currentTrackVar({ ...t })
  }
}
