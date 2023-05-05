import * as Types from '../../types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type AttachSoundtrackMutationVariables = Types.Exact<{
  userId: Types.Scalars['String']
  trackId: Types.Scalars['String']
}>

export type AttachSoundtrackMutation = { __typename?: 'Mutation'; attachSoundtrack: boolean }

export type AttachSoundtrackVariables = AttachSoundtrackMutationVariables

export const AttachSoundtrackDocument = gql`
  mutation AttachSoundtrack($userId: String!, $trackId: String!) {
    attachSoundtrack(input: { userId: $userId, trackId: $trackId })
  }
`
export type AttachSoundtrackMutationFn = Apollo.MutationFunction<
  AttachSoundtrackMutation,
  AttachSoundtrackMutationVariables
>
export type AttachSoundtrackMutationOptions = Apollo.BaseMutationOptions<
  AttachSoundtrackMutation,
  AttachSoundtrackMutationVariables
>
