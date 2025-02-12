// import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { client } from './apollo'
import { useDetectLang } from '@/shared/lib/hooks'
import { ApolloProvider } from '@apollo/client'
import { Toast } from '@/widgets/toast'

import { AppLoader } from './app-loader'

import { routeTree } from '@/shared/lib/routeTree.gen'
import { RouterProvider, createRouter } from '@tanstack/react-router'

const router = createRouter({ routeTree })

import '@/shared/lib/i18n'
import './styles/index.css'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function Application() {
  useDetectLang()

  return (
    <AppLoader>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
        <Toast />
      </ApolloProvider>
    </AppLoader>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<Application />)
