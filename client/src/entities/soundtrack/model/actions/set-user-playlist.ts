import { ReactiveVar } from '@apollo/client'
import type { Soundtrack } from '@/entities/soundtrack'

export function setUserPlaylist(
  userPlaylistVar: ReactiveVar<Soundtrack[]>
): (tracks: Soundtrack[]) => void {
  return (tracks) => {
    const playlist = userPlaylistVar()

    if (playlist.length) {
      userPlaylistVar([...playlist, ...tracks])
    } else {
      userPlaylistVar([...tracks])
    }
  }
}
