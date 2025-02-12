import * as Types from '../../../../../shared/lib/gqlgen.types2'

import { gql } from 'urql'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type AttachSoundtrackMutationVariables = Types.Exact<{
  userId: Types.Scalars['String']['input']
  trackId: Types.Scalars['String']['input']
}>

export type AttachSoundtrackMutation = { __typename?: 'Mutation'; attachSoundtrack: boolean }

export const AttachSoundtrackDocument = gql`
  mutation AttachSoundtrack($userId: String!, $trackId: String!) {
    attachSoundtrack(input: { userId: $userId, trackId: $trackId })
  }
`

export function useAttachSoundtrackMutation() {
  return Urql.useMutation<AttachSoundtrackMutation, AttachSoundtrackMutationVariables>(
    AttachSoundtrackDocument
  )
}
