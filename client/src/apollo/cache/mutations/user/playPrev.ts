import { ReactiveVar } from '@apollo/client'
import type { CurrentTrack, Soundtrack } from '../../types'

export default (
  currentTrackVar: ReactiveVar<CurrentTrack>,
  mainPlaylistVar: ReactiveVar<Soundtrack[]>
): (() => void) => {
  return (): void => {
    const currentTrack = currentTrackVar()
    const playList = mainPlaylistVar()

    const currentTrackIndex = playList.findIndex((track) => track.id === currentTrack.id)

    if (currentTrackIndex - 1 < 0) return

    const prevTrack = playList[currentTrackIndex - 1]
    currentTrackVar({ ...prevTrack, isPlaying: true })
  }
}
