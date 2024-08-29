/* eslint-disable */
import * as Types from '../../../../../shared/lib/gqlgen.types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type CheckAudioHashQueryVariables = Types.Exact<{
  hash: Types.Scalars['String']['input']
}>

export type CheckAudioHashQuery = {
  __typename?: 'Query'
  checkAudioHash:
    | { __typename: 'NotFound'; message: string }
    | {
        __typename: 'Soundtrack'
        id: string
        title: string
        author: string
        duration: number
        coverURL?: string | null
        audioURL: string
        validated: boolean
        creatorId: string
        createdAt: any
        attached: boolean
      }
}

export const CheckAudioHashDocument = gql`
  query CheckAudioHash($hash: String!) {
    checkAudioHash(hash: $hash) {
      __typename
      ... on Soundtrack {
        id
        title
        author
        duration
        coverURL
        audioURL
        validated
        creatorId
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
 * __useCheckAudioHashQuery__
 *
 * To run a query within a React component, call `useCheckAudioHashQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckAudioHashQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckAudioHashQuery({
 *   variables: {
 *      hash: // value for 'hash'
 *   },
 * });
 */
export function useCheckAudioHashQuery(
  baseOptions: Apollo.QueryHookOptions<CheckAudioHashQuery, CheckAudioHashQueryVariables> &
    ({ variables: CheckAudioHashQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CheckAudioHashQuery, CheckAudioHashQueryVariables>(
    CheckAudioHashDocument,
    options
  )
}
export function useCheckAudioHashLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CheckAudioHashQuery, CheckAudioHashQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CheckAudioHashQuery, CheckAudioHashQueryVariables>(
    CheckAudioHashDocument,
    options
  )
}
export function useCheckAudioHashSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<CheckAudioHashQuery, CheckAudioHashQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<CheckAudioHashQuery, CheckAudioHashQueryVariables>(
    CheckAudioHashDocument,
    options
  )
}
export type CheckAudioHashQueryHookResult = ReturnType<typeof useCheckAudioHashQuery>
export type CheckAudioHashLazyQueryHookResult = ReturnType<typeof useCheckAudioHashLazyQuery>
export type CheckAudioHashSuspenseQueryHookResult = ReturnType<
  typeof useCheckAudioHashSuspenseQuery
>
export type CheckAudioHashQueryResult = Apollo.QueryResult<
  CheckAudioHashQuery,
  CheckAudioHashQueryVariables
>
