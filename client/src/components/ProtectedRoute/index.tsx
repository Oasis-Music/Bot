import React from 'react'
import { routeNames } from '@/utils/history'
import { useReactiveVar } from '@apollo/client'
import { isAuthenticatedVar } from '@/apollo/cache/variables'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export function ProtectedRoute({ children }: { children?: React.ReactNode }) {
  const { pathname } = useLocation()
  const isAuth = useReactiveVar(isAuthenticatedVar)

  console.log('if', isAuth, isAuth && pathname === routeNames.auth)

  // as react wrapper
  if (children) {
    return isAuth && pathname === routeNames.auth ? (
      <Navigate replace to={routeNames.root} />
    ) : (
      children
    )
  }

  // as rrd wrapper
  return isAuth ? <Outlet /> : <Navigate replace to={routeNames.auth} />
}
