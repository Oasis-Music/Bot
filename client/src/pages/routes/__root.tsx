import { AppLayout } from '@/widgets/app-layout'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      }))
    )

export const Route = createRootRoute({
  component: () => (
    <>
      <AppLayout>
        <Outlet />
      </AppLayout>
      <Suspense>
        <TanStackRouterDevtools position="top-right" />
      </Suspense>
    </>
  )
})
