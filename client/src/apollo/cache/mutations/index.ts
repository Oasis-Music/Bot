import { userVar, isAuthenticatedVar } from '../variables'

import { mainPlaylistVar, userPlaylistVar } from '@/entities/soundtrack'

import { currentTrackVar } from '@/entities/soundtrack'

import {
  playNext,
  playPrev,
  processAccessToken,
  attachSoundtrack,
  unattachSoundtrack,
  logout
} from './user'

export const UserMutations = {
  playNext: playNext(currentTrackVar, mainPlaylistVar),
  playPrev: playPrev(currentTrackVar, mainPlaylistVar),
  attachSoundtrack: attachSoundtrack(currentTrackVar, userPlaylistVar),
  unattachSoundtrack: unattachSoundtrack(currentTrackVar, userPlaylistVar),
  processAccessToken: processAccessToken(userVar, isAuthenticatedVar),
  logout: logout(userVar, isAuthenticatedVar)
}
