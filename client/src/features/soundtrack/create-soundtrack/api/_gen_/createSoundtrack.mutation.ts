import * as Types from '../../../../../graphql/types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type CreateSoundtrackMutationVariables = Types.Exact<{
  title: Types.Scalars['String']['input']
  author: Types.Scalars['String']['input']
  coverImage?: Types.InputMaybe<Types.Scalars['Upload']['input']>
  audiofile: Types.Scalars['Upload']['input']
  attach: Types.Scalars['Boolean']['input']
}>

export type CreateSoundtrackMutation = { __typename?: 'Mutation'; createSoundtrack: boolean }

export const CreateSoundtrackDocument = gql`
  mutation CreateSoundtrack(
    $title: String!
    $author: String!
    $coverImage: Upload
    $audiofile: Upload!
    $attach: Boolean!
  ) {
    createSoundtrack(
      input: {
        title: $title
        author: $author
        coverImage: $coverImage
        audiofile: $audiofile
        attach: $attach
      }
    )
  }
`
export type CreateSoundtrackMutationFn = Apollo.MutationFunction<
  CreateSoundtrackMutation,
  CreateSoundtrackMutationVariables
>

/**
 * __useCreateSoundtrackMutation__
 *
 * To run a mutation, you first call `useCreateSoundtrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSoundtrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSoundtrackMutation, { data, loading, error }] = useCreateSoundtrackMutation({
 *   variables: {
 *      title: // value for 'title'
 *      author: // value for 'author'
 *      coverImage: // value for 'coverImage'
 *      audiofile: // value for 'audiofile'
 *      attach: // value for 'attach'
 *   },
 * });
 */
export function useCreateSoundtrackMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateSoundtrackMutation,
    CreateSoundtrackMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateSoundtrackMutation, CreateSoundtrackMutationVariables>(
    CreateSoundtrackDocument,
    options
  )
}
export type CreateSoundtrackMutationHookResult = ReturnType<typeof useCreateSoundtrackMutation>
export type CreateSoundtrackMutationResult = Apollo.MutationResult<CreateSoundtrackMutation>
export type CreateSoundtrackMutationOptions = Apollo.BaseMutationOptions<
  CreateSoundtrackMutation,
  CreateSoundtrackMutationVariables
>
