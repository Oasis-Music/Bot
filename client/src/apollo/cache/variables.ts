import { makeVar } from '@apollo/client'
import type { User, accessToken, snackbarEvent } from './types'
// TEMP
import type { Soundtrack } from '@/entities/soundtrack'
///
import jwtDecode from 'jwt-decode'

// ui
export const isSnackbarOpenVar = makeVar<boolean>(false)
export const snackbarEventVar = makeVar<snackbarEvent>({
  type: 'success',
  message: ''
})

// soundtrack
export const explorePlaylistVar = makeVar<Soundtrack[]>([])

// user
export const userVar = makeVar<User>({} as User)
export const userPlaylistVar = makeVar<Soundtrack[]>([])
// export const userPlaylistLoadedVar = makeVar<boolean>(false)

// playlist
export const mainPlaylistVar = makeVar<Soundtrack[]>([])

// TODO: find better place for this
function checkAuth(): boolean {
  try {
    const at = localStorage.getItem('at') || ''
    if (!at) {
      return false
    }

    const token = jwtDecode<accessToken>(at)

    userVar({
      id: token.userId
    })

    return true
  } catch (error) {
    console.log(error)

    localStorage.removeItem('at')

    return false
  }
}

export const isAuthenticatedVar = makeVar<boolean>(checkAuth())
