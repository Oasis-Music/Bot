import { ReactiveVar, makeVar } from '@apollo/client'
import { jwtDecode } from 'jwt-decode'
import type { AccessToken } from './types'

export const isAuthenticatedVar = makeVar(false)
export const accessTokenVar = makeVar<string | null>(null)

export const AuthStore = {
  signIn: signIn(isAuthenticatedVar, accessTokenVar),
  logout: logout(isAuthenticatedVar, accessTokenVar)
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
  isAuthenticatedVar: ReactiveVar<boolean>,
  accessTokenVar: ReactiveVar<string | null>
): (accessToken: string) => AccessToken | null {
  return (accessToken) => {
    try {
      const tokenData = jwtDecode<AccessToken>(accessToken)
      isAuthenticatedVar(true)
      accessTokenVar(accessToken)

      return tokenData
    } catch (err) {
      console.warn('sigin err', (err as Error).message)
      return null
    }
  }
}

function logout(
  isAuthenticatedVar: ReactiveVar<boolean>,
  accessTokenVar: ReactiveVar<string | null>
): () => void {
  return () => {
    isAuthenticatedVar(false)
    accessTokenVar(null)
  }
}
