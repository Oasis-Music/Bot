import { createRoot } from 'react-dom/client'
import { client } from './apollo'
import { useDetectLang } from '@/shared/lib/hooks'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import { Snackbar } from '@/widgets/snackbar'
import { App } from './app'
import { Toaster } from 'sonner'

import '@/shared/lib/i18n'
import 'normalize.css'
import { AppLoader } from './app-loader'

function Application() {
  useDetectLang()

  return (
    <AppLoader>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Snackbar>
            <App />
          </Snackbar>
          <Toaster position="bottom-center" visibleToasts={2} />
        </ApolloProvider>
      </BrowserRouter>
    </AppLoader>
  )
}

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<Application />)
