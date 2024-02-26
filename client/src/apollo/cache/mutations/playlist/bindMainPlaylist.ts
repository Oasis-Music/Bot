import { ReactiveVar } from '@apollo/client'
import type { Soundtrack } from '@/entities/soundtrack'
import { PlaylistType } from '../../types'

export default (
  mainPlaylistVar: ReactiveVar<Soundtrack[]>,
  userPlaylistVar: ReactiveVar<Soundtrack[]>,
  explorePlaylistVar: ReactiveVar<Soundtrack[]>
): ((p: keyof typeof PlaylistType) => void) => {
  return (playlist: keyof typeof PlaylistType): void => {
    let target: Soundtrack[] = []

    switch (playlist) {
      case 'User':
        target = userPlaylistVar()
        break
      case 'Explore':
        target = explorePlaylistVar()
        break
    }

    mainPlaylistVar(target)
  }
}
