import { ReactiveVar } from '@apollo/client'
import type { Soundtrack } from '../types'

export function setExplorePlaylist(
  explorePlaylistVar: ReactiveVar<Soundtrack[]>
): (tracks: Soundtrack[]) => void {
  return (tracks) => {
    const prevTracks = explorePlaylistVar()

    if (prevTracks.length) {
      explorePlaylistVar([...prevTracks, ...tracks])
    } else {
      explorePlaylistVar([...tracks])
    }
  }
}
