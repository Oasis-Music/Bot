import { setCurrentTrack, playPouse } from './soundtrack'
import { processAccessToken } from './user'

import { currentTrackVar, userVar, isAuthenticatedVar } from '../variables'

export const SoundtrackMutations = {
  setCurrentTrack: setCurrentTrack(currentTrackVar),
  playPouse: playPouse(currentTrackVar)
}

export const UserMutations = {
  processAccessToken: processAccessToken(userVar, isAuthenticatedVar)
}
