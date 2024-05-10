import { ApolloClient, ApolloLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { cache } from './cache'
import { promiseToObservable } from '@/shared/lib/helpers'
import { AuthStore, isTokenValid, accessTokenVar } from '@/entities/auth'
import { UserStore } from '@/entities/user'

const GRAPHQL_URL = import.meta.env.VITE_API_URL + '/graphql'

// this link fully covers HttpLink
const uploadLink = createUploadLink({ uri: GRAPHQL_URL })

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = accessTokenVar()

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? 'Bearer ' + token : null
    }
  }))

  return forward(operation)
})

interface refreshReponse {
  accessToken: string
}

// https://github.com/apollographql/apollo-link/issues/646
const refreshLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    const err = graphQLErrors[0].extensions

    switch (err?.code) {
      case '401': {
        console.warn('refreshing access token')

        const refsresh = fetch(import.meta.env.VITE_API_URL + '/refresh', {
          method: 'POST',
          cache: 'no-cache',
          credentials: 'include'
        })
          .then((resp) => {
            if (!resp.ok) throw new Error(`bad request, code ${resp.status}`)
            return resp.json()
          })
          .then((data: refreshReponse) => {
            const ok = isTokenValid(data.accessToken)
            if (!ok) {
              throw new Error('new AT is broken')
            }

            AuthStore.signIn(data.accessToken)

            console.log(
              '%c authentication successfully refreshed ',
              'background: #222; color: #bada55'
            )

            return data.accessToken
          })
          .catch((err) => {
            console.warn(err)
            console.info('logout...')
            AuthStore.logout()
            UserStore.clearUser()
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
  }

  if (networkError) console.warn(`[Network error]: ${networkError}`)
})

export const client = new ApolloClient({
  cache,
  link: from([authMiddleware, refreshLink, uploadLink]),
  connectToDevTools: import.meta.env.DEV
})
