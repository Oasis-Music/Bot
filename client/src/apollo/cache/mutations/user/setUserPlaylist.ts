import { ReactiveVar } from '@apollo/client'
import type { Soundtrack } from '../../types'

export default (userPlaylistVar: ReactiveVar<Soundtrack[]>): ((tracks: Soundtrack[]) => void) => {
  return (tracks): void => {
    userPlaylistVar([...tracks])
  }
}
