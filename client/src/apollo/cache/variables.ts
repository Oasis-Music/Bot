import { makeVar } from '@apollo/client'
import type { User, CurrentTrack, accessToken } from './types'
import jwtDecode from 'jwt-decode'

// soundtrack
export const currentTrackVar = makeVar<CurrentTrack>({} as CurrentTrack)
export const currentTrackIdVar = makeVar<string>('')
export const isPlayingVar = makeVar<boolean>(false)

// user
export const userVar = makeVar<User>({} as User)

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
