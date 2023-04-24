import {
  currentTrackVar,
  userVar,
  isAuthenticatedVar,
  mainPlaylistVar,
  userPlaylistVar,
  explorePlaylistVar,
  isSnackbarOpenVar,
  snackbarEventVar
} from '../variables'
import { bindMainPlaylist } from './playlist'

import { setCurrentTrack, playPouse, setExplorePlaylist, clearExplorePlaylist } from './soundtrack'
import {
  playNext,
  playPrev,
  processAccessToken,
  setUserPlaylist,
  clearUserPlaylist,
  attachSoundtrack,
  unattachSoundtrack,
  logout
} from './user'

import { openSnackbar, closeSnackbar } from './ui'

export const SoundtrackMutations = {
  setCurrentTrack: setCurrentTrack(currentTrackVar),
  playPouse: playPouse(currentTrackVar),
  setExplorePlaylist: setExplorePlaylist(explorePlaylistVar),
  clearExplorePlaylist: clearExplorePlaylist(explorePlaylistVar)
}

export const UserMutations = {
  playNext: playNext(currentTrackVar, mainPlaylistVar),
  playPrev: playPrev(currentTrackVar, mainPlaylistVar),
  setUserPlaylist: setUserPlaylist(userPlaylistVar),
  clearUserPlaylist: clearUserPlaylist(userPlaylistVar),
  attachSoundtrack: attachSoundtrack(currentTrackVar, userPlaylistVar),
  unattachSoundtrack: unattachSoundtrack(currentTrackVar, userPlaylistVar),
  processAccessToken: processAccessToken(userVar, isAuthenticatedVar),
  logout: logout(userVar, isAuthenticatedVar)
}

export const PlaylistMutations = {
  bindMainPlaylist: bindMainPlaylist(mainPlaylistVar, userPlaylistVar, explorePlaylistVar)
}

export const UiMutations = {
  openSnackbar: openSnackbar(isSnackbarOpenVar, snackbarEventVar),
  closeSnackbar: closeSnackbar(isSnackbarOpenVar, snackbarEventVar)
}
