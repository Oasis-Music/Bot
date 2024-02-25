import React from 'react'
import client from '@/apollo/apollo'
import { useDetectLang } from '@/hooks'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app'

import '@/shared/lib/i18n'
import 'normalize.css'

function Application() {
  useDetectLang()

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  )
}

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<Application />)
