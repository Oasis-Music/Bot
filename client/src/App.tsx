import React, { lazy, Suspense } from 'react'
import AppLayout from './components/AppLayout/AppLayout'
import Fallback from './components/Fallback/Fallback'
import PrivateRoute from './shared/PrivateRoute'
import { Routes, Route, Navigate } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const UI = lazy(() => import('./pages/UI'))
const Test = lazy(() => import('./pages/Test'))

const App: React.FC = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route element={<PrivateRoute />}>
            <Route index element={<Home />} />
            {process.env.NODE_ENV === 'development' && <Route path="/ui" element={<UI />} />}
            <Route path="/test" element={<Test />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  )
}

export default App
