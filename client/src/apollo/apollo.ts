import { ApolloClient, ApolloLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { createUploadLink } from 'apollo-upload-client'
import { cache } from './cache/cache'
import { UserMutations } from './cache/mutations'
import { promiseToObservable } from '../utils/helpers'

const GRAPHQL_URL = process.env.REACT_APP_API_URL + 'graphql'
const withDevTools = process.env.NODE_ENV === 'development'

// this link fully covers HttpLink
const uploadLink = createUploadLink({ uri: GRAPHQL_URL })

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('at') || ''

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  }))

  return forward(operation)
})

interface refreshReponse {
  token: string
  refreshToken: string
}

// https://github.com/apollographql/apollo-link/issues/646
const refreshLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    const err = graphQLErrors[0].extensions

    switch (err?.code) {
      case '401':
        console.warn('access token expired: refreshing')
        const rt = localStorage.getItem('rt')
        if (!rt) {
          console.warn('rt not exists - logout')
          UserMutations.logout()
          return
        }

        const refsresh = fetch(process.env.REACT_APP_API_URL + 'refresh', {
          method: 'POST',
          cache: 'no-cache',
          headers: { 'Content-Type': 'application/json' },
          body: rt
        })
          .then((resp) => (resp.status === 401 ? Promise.reject(resp) : resp))
          .then((resp) => resp.text())
          .then((respData) => {
            const data: refreshReponse = JSON.parse(respData)
            const ok = UserMutations.processAccessToken(data.token)
            if (!ok) {
              throw new Error('new AT is broken')
            }

            localStorage.setItem('rt', data.refreshToken)

            return data.token
          })
          .catch((err) => {
            console.warn(err)
            console.info('logout...')
            UserMutations.logout()
          })

        return promiseToObservable(refsresh).flatMap((token) => {
          const oldHeaders = operation.getContext().headers
          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: `Bearer ${token}`
            }
          })

          // retry request
          return forward(operation)
        })
    }
  }

  if (networkError) console.warn(`[Network error]: ${networkError}`)
})

const client = new ApolloClient({
  cache,
  link: from([authMiddleware, refreshLink, uploadLink]),
  connectToDevTools: withDevTools
})

export default client
