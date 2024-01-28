import React from 'react'
import theme, { GlobalStyles } from './utils/theme'
import client from '@/apollo/apollo'
import { useDetectLang } from '@/hooks'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ModalProvider } from 'styled-react-modal'
import { App } from './App'

import 'normalize.css'

import './i18n'

function Application() {
  useDetectLang()

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <ApolloProvider client={client}>
            <GlobalStyles />
            <App />
          </ApolloProvider>
        </ModalProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<Application />)
