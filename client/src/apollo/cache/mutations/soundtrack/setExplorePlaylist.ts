import { ReactiveVar } from '@apollo/client'
import type { Soundtrack } from '../../types'

export default (
  explorePlaylistVar: ReactiveVar<Soundtrack[]>
): ((tracks: Soundtrack[]) => void) => {
  return (tracks): void => {
    explorePlaylistVar([...tracks])
  }
}
