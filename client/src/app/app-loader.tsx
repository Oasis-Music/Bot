import { ReactNode, useEffect, useState } from 'react'
import { checkAuth } from '@/features/auth/check-auth'

export function AppLoader({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([checkAuth()]).finally(() => {
      setLoading(false)
    })
  }, [])

  if (loading) {
    return null
  }

  return <>{children}</>
}
