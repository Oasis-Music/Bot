import { Client, fetchExchange } from 'urql'
import { graphcache } from '../cache'
import { authExchange } from '@urql/exchange-auth'

export const urqlClient = new Client({
  url: import.meta.env.VITE_API_URL + '/graphql',
  exchanges: [
    graphcache,
    authExchange(async (utils) => {
      return {
        addAuthToOperation(operation) {
          const session = sessionStorage.getItem('session')
          if (!session) return operation

          return utils.appendHeaders(operation, {
            Authorization: `Bearer ${session}`
          })
        },
        didAuthError(error, _operation) {
          return error.graphQLErrors.some((e) => e.extensions?.code === '401')
        },
        async refreshAuth() {
          try {
            const response = await fetch(import.meta.env.VITE_API_URL + '/refresh', {
              method: 'GET',
              cache: 'no-cache',
              credentials: 'include'
            })

            if (!response.ok) {
              const errorText = await response.text()
              throw new Error(errorText)
            }

            const data = await response.json()
            console.log('data', data)
          } catch (error) {
            // router.replace(routeNames.root)
          }
        }
      }
    }),
    fetchExchange
  ]
})
