import { setCurrentTrack, playPouse } from './soundtrack'
import { processAccessToken } from './user'

import {
  currentTrackVar,
  currentTrackIdVar,
  isPlayingVar,
  userVar,
  isAuthenticatedVar
} from '../variables'

export const SoundtrackMutations = {
  setCurrentTrack: setCurrentTrack(currentTrackVar, currentTrackIdVar, isPlayingVar),
  playPouse: playPouse(isPlayingVar)
}

export const UserMutations = {
  processAccessToken: processAccessToken(userVar, isAuthenticatedVar)
}
