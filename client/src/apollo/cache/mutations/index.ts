import { setCurrentTrack, playPouse } from './soundtrack'
import { processAccessToken, logout } from './user'

import { currentTrackVar, userVar, isAuthenticatedVar } from '../variables'

export const SoundtrackMutations = {
  setCurrentTrack: setCurrentTrack(currentTrackVar),
  playPouse: playPouse(currentTrackVar)
}

export const UserMutations = {
  logout: logout(userVar, isAuthenticatedVar),
  processAccessToken: processAccessToken(userVar, isAuthenticatedVar)
}
