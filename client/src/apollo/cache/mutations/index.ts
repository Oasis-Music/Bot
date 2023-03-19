import {
  currentTrackVar,
  userVar,
  isAuthenticatedVar,
  mainPlaylistVar,
  userPlaylistVar,
  explorePlaylistVar
} from '../variables'
import { bindMainPlaylist } from './playlist'

import { setCurrentTrack, playPouse, setExplorePlaylist } from './soundtrack'
import {
  playNext,
  playPrev,
  processAccessToken,
  setUserPlaylist,
  attachSoundtrack,
  unattachSoundtrack,
  logout
} from './user'

export const SoundtrackMutations = {
  setCurrentTrack: setCurrentTrack(currentTrackVar),
  playPouse: playPouse(currentTrackVar),
  setExplorePlaylist: setExplorePlaylist(explorePlaylistVar)
}

export const UserMutations = {
  playNext: playNext(currentTrackVar, mainPlaylistVar),
  playPrev: playPrev(currentTrackVar, mainPlaylistVar),
  setUserPlaylist: setUserPlaylist(userPlaylistVar),
  attachSoundtrack: attachSoundtrack(currentTrackVar, userPlaylistVar),
  unattachSoundtrack: unattachSoundtrack(currentTrackVar, userPlaylistVar),
  processAccessToken: processAccessToken(userVar, isAuthenticatedVar),
  logout: logout(userVar, isAuthenticatedVar)
}

export const PlaylistMutations = {
  bindMainPlaylist: bindMainPlaylist(mainPlaylistVar, userPlaylistVar, explorePlaylistVar)
}
