import * as Types from '../../../types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type CreateSoundtrackMutationVariables = Types.Exact<{
  title: Types.Scalars['String']
  author: Types.Scalars['String']
  coverImage?: Types.InputMaybe<Types.Scalars['Upload']>
  audiofile: Types.Scalars['Upload']
}>

export type CreateSoundtrackMutation = { __typename?: 'Mutation'; createSoundtrack: boolean }

export type CreateSoundtrackVariables = CreateSoundtrackMutationVariables

export const CreateSoundtrackDocument = gql`
  mutation CreateSoundtrack(
    $title: String!
    $author: String!
    $coverImage: Upload
    $audiofile: Upload!
  ) {
    createSoundtrack(
      input: { title: $title, author: $author, coverImage: $coverImage, audiofile: $audiofile }
    )
  }
`
export type CreateSoundtrackMutationFn = Apollo.MutationFunction<
  CreateSoundtrackMutation,
  CreateSoundtrackMutationVariables
>
export type CreateSoundtrackMutationOptions = Apollo.BaseMutationOptions<
  CreateSoundtrackMutation,
  CreateSoundtrackMutationVariables
>