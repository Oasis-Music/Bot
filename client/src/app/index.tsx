import { createRoot } from 'react-dom/client'
import { client } from './apollo'
import { useDetectLang } from '@/shared/lib/hooks'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import { Toast } from '@/widgets/toast'
import { App } from './app'

import '@/shared/lib/i18n'
import { AppLoader } from './app-loader'

function Application() {
  useDetectLang()

  return (
    <AppLoader>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <App />
          <Toast />
        </ApolloProvider>
      </BrowserRouter>
    </AppLoader>
  )
}

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<Application />)
