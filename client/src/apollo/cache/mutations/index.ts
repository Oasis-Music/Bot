import { setCurrentTrack, playPouse } from './soundtrack'

import { currentTrackVar, currentTrackIdVar, isPlayingVar } from '../variables'

export const SoundtrackMutations = {
  setCurrentTrack: setCurrentTrack(currentTrackVar, currentTrackIdVar, isPlayingVar),
  playPouse: playPouse(isPlayingVar)
}
