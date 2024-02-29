import * as Types from '../../types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type GetSoundtrackQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input']
}>

export type GetSoundtrackQuery = {
  __typename?: 'Query'
  soundtrack?:
    | { __typename: 'NotFound'; message: string }
    | {
        __typename: 'Soundtrack'
        id: string
        title: string
        author: string
        duration: number
        coverURL?: string | null
        audioURL: string
        createdAt: any
        attached: boolean
      }
    | null
}

export const GetSoundtrackDocument = gql`
  query GetSoundtrack($id: ID!) {
    soundtrack(id: $id) {
      __typename
      ... on Soundtrack {
        id
        title
        author
        duration
        coverURL
        audioURL
        createdAt
        attached
      }
      ... on NotFound {
        message
      }
    }
  }
`

/**
 * __useGetSoundtrackQuery__
 *
 * To run a query within a React component, call `useGetSoundtrackQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSoundtrackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSoundtrackQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSoundtrackQuery(
  baseOptions: Apollo.QueryHookOptions<GetSoundtrackQuery, GetSoundtrackQueryVariables> &
    ({ variables: GetSoundtrackQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetSoundtrackQuery, GetSoundtrackQueryVariables>(
    GetSoundtrackDocument,
    options
  )
}
export function useGetSoundtrackLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetSoundtrackQuery, GetSoundtrackQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetSoundtrackQuery, GetSoundtrackQueryVariables>(
    GetSoundtrackDocument,
    options
  )
}
export function useGetSoundtrackSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetSoundtrackQuery, GetSoundtrackQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetSoundtrackQuery, GetSoundtrackQueryVariables>(
    GetSoundtrackDocument,
    options
  )
}
export type GetSoundtrackQueryHookResult = ReturnType<typeof useGetSoundtrackQuery>
export type GetSoundtrackLazyQueryHookResult = ReturnType<typeof useGetSoundtrackLazyQuery>
export type GetSoundtrackSuspenseQueryHookResult = ReturnType<typeof useGetSoundtrackSuspenseQuery>
export type GetSoundtrackQueryResult = Apollo.QueryResult<
  GetSoundtrackQuery,
  GetSoundtrackQueryVariables
>
