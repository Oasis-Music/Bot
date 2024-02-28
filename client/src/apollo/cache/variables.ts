import { makeVar } from '@apollo/client'
import type { User, accessToken } from './types'
import jwtDecode from 'jwt-decode'

// user
export const userVar = makeVar<User>({} as User)
// export const userPlaylistLoadedVar = makeVar<boolean>(false)

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
