import * as Types from '../../../../shared/lib/gqlgen.types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type UserSoundtracksQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input']
  page: Types.Scalars['Int']['input']
}>

export type UserSoundtracksQuery = {
  __typename?: 'Query'
  userSoundtracks:
    | { __typename: 'NotFound'; message: string }
    | {
        __typename: 'UserSoundtracksResponse'
        total: number
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

export const UserSoundtracksDocument = gql`
  query UserSoundtracks($id: ID!, $page: Int!) {
    userSoundtracks(id: $id, filter: { page: $page }) {
      __typename
      ... on UserSoundtracksResponse {
        total
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
      ... on NotFound {
        message
      }
    }
  }
`

/**
 * __useUserSoundtracksQuery__
 *
 * To run a query within a React component, call `useUserSoundtracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSoundtracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSoundtracksQuery({
 *   variables: {
 *      id: // value for 'id'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useUserSoundtracksQuery(
  baseOptions: Apollo.QueryHookOptions<UserSoundtracksQuery, UserSoundtracksQueryVariables> &
    ({ variables: UserSoundtracksQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserSoundtracksQuery, UserSoundtracksQueryVariables>(
    UserSoundtracksDocument,
    options
  )
}
export function useUserSoundtracksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserSoundtracksQuery, UserSoundtracksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserSoundtracksQuery, UserSoundtracksQueryVariables>(
    UserSoundtracksDocument,
    options
  )
}
export function useUserSoundtracksSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<UserSoundtracksQuery, UserSoundtracksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<UserSoundtracksQuery, UserSoundtracksQueryVariables>(
    UserSoundtracksDocument,
    options
  )
}
export type UserSoundtracksQueryHookResult = ReturnType<typeof useUserSoundtracksQuery>
export type UserSoundtracksLazyQueryHookResult = ReturnType<typeof useUserSoundtracksLazyQuery>
export type UserSoundtracksSuspenseQueryHookResult = ReturnType<
  typeof useUserSoundtracksSuspenseQuery
>
export type UserSoundtracksQueryResult = Apollo.QueryResult<
  UserSoundtracksQuery,
  UserSoundtracksQueryVariables
>
