import { ReactiveVar } from '@apollo/client'
import type { Soundtrack } from '../../types'

export default (userPlaylistVar: ReactiveVar<Soundtrack[]>): (() => void) => {
  return (): void => {
    userPlaylistVar([])
  }
}
