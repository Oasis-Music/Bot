import { ReactNode } from 'react'
import { ROUTER_NAMES } from '@/shared/constants/routes'
import { useReactiveVar } from '@apollo/client'
import { isAuthenticatedVar } from '../model/store'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export function ProtectedRoute({ children }: { children?: ReactNode }) {
  const { pathname } = useLocation()
  const isAuth = useReactiveVar(isAuthenticatedVar)

  console.log('if', isAuth, isAuth && pathname === ROUTER_NAMES.auth)

  // as react wrapper
  if (children) {
    return isAuth && pathname === ROUTER_NAMES.auth ? (
      <Navigate replace to={ROUTER_NAMES.root} />
    ) : (
      children
    )
  }

  // as rrd wrapper
  return isAuth ? <Outlet /> : <Navigate replace to={ROUTER_NAMES.auth} />
}
