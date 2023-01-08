import { ReactiveVar } from '@apollo/client'
import type { User } from '../../types'

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
