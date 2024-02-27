import { userVar, isAuthenticatedVar, isSnackbarOpenVar, snackbarEventVar } from '../variables'

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

import { openSnackbar, closeSnackbar } from './ui'

export const UserMutations = {
  playNext: playNext(currentTrackVar, mainPlaylistVar),
  playPrev: playPrev(currentTrackVar, mainPlaylistVar),
  attachSoundtrack: attachSoundtrack(currentTrackVar, userPlaylistVar),
  unattachSoundtrack: unattachSoundtrack(currentTrackVar, userPlaylistVar),
  processAccessToken: processAccessToken(userVar, isAuthenticatedVar),
  logout: logout(userVar, isAuthenticatedVar)
}

export const UiMutations = {
  openSnackbar: openSnackbar(isSnackbarOpenVar, snackbarEventVar),
  closeSnackbar: closeSnackbar(isSnackbarOpenVar, snackbarEventVar)
}
