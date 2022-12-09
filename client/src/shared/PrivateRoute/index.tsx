import React from 'react'
import { routeNames } from '../../utils/history'
import { useReactiveVar } from '@apollo/client'
import { isAuthenticatedVar } from '../../apollo/cache/variables'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute: React.FC = () => {
  const isAuth = useReactiveVar(isAuthenticatedVar)
  return isAuth ? <Outlet /> : <Navigate to={routeNames.auth} />
}

export default PrivateRoute
