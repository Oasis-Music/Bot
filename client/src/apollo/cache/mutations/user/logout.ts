import { ReactiveVar } from '@apollo/client'
import jwtDecode from 'jwt-decode'
import type { User, accessToken } from '../../types'

export default (
  userVar: ReactiveVar<User>,
  isAuthenticatedVar: ReactiveVar<boolean>
): (() => void) => {
  return (): void => {
    localStorage.removeItem('at')
    localStorage.removeItem('rt')

    isAuthenticatedVar(false)
    userVar(undefined)
  }
}
