import { ReactiveVar, makeVar } from '@apollo/client'
import type { User } from './types'

export const userVar = makeVar<User | null>(null)

export const UserStore = {
  setUser: setUser(userVar)
}

function setUser(userVar: ReactiveVar<User | null>): (user: User) => void {
  return (user) => {
    userVar({ ...user })
  }
}
