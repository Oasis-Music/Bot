import { setCurrentTrack, playPouse } from './soundtrack'
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
  playPouse: playPouse(currentTrackVar)
}

export const UserMutations = {
  setUserPlaylist: setUserPlaylist(userPlaylistVar),
  attachSoundtrack: attachSoundtrack(currentTrackVar, userPlaylistVar),
  unattachSoundtrack: unattachSoundtrack(currentTrackVar, userPlaylistVar),
  processAccessToken: processAccessToken(userVar, isAuthenticatedVar),
  logout: logout(userVar, isAuthenticatedVar)
}
