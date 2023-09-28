import * as Types from '../../types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
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
export type UnattachSoundtrackMutationFn = Apollo.MutationFunction<
  UnattachSoundtrackMutation,
  UnattachSoundtrackMutationVariables
>

/**
 * __useUnattachSoundtrackMutation__
 *
 * To run a mutation, you first call `useUnattachSoundtrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnattachSoundtrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unattachSoundtrackMutation, { data, loading, error }] = useUnattachSoundtrackMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      trackId: // value for 'trackId'
 *   },
 * });
 */
export function useUnattachSoundtrackMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UnattachSoundtrackMutation,
    UnattachSoundtrackMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UnattachSoundtrackMutation, UnattachSoundtrackMutationVariables>(
    UnattachSoundtrackDocument,
    options
  )
}
export type UnattachSoundtrackMutationHookResult = ReturnType<typeof useUnattachSoundtrackMutation>
export type UnattachSoundtrackMutationResult = Apollo.MutationResult<UnattachSoundtrackMutation>
export type UnattachSoundtrackMutationOptions = Apollo.BaseMutationOptions<
  UnattachSoundtrackMutation,
  UnattachSoundtrackMutationVariables
>
