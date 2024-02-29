import { userVar, isAuthenticatedVar } from '../variables'

import { userPlaylistVar } from '@/entities/soundtrack'

import { currentTrackVar } from '@/entities/soundtrack'

import { processAccessToken, attachSoundtrack, unattachSoundtrack, logout } from './user'

export const UserMutations = {
  attachSoundtrack: attachSoundtrack(currentTrackVar, userPlaylistVar),
  unattachSoundtrack: unattachSoundtrack(currentTrackVar, userPlaylistVar),
  processAccessToken: processAccessToken(userVar, isAuthenticatedVar),
  logout: logout(userVar, isAuthenticatedVar)
}
