import { ReactNode, useEffect, useState } from 'react'
import { checkAuth } from '@/features/auth/check-auth'

export function AppLoader({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    Promise.all([checkAuth()]).finally(() => {
      setLoading(false)
    })
  }, [])

  if (loading) {
    return null
  }

  return <>{children}</>
}
