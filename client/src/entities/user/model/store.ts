import { ReactiveVar, makeVar } from '@apollo/client'
import type { User } from './types'

export const userVar = makeVar<User | null>(null)

export const UserStore = {
  setUser: setUser(userVar),
  clearUser: clearUser(userVar)
}

function setUser(userVar: ReactiveVar<User | null>): (user: User) => void {
  return (user) => {
    userVar({ ...user })
  }
}

function clearUser(userVar: ReactiveVar<User | null>): () => void {
  return () => {
    userVar(null)
  }
}
