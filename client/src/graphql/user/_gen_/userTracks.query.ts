import * as Types from '../../../types'

import { gql } from '@apollo/client'
export type UserTracksQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
  page: Types.Scalars['Int']
}>

export type UserTracksQuery = {
  __typename?: 'Query'
  userTracks:
    | { __typename: 'NotFound'; message: string }
    | {
        __typename: 'UserTracksResponse'
        total: number
        soundtracks: Array<{
          __typename?: 'Soundtrack'
          id: string
          title: string
          author: string
          duration: number
          coverURL?: string | null
          audioURL: string
        }>
      }
}

type DiscriminateUnion<T, U> = T extends U ? T : never

export type UserTracksVariables = UserTracksQueryVariables
export type UserTracksUserTracks = NonNullable<UserTracksQuery['userTracks']>
export type UserTracksUserTracksResponseInlineFragment = DiscriminateUnion<
  NonNullable<UserTracksQuery['userTracks']>,
  { __typename?: 'UserTracksResponse' }
>
export type UserTracksSoundtracks = NonNullable<
  NonNullable<
    DiscriminateUnion<
      NonNullable<UserTracksQuery['userTracks']>,
      { __typename?: 'UserTracksResponse' }
    >['soundtracks']
  >[number]
>
export type UserTracksNotFoundInlineFragment = DiscriminateUnion<
  NonNullable<UserTracksQuery['userTracks']>,
  { __typename?: 'NotFound' }
>

export const UserTracksDocument = gql`
  query UserTracks($id: ID!, $page: Int!) {
    userTracks(id: $id, filter: { page: $page }) {
      __typename
      ... on UserTracksResponse {
        total
        soundtracks {
          id
          title
          author
          duration
          coverURL
          audioURL
        }
      }
      ... on NotFound {
        message
      }
    }
  }
`
