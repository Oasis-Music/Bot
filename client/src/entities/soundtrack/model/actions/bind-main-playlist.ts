import { ReactiveVar } from '@apollo/client'
import type { PlaylistType, Soundtrack } from '../types'

export function bindMainPlaylist(
  mainPlaylistVar: ReactiveVar<Soundtrack[]>,
  userPlaylistVar: ReactiveVar<Soundtrack[]>,
  explorePlaylistVar: ReactiveVar<Soundtrack[]>
): (p: PlaylistType) => void {
  return (playlist) => {
    let target: Soundtrack[] = []

    switch (playlist) {
      case 'user':
        target = userPlaylistVar()
        break
      case 'explore':
        target = explorePlaylistVar()
        break
    }

    mainPlaylistVar(target)
  }
}
