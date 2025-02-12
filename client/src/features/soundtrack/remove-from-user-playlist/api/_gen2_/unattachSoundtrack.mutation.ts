import * as Types from '../../../../../shared/lib/gqlgen.types2'

import { gql } from 'urql'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type UnattachSoundtrackMutationVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input']
  trackId: Types.Scalars['ID']['input']
}>

export type UnattachSoundtrackMutation = { __typename?: 'Mutation'; unattachSoundtrack: boolean }

export const UnattachSoundtrackDocument = gql`
  mutation UnattachSoundtrack($userId: ID!, $trackId: ID!) {
    unattachSoundtrack(input: { userId: $userId, trackId: $trackId })
  }
`

export function useUnattachSoundtrackMutation() {
  return Urql.useMutation<UnattachSoundtrackMutation, UnattachSoundtrackMutationVariables>(
    UnattachSoundtrackDocument
  )
}
