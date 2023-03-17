import { setCurrentTrack, playPouse, playNext, playPrev } from './soundtrack'
import {
  processAccessToken,
  setUserPlaylist,
  attachSoundtrack,
  unattachSoundtrack,
  logout
} from './user'

import { currentTrackVar, userVar, isAuthenticatedVar, userPlaylistVar } from '../variables'

export const SoundtrackMutations = {
  setCurrentTrack: setCurrentTrack(currentTrackVar),
  playPouse: playPouse(currentTrackVar),
  playNext: playNext(currentTrackVar, userPlaylistVar),
  playPrev: playPrev(currentTrackVar, userPlaylistVar)
}

export const UserMutations = {
  setUserPlaylist: setUserPlaylist(userPlaylistVar),
  attachSoundtrack: attachSoundtrack(currentTrackVar, userPlaylistVar),
  unattachSoundtrack: unattachSoundtrack(currentTrackVar, userPlaylistVar),
  processAccessToken: processAccessToken(userVar, isAuthenticatedVar),
  logout: logout(userVar, isAuthenticatedVar)
}
