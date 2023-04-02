import { ReactiveVar } from '@apollo/client'
import type { Soundtrack } from '../../types'

export default (
  explorePlaylistVar: ReactiveVar<Soundtrack[]>
): ((tracks: Soundtrack[]) => void) => {
  return (tracks): void => {
    const prevTracks = explorePlaylistVar()

    if (prevTracks.length) {
      explorePlaylistVar([...prevTracks, ...tracks])
    } else {
      explorePlaylistVar([...tracks])
    }
  }
}
