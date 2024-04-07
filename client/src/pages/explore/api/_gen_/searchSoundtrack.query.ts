import * as Types from '../../../../graphql/types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type SearchSoundtrackQueryVariables = Types.Exact<{
  value: Types.Scalars['String']['input']
}>

export type SearchSoundtrackQuery = {
  __typename?: 'Query'
  searchSoundtrack: Array<{
    __typename?: 'Soundtrack'
    id: string
    title: string
    author: string
    duration: number
    coverURL?: string | null
    audioURL: string
    createdAt: any
    attached: boolean
  }>
}

export const SearchSoundtrackDocument = gql`
  query SearchSoundtrack($value: String!) {
    searchSoundtrack(value: $value) {
      id
      title
      author
      duration
      coverURL
      audioURL
      createdAt
      attached
    }
  }
`

/**
 * __useSearchSoundtrackQuery__
 *
 * To run a query within a React component, call `useSearchSoundtrackQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchSoundtrackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchSoundtrackQuery({
 *   variables: {
 *      value: // value for 'value'
 *   },
 * });
 */
export function useSearchSoundtrackQuery(
  baseOptions: Apollo.QueryHookOptions<SearchSoundtrackQuery, SearchSoundtrackQueryVariables> &
    ({ variables: SearchSoundtrackQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SearchSoundtrackQuery, SearchSoundtrackQueryVariables>(
    SearchSoundtrackDocument,
    options
  )
}
export function useSearchSoundtrackLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchSoundtrackQuery, SearchSoundtrackQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SearchSoundtrackQuery, SearchSoundtrackQueryVariables>(
    SearchSoundtrackDocument,
    options
  )
}
export function useSearchSoundtrackSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    SearchSoundtrackQuery,
    SearchSoundtrackQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<SearchSoundtrackQuery, SearchSoundtrackQueryVariables>(
    SearchSoundtrackDocument,
    options
  )
}
export type SearchSoundtrackQueryHookResult = ReturnType<typeof useSearchSoundtrackQuery>
export type SearchSoundtrackLazyQueryHookResult = ReturnType<typeof useSearchSoundtrackLazyQuery>
export type SearchSoundtrackSuspenseQueryHookResult = ReturnType<
  typeof useSearchSoundtrackSuspenseQuery
>
export type SearchSoundtrackQueryResult = Apollo.QueryResult<
  SearchSoundtrackQuery,
  SearchSoundtrackQueryVariables
>
