// import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { client } from './apollo'
import { useDetectLang } from '@/shared/lib/hooks'
import { ApolloProvider } from '@apollo/client'
import { Toast } from '@/widgets/toast'

import { AppLoader } from './app-loader'
import { urqlClient } from './urql'

import { routeTree } from '@/shared/lib/routeTree.gen'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { Provider } from 'urql'

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
      <Provider value={urqlClient}>
        <ApolloProvider client={client}>
          <RouterProvider router={router} />
          <Toast />
        </ApolloProvider>
      </Provider>
    </AppLoader>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<Application />)
