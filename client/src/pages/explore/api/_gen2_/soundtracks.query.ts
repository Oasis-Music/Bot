import * as Types from '../../../../shared/lib/gqlgen.types2'

import { gql } from 'urql'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type SoundtracksQueryVariables = Types.Exact<{
  first: Types.Scalars['Int']['input']
  after?: Types.InputMaybe<Types.Scalars['String']['input']>
}>

export type SoundtracksQuery = {
  __typename?: 'Query'
  soundtracks: {
    __typename?: 'SoundtrackConnection'
    totalCount: number
    pageInfo: {
      __typename?: 'PageInfo'
      hasNextPage: boolean
      startCursor?: string | null
      endCursor?: string | null
      hasPreviousPage: boolean
    }
    edges: Array<{
      __typename?: 'SoundtrackEdge'
      cursor: string
      node: {
        __typename?: 'Soundtrack'
        id: string
        title: string
        author: string
        duration: number
        coverURL?: string | null
        audioURL: string
        attached: boolean
      }
    }>
  }
}

export const SoundtracksDocument = gql`
  query Soundtracks($first: Int!, $after: String) {
    soundtracks(first: $first, after: $after) {
      totalCount
      pageInfo {
        hasNextPage
        startCursor
        endCursor
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          title
          author
          duration
          coverURL
          audioURL
          attached
        }
      }
    }
  }
`

export function useSoundtracksQuery(
  options: Omit<Urql.UseQueryArgs<SoundtracksQueryVariables>, 'query'>
) {
  return Urql.useQuery<SoundtracksQuery, SoundtracksQueryVariables>({
    query: SoundtracksDocument,
    ...options
  })
}
