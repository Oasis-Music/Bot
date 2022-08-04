import React from 'react'
import routeNames from '../../utils/routeNames'
// import { GET_AUTHENTICATION_STATE } from '../../apollo/cache/queries/user'
// import { useQuery } from '@apollo/client'
import { Navigate, Outlet } from 'react-router-dom'

// interface authState {
//   isAuthenticated: boolean
// }

const PrivateRoute: React.FC = () => {
  //   const { data } = useQuery<authState>(GET_AUTHENTICATION_STATE)
  //   const isAuth = data?.isAuthenticated
  const isAuth = true

  return isAuth ? <Outlet /> : <Navigate to={routeNames.auth} />
}

export default PrivateRoute
