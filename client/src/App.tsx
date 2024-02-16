import React, { useEffect, lazy, Suspense } from 'react'
import { AppLayout } from '@/components/AppLayout'
import { Fallback } from '@/components/Fallback'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useWindowCSSRatio } from '@/hooks'

import './styles/global.scss'

import Home from './pages/Home'

const Explore = lazy(() => import('./pages/Explore'))
const Upload = lazy(() => import('./pages/Upload'))
const UI = lazy(() => import('./pages/UI'))
const Terms = lazy(() => import('./pages/Terms'))
const Auth = lazy(() => import('./pages/Auth'))
const Settings = lazy(() => import('./pages/Settings'))

export function App() {
  useWindowCSSRatio()

  useEffect(() => {
    Telegram.WebApp.expand()
  }, [])

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/" index element={<Home />} />
          <Route
            path="/explore"
            element={
              <Suspense fallback={<Fallback />}>
                <Explore />
              </Suspense>
            }
          />
          <Route
            path="/upload"
            element={
              <Suspense fallback={<Fallback />}>
                <Upload />
              </Suspense>
            }
          />
          <Route
            path="/settings"
            element={
              <Suspense fallback={<Fallback />}>
                <Settings />
              </Suspense>
            }
          />

          {import.meta.env.DEV && (
            <Route
              path="/ui"
              element={
                <Suspense fallback={<Fallback />}>
                  <UI />
                </Suspense>
              }
            />
          )}
        </Route>
        {/* App layout */}
      </Route>
      <Route
        path="/auth"
        element={
          <ProtectedRoute>
            <Suspense fallback={<Fallback />}>
              <Auth />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route
        path="terms"
        element={
          <Suspense fallback={<Fallback />}>
            <Terms />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
