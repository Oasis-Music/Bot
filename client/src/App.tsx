import React, { lazy, Suspense } from 'react'
// import AppLayout from './components/AppLayout/AppLayout'
import Fallback from './components/Fallback/Fallback'
import PrivateRoute from './shared/PrivateRoute'
import { Routes, Route, Navigate } from 'react-router-dom'

const Player = lazy(() => import('./pages/Player'))
const UI = lazy(() => import('./pages/UI'))

const App: React.FC = () => {
  return (
    <Suspense fallback={<Fallback />}>
      {/* <AppLayout> */}
      <Routes>
        {/* <Route path="/auth" element={<Auth />} /> */}
        <Route element={<PrivateRoute />}>
          <Route path="/player" element={<Player />} />
          <Route path="/ui" element={<UI />} />
        </Route>
        <Route path="*" element={<Navigate to="/orders" />} />
      </Routes>
      {/* </AppLayout> */}
    </Suspense>
  )
}

export default App
