import React from 'react'
import theme, { GlobalStyles } from './utils/theme'
import client from './apollo/apollo'
import history from './utils/history'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'styled-components'
import { ModalProvider } from 'styled-react-modal'
import App from './App'
import HistoryRouter from './components/HistoryRouter/HistoryRouter'
// import reportWebVitals from './reportWebVitals'

import 'normalize.css'

const Application: React.FC = () => {
  return (
    <HistoryRouter history={history}>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <ApolloProvider client={client}>
            <GlobalStyles />
            <App />
          </ApolloProvider>
        </ModalProvider>
      </ThemeProvider>
    </HistoryRouter>
  )
}

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<Application />)
// reportWebVitals(console.log)
