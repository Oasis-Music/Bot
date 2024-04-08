import * as Types from '../../../../../shared/lib/gqlgen.types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type AuthorizeUserQueryVariables = Types.Exact<{
  initData: Types.Scalars['String']['input']
}>

export type AuthorizeUserQuery = {
  __typename?: 'Query'
  authorizeUser: { __typename?: 'AuthorizationResponse'; token: string; refreshToken: string }
}

export const AuthorizeUserDocument = gql`
  query AuthorizeUser($initData: String!) {
    authorizeUser(initData: $initData) {
      token
      refreshToken
    }
  }
`

/**
 * __useAuthorizeUserQuery__
 *
 * To run a query within a React component, call `useAuthorizeUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthorizeUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthorizeUserQuery({
 *   variables: {
 *      initData: // value for 'initData'
 *   },
 * });
 */
export function useAuthorizeUserQuery(
  baseOptions: Apollo.QueryHookOptions<AuthorizeUserQuery, AuthorizeUserQueryVariables> &
    ({ variables: AuthorizeUserQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AuthorizeUserQuery, AuthorizeUserQueryVariables>(
    AuthorizeUserDocument,
    options
  )
}
export function useAuthorizeUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AuthorizeUserQuery, AuthorizeUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<AuthorizeUserQuery, AuthorizeUserQueryVariables>(
    AuthorizeUserDocument,
    options
  )
}
export function useAuthorizeUserSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<AuthorizeUserQuery, AuthorizeUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<AuthorizeUserQuery, AuthorizeUserQueryVariables>(
    AuthorizeUserDocument,
    options
  )
}
export type AuthorizeUserQueryHookResult = ReturnType<typeof useAuthorizeUserQuery>
export type AuthorizeUserLazyQueryHookResult = ReturnType<typeof useAuthorizeUserLazyQuery>
export type AuthorizeUserSuspenseQueryHookResult = ReturnType<typeof useAuthorizeUserSuspenseQuery>
export type AuthorizeUserQueryResult = Apollo.QueryResult<
  AuthorizeUserQuery,
  AuthorizeUserQueryVariables
>
