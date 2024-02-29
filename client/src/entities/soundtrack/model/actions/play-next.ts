import { ReactiveVar } from '@apollo/client'
import type { CurrentTrack, Soundtrack } from '@/entities/soundtrack'

export function playNext(
  currentTrackVar: ReactiveVar<CurrentTrack>,
  mainPlaylistVar: ReactiveVar<Soundtrack[]>
): () => void {
  return () => {
    const currentTrack = currentTrackVar()
    const playList = mainPlaylistVar()

    const currentTrackIndex = playList.findIndex((track) => track.id === currentTrack.id)

    if (currentTrackIndex + 1 === playList.length) return

    const nextTrack = playList[currentTrackIndex + 1]

    currentTrackVar({ ...nextTrack, isPlaying: true })
  }
}
