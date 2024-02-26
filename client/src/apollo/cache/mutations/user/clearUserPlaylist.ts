import { ReactiveVar } from '@apollo/client'
import type { Soundtrack } from '@/entities/soundtrack'

export default (userPlaylistVar: ReactiveVar<Soundtrack[]>): (() => void) => {
  return (): void => {
    userPlaylistVar([])
  }
}
