import { ReactiveVar } from '@apollo/client'
import type { Soundtrack } from '../../types'

export default (explorePlaylistVar: ReactiveVar<Soundtrack[]>): (() => void) => {
  return (): void => {
    explorePlaylistVar([])
  }
}
