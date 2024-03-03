import { AuthStore } from '@/entities/auth'
import { UserStore } from '@/entities/user'

export const useSignIn = () => {
  const signIn = AuthStore.signIn
  const setUser = UserStore.setUser

  return {
    signIn,
    setUser
  }
}
