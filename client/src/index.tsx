import React from 'react'
import { createRoot } from 'react-dom/client'
// import { ApolloProvider } from '@apollo/client'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import theme, { GlobalStyles } from './utils/theme'
// import client from './apollo/apollo'
import App from './App'
import history from './utils/history'
import { ThemeProvider } from 'styled-components'
// import reportWebVitals from './reportWebVitals'

const Application: React.FC = () => {
  return (
    <HistoryRouter history={history}>
      <ThemeProvider theme={theme}>
        {/* <ApolloProvider client={client}> */}
        <GlobalStyles />
        <App />
        {/* </ApolloProvider> */}
      </ThemeProvider>
    </HistoryRouter>
  )
}

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<Application />)
// reportWebVitals(console.log)
