import { ReactiveVar } from '@apollo/client'
import { type Soundtrack, USER_PLAYLIST_PAGINATION_LEN } from '@/entities/soundtrack'

export function setUserPlaylist(
  userPlaylistVar: ReactiveVar<Soundtrack[]>
): (tracks: Soundtrack[]) => void {
  return (tracks) => {
    if (!tracks.length) return

    const playlist = userPlaylistVar()

    if (playlist.length > USER_PLAYLIST_PAGINATION_LEN) {
      userPlaylistVar([...playlist, ...tracks])
    } else {
      userPlaylistVar([...tracks])
    }
  }
}
