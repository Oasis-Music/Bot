import * as Types from '../../../../shared/lib/gqlgen.types2'

import { gql } from 'urql'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
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

export function useUserSoundtracksQuery(
  options: Omit<Urql.UseQueryArgs<UserSoundtracksQueryVariables>, 'query'>
) {
  return Urql.useQuery<UserSoundtracksQuery, UserSoundtracksQueryVariables>({
    query: UserSoundtracksDocument,
    ...options
  })
}
