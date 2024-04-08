import * as Types from '../../../../shared/lib/gqlgen.types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type AllSoundtracksQueryVariables = Types.Exact<{
  page: Types.Scalars['Int']['input']
}>

export type AllSoundtracksQuery = {
  __typename?: 'Query'
  soundtracks: {
    __typename?: 'SoundtracksResponse'
    soundtracks: Array<{
      __typename?: 'Soundtrack'
      id: string
      title: string
      author: string
      duration: number
      coverURL?: string | null
      audioURL: string
      attached: boolean
    }>
  }
}

export const AllSoundtracksDocument = gql`
  query AllSoundtracks($page: Int!) {
    soundtracks(filter: { page: $page }) {
      soundtracks {
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
`

/**
 * __useAllSoundtracksQuery__
 *
 * To run a query within a React component, call `useAllSoundtracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllSoundtracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllSoundtracksQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useAllSoundtracksQuery(
  baseOptions: Apollo.QueryHookOptions<AllSoundtracksQuery, AllSoundtracksQueryVariables> &
    ({ variables: AllSoundtracksQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AllSoundtracksQuery, AllSoundtracksQueryVariables>(
    AllSoundtracksDocument,
    options
  )
}
export function useAllSoundtracksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AllSoundtracksQuery, AllSoundtracksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<AllSoundtracksQuery, AllSoundtracksQueryVariables>(
    AllSoundtracksDocument,
    options
  )
}
export function useAllSoundtracksSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<AllSoundtracksQuery, AllSoundtracksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<AllSoundtracksQuery, AllSoundtracksQueryVariables>(
    AllSoundtracksDocument,
    options
  )
}
export type AllSoundtracksQueryHookResult = ReturnType<typeof useAllSoundtracksQuery>
export type AllSoundtracksLazyQueryHookResult = ReturnType<typeof useAllSoundtracksLazyQuery>
export type AllSoundtracksSuspenseQueryHookResult = ReturnType<
  typeof useAllSoundtracksSuspenseQuery
>
export type AllSoundtracksQueryResult = Apollo.QueryResult<
  AllSoundtracksQuery,
  AllSoundtracksQueryVariables
>
