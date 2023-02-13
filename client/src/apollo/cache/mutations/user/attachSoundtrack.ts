import { ReactiveVar } from '@apollo/client'
import type { CurrentTrack, Soundtrack } from '../../types'

export default (
  currentTrackVar: ReactiveVar<CurrentTrack>,
  userPlaylistVar: ReactiveVar<Soundtrack[]>
): (() => void) => {
  return (): void => {
    const currentTrack = currentTrackVar()
    const playlist = userPlaylistVar()
    currentTrack.attached = true

    playlist.unshift({ ...currentTrack } as Soundtrack)

    userPlaylistVar([...playlist])
    currentTrackVar({ ...currentTrack })
  }
}
