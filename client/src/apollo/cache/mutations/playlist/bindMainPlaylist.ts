import { ReactiveVar } from '@apollo/client'
import type { Soundtrack } from '../../types'
import { Playlist } from '../../types'

export default (
  mainPlaylistVar: ReactiveVar<Soundtrack[]>,
  userPlaylistVar: ReactiveVar<Soundtrack[]>,
  explorePlaylistVar: ReactiveVar<Soundtrack[]>
): ((p: Playlist) => void) => {
  return (playlist: Playlist): void => {
    let target: Soundtrack[] = []

    switch (playlist) {
      case Playlist.User:
        target = userPlaylistVar()
        break
      case Playlist.Explore:
        target = explorePlaylistVar()
        break
    }

    mainPlaylistVar(target)
  }
}
