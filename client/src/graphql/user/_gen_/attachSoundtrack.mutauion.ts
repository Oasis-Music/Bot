import * as Types from '../../types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
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
export type AttachSoundtrackMutationFn = Apollo.MutationFunction<
  AttachSoundtrackMutation,
  AttachSoundtrackMutationVariables
>

/**
 * __useAttachSoundtrackMutation__
 *
 * To run a mutation, you first call `useAttachSoundtrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttachSoundtrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attachSoundtrackMutation, { data, loading, error }] = useAttachSoundtrackMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      trackId: // value for 'trackId'
 *   },
 * });
 */
export function useAttachSoundtrackMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AttachSoundtrackMutation,
    AttachSoundtrackMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AttachSoundtrackMutation, AttachSoundtrackMutationVariables>(
    AttachSoundtrackDocument,
    options
  )
}
export type AttachSoundtrackMutationHookResult = ReturnType<typeof useAttachSoundtrackMutation>
export type AttachSoundtrackMutationResult = Apollo.MutationResult<AttachSoundtrackMutation>
export type AttachSoundtrackMutationOptions = Apollo.BaseMutationOptions<
  AttachSoundtrackMutation,
  AttachSoundtrackMutationVariables
>
