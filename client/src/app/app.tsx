import React, { useEffect, lazy, Suspense } from 'react'
import { AppLayout } from '@/components/AppLayout'
import { Fallback } from '@/components/Fallback'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useWindowCSSRatio } from '@/hooks'
import { ROUTER_NAMES } from '@/shared/constants/routes'

import './styles/global.scss'

import Home from '@/pages/home'

const Explore = lazy(() => import('@/pages/explore'))
const Upload = lazy(() => import('@/pages/upload'))
const UI = lazy(() => import('@/pages/ui'))
const Terms = lazy(() => import('@/pages/terms'))
const Auth = lazy(() => import('@/pages/auth'))
const Settings = lazy(() => import('@/pages/settings'))

export function App() {
  useWindowCSSRatio()

  useEffect(() => {
    Telegram.WebApp.expand()
  }, [])

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTER_NAMES.root} index element={<Home />} />
          <Route
            path={ROUTER_NAMES.explore}
            element={
              <Suspense fallback={<Fallback />}>
                <Explore />
              </Suspense>
            }
          />
          <Route
            path={ROUTER_NAMES.upload}
            element={
              <Suspense fallback={<Fallback />}>
                <Upload />
              </Suspense>
            }
          />
          <Route
            path={ROUTER_NAMES.settings}
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
      </Route>
      <Route
        path={ROUTER_NAMES.auth}
        element={
          <ProtectedRoute>
            <Suspense fallback={<Fallback />}>
              <Auth />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTER_NAMES.terms}
        element={
          <Suspense fallback={<Fallback />}>
            <Terms />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to={ROUTER_NAMES.root} />} />
    </Routes>
  )
}
