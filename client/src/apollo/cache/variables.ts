import { makeVar } from '@apollo/client'
import type { User, Soundtrack, CurrentTrack, accessToken } from './types'
import jwtDecode from 'jwt-decode'

// soundtrack
export const currentTrackVar = makeVar<CurrentTrack>({} as CurrentTrack)

// user
export const userVar = makeVar<User>({} as User)
export const userPlaylistVar = makeVar<Soundtrack[]>([])
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
