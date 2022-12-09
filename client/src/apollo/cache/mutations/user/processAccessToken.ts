import { ReactiveVar } from '@apollo/client'
import jwtDecode from 'jwt-decode'
import type { User, accessToken } from '../../types'

export default (
  userVar: ReactiveVar<User>,
  isAuthenticatedVar: ReactiveVar<boolean>
): ((token: string) => boolean) => {
  return (token: string): boolean => {
    try {
      const decoded = jwtDecode<accessToken>(token)
      console.log(decoded)

      localStorage.setItem('at', token)

      userVar({
        id: decoded.userId
      })

      isAuthenticatedVar(true)

      return true
    } catch (error) {
      console.log(error)

      return false
    }
  }
}
