import * as Types from '../../types'

import { gql } from '@apollo/client'
export type AuthorizeUserQueryVariables = Types.Exact<{
  initData: Types.Scalars['String']
}>

export type AuthorizeUserQuery = {
  __typename?: 'Query'
  authorizeUser: { __typename?: 'AuthorizationResponse'; token: string; refreshToken: string }
}

export type AuthorizeUserVariables = AuthorizeUserQueryVariables
export type AuthorizeUserAuthorizeUser = NonNullable<AuthorizeUserQuery['authorizeUser']>

export const AuthorizeUserDocument = gql`
  query AuthorizeUser($initData: String!) {
    authorizeUser(initData: $initData) {
      token
      refreshToken
    }
  }
`
