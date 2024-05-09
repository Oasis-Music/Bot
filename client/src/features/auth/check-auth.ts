import { AuthStore, accessTokenVar } from '@/entities/auth'
import { UserStore } from '@/entities/user'

export function checkAuth(): Promise<void> {
  return new Promise((res, rej) => {
    const token = accessTokenVar()
    if (token) {
      const authData = AuthStore.signIn(token)
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
