import * as Types from '../../types'

import { gql } from '@apollo/client'
export type UserSoundtracksQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
  page: Types.Scalars['Int']
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

type DiscriminateUnion<T, U> = T extends U ? T : never

export type UserSoundtracksVariables = UserSoundtracksQueryVariables
export type UserSoundtracksUserSoundtracks = NonNullable<UserSoundtracksQuery['userSoundtracks']>
export type UserSoundtracksUserSoundtracksResponseInlineFragment = DiscriminateUnion<
  NonNullable<UserSoundtracksQuery['userSoundtracks']>,
  { __typename?: 'UserSoundtracksResponse' }
>
export type UserSoundtracksSoundtracks = NonNullable<
  NonNullable<
    DiscriminateUnion<
      NonNullable<UserSoundtracksQuery['userSoundtracks']>,
      { __typename?: 'UserSoundtracksResponse' }
    >['soundtracks']
  >[number]
>
export type UserSoundtracksNotFoundInlineFragment = DiscriminateUnion<
  NonNullable<UserSoundtracksQuery['userSoundtracks']>,
  { __typename?: 'NotFound' }
>

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
