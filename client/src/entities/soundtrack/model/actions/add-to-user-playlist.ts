import { ReactiveVar } from '@apollo/client'
import type { CurrentTrack, Soundtrack } from '@/entities/soundtrack'

export function addToUserPlaylist(
  currentTrackVar: ReactiveVar<CurrentTrack>,
  userPlaylistVar: ReactiveVar<Soundtrack[]>
): () => void {
  return () => {
    const currentTrack = currentTrackVar()
    const playlist = userPlaylistVar()
    currentTrack.attached = true

    playlist.unshift({ ...currentTrack } as Soundtrack)

    userPlaylistVar([...playlist])
    currentTrackVar({ ...currentTrack })
  }
}
