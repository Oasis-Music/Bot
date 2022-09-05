import { setCurrentTrack } from './soundtrack'

import { currentTrackVar, currentTrackIdVar } from '../variables'

export const SoundtrackMutations = {
  setCurrentTrack: setCurrentTrack(currentTrackVar, currentTrackIdVar)
}
