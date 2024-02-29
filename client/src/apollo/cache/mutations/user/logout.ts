import { ReactiveVar } from '@apollo/client'
import type { User } from '@/entities/user'

export default (
  userVar: ReactiveVar<User | null>,
  isAuthenticatedVar: ReactiveVar<boolean>
): (() => void) => {
  return (): void => {
    localStorage.removeItem('at')
    localStorage.removeItem('rt')

    isAuthenticatedVar(false)
    userVar(undefined)
  }
}
