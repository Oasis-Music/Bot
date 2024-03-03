import { makeVar } from '@apollo/client'
import type { Soundtrack, CurrentTrack } from './types'

export const mainPlaylistVar = makeVar<Soundtrack[]>([])

export const userPlaylistVar = makeVar<Soundtrack[]>([])
export const explorePlaylistVar = makeVar<Soundtrack[]>([])

export const currentTrackVar = makeVar<CurrentTrack>({
  isPlaying: false,
  id: '',
  title: '',
  author: '',
  duration: 0,
  coverURL: null,
  audioURL: '',
  attached: false
})

import {
  playTrack,
  playPause,
  setExplorePlaylist,
  setUserPlaylist,
  bindMainPlaylist,
  playNext,
  playPrev,
  addToUserPlaylist,
  removeFormUserPlaylist
} from './actions'

export const SoundtrackStore = {
  play: playTrack(currentTrackVar),
  playPause: playPause(currentTrackVar),
  setExplorePlaylist: setExplorePlaylist(explorePlaylistVar),
  setUserPlaylist: setUserPlaylist(userPlaylistVar),
  bindMainPlaylist: bindMainPlaylist(mainPlaylistVar, userPlaylistVar, explorePlaylistVar),
  playNext: playNext(currentTrackVar, mainPlaylistVar),
  playPrev: playPrev(currentTrackVar, mainPlaylistVar),
  addToUserPlaylist: addToUserPlaylist(currentTrackVar, userPlaylistVar),
  removeFormUserPlaylist: removeFormUserPlaylist(currentTrackVar, userPlaylistVar)
}
