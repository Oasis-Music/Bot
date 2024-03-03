import { ReactiveVar } from '@apollo/client'
import type { CurrentTrack, Soundtrack } from '@/entities/soundtrack'

export function removeFormUserPlaylist(
  currentTrackVar: ReactiveVar<CurrentTrack>,
  userPlaylistVar: ReactiveVar<Soundtrack[]>
): () => void {
  return () => {
    const currentTrack = currentTrackVar()
    const playlist = userPlaylistVar()

    currentTrack.attached = false
    const filteredTracks = playlist.filter((track) => track.id !== currentTrack.id)

    currentTrackVar({ ...currentTrack })
    userPlaylistVar([...filteredTracks])
  }
}
