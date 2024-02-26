import { ReactiveVar } from '@apollo/client'
import type { Soundtrack } from '@/entities/soundtrack'

export default (explorePlaylistVar: ReactiveVar<Soundtrack[]>): (() => void) => {
  return (): void => {
    explorePlaylistVar([])
  }
}
