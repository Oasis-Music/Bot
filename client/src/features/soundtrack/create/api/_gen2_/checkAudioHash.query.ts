import * as Types from '../../../../../shared/lib/gqlgen.types2'

import { gql } from 'urql'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CheckAudioHashQueryVariables = Types.Exact<{
  hash: Types.Scalars['String']['input']
}>

export type CheckAudioHashQuery = {
  __typename?: 'Query'
  checkAudioHash?:
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
        createdAt: unknown
        attached: boolean
      }
    | null
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

export function useCheckAudioHashQuery(
  options: Omit<Urql.UseQueryArgs<CheckAudioHashQueryVariables>, 'query'>
) {
  return Urql.useQuery<CheckAudioHashQuery, CheckAudioHashQueryVariables>({
    query: CheckAudioHashDocument,
    ...options
  })
}
