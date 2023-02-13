import * as Types from '../../../types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type UnattachSoundtrackMutationVariables = Types.Exact<{
  userId: Types.Scalars['ID']
  trackId: Types.Scalars['ID']
}>

export type UnattachSoundtrackMutation = { __typename?: 'Mutation'; unattachSoundtrack: boolean }

export type UnattachSoundtrackVariables = UnattachSoundtrackMutationVariables

export const UnattachSoundtrackDocument = gql`
  mutation UnattachSoundtrack($userId: ID!, $trackId: ID!) {
    unattachSoundtrack(input: { userId: $userId, trackId: $trackId })
  }
`
export type UnattachSoundtrackMutationFn = Apollo.MutationFunction<
  UnattachSoundtrackMutation,
  UnattachSoundtrackMutationVariables
>
export type UnattachSoundtrackMutationOptions = Apollo.BaseMutationOptions<
  UnattachSoundtrackMutation,
  UnattachSoundtrackMutationVariables
>
