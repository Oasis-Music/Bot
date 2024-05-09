import { useCallback, useState } from 'react'
import type { SignInRequstBody } from '../model/types'

type params<T> = {
  onSuccess: (data: T) => void
  onError: (error: string) => void
}

type ReturnValues<T> = [
  (bodyData: SignInRequstBody) => void,
  { data: T | undefined; loading: boolean }
]

export function useAuthQuery<T>({ onSuccess, onError }: params<T>): ReturnValues<T> {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(false)

  const query = useCallback(
    (bodyData: SignInRequstBody) => {
      setLoading(true)
      fetch(import.meta.env.VITE_API_URL + '/telegram-auth', {
        method: 'POST',
        body: JSON.stringify(bodyData),
        cache: 'no-cache',
        credentials: 'include'
      })
        .then((resp) => {
          if (!resp.ok) throw new Error(`bad request, code ${resp.status}`)
          return resp.json()
        })
        .then((authData: T) => {
          setLoading(false)
          setData(authData)
          onSuccess(authData)
        })
        .catch((error: Error) => {
          setLoading(false)
          onError(error.message)
        })
    },
    [onSuccess, onError]
  )

  return [query, { data, loading }]
}
