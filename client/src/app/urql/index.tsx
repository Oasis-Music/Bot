import { Client, fetchExchange } from 'urql'
import { graphcache } from '../cache'

export const urqlClient = new Client({
  url: import.meta.env.VITE_API_URL + '/refresh',
  exchanges: [graphcache, fetchExchange]
})
