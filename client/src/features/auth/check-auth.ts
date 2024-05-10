import { UserStore } from '@/entities/user'
import { AuthStore } from '@/entities/auth'

interface refreshReponse {
  accessToken: string
}

export function checkAuth(): Promise<void> {
  return new Promise((res, rej) => {
    fetch(import.meta.env.VITE_API_URL + '/refresh', {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'include'
    })
      .then((resp) => {
        if (!resp.ok) throw new Error(`bad request, code ${resp.status}`)
        return resp.json()
      })
      .then((data: refreshReponse) => {
        const tokenData = AuthStore.signIn(data.accessToken)
        if (!tokenData) throw new Error('invalid access token')

        UserStore.setUser({
          id: tokenData.userId
        })

        console.log('%c authentication successfully refreshed ', 'background: #222; color: #bada55')
        res()
      })
      .catch((err) => {
        console.warn(err)
        rej(err)
        console.info('logout...')
        AuthStore.logout()
        UserStore.clearUser()
      })
  })
}
