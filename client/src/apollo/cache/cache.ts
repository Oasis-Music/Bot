import { InMemoryCache } from '@apollo/client'

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {}
    }
  }
})

export { cache }
