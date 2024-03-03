import { ReactiveVar, makeVar } from '@apollo/client'
import { jwtDecode } from 'jwt-decode'
import type { AccessToken } from './types'

export const isAuthenticatedVar = makeVar(false)

const AT_KEY = 'at'
const RT_KEY = 'rt'

export const AuthStore = {
  signIn: signIn(isAuthenticatedVar),
  logout: logout(isAuthenticatedVar),
  checkAuth: checkAuth()
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

function logout(isAuthenticatedVar: ReactiveVar<boolean>): () => void {
  return () => {
    isAuthenticatedVar(false)
    localStorage.removeItem(AT_KEY)
    localStorage.removeItem(RT_KEY)
  }
}

export function checkAuth(): () => [string, string] | null {
  return () => {
    const at = localStorage.getItem(AT_KEY)
    const rt = localStorage.getItem(RT_KEY)

    if (at === null || rt === null) return null

    return [at, rt]
  }
}
