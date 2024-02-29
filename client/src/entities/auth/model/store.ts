import { ReactiveVar, makeVar } from '@apollo/client'
import { jwtDecode } from 'jwt-decode'
import type { AccessToken } from './types'

export const isAuthenticatedVar = makeVar(false)

const AT_KEY = 'at'
const RT_KEY = 'rt'

export const AuthStore = {
  signIn: signIn(isAuthenticatedVar)
}

export const isTokenValid = (token: string): boolean => {
  try {
    jwtDecode<AccessToken>(token)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

function signIn(
  isAuthenticatedVar: ReactiveVar<boolean>
): (at: string, rt: string) => AccessToken | null {
  return (accessToken, refreshToken) => {
    try {
      const tokenData = jwtDecode<AccessToken>(accessToken)
      isAuthenticatedVar(true)

      localStorage.setItem(AT_KEY, accessToken)
      localStorage.setItem(RT_KEY, refreshToken)

      return tokenData
    } catch (err) {
      console.warn('sigin err', (err as Error).message)
      return null
    }
  }
}
