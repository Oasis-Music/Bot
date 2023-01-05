import React, { lazy, Suspense } from 'react'
import AppLayout from './components/AppLayout/AppLayout'
import Fallback from './components/Fallback/Fallback'
import PrivateRoute from './shared/PrivateRoute'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useWindowCSSRatio } from './hooks'

const Home = lazy(() => import('./pages/Home'))
const Explore = lazy(() => import('./pages/Explore'))
const Upload = lazy(() => import('./pages/Upload'))
const UI = lazy(() => import('./pages/UI'))
const Test = lazy(() => import('./pages/Test'))
const Terms = lazy(() => import('./pages/Terms'))
const Auth = lazy(() => import('./pages/Auth'))

const App: React.FC = () => {
  useWindowCSSRatio()

  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route element={<PrivateRoute />}>
            <Route index element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/test" element={<Test />} />
            {process.env.NODE_ENV === 'development' && <Route path="/ui" element={<UI />} />}
          </Route>
          <Route path="/terms" element={<Terms />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  )
}

export default App
