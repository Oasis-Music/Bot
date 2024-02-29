import { AuthStore } from '@/entities/auth'
import { UserStore } from '@/entities/user'

export function checkAuth(): Promise<void> {
  return new Promise((res, rej) => {
    const auth = AuthStore.checkAuth()
    if (auth) {
      const [at, rt] = auth
      const authData = AuthStore.signIn(at, rt)
      if (!authData) {
        AuthStore.logout()
        UserStore.clearUser()
        rej()
        return
      }

      UserStore.setUser({
        id: authData.userId
      })

      res()
    } else {
      AuthStore.logout()
      rej()
    }
  })
}
