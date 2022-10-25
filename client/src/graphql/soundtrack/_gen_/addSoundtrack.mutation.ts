import * as Types from '../../../types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type AddSoundtrackMutationVariables = Types.Exact<{
  title: Types.Scalars['String']
  author: Types.Scalars['String']
  coverImage: Types.Scalars['Upload']
  audiofile: Types.Scalars['Upload']
}>

export type AddSoundtrackMutation = { __typename?: 'Mutation'; addSoundtrack: boolean }

export type AddSoundtrackVariables = AddSoundtrackMutationVariables

export const AddSoundtrackDocument = gql`
  mutation AddSoundtrack(
    $title: String!
    $author: String!
    $coverImage: Upload!
    $audiofile: Upload!
  ) {
    addSoundtrack(
      input: { title: $title, author: $author, coverImage: $coverImage, audiofile: $audiofile }
    )
  }
`
export type AddSoundtrackMutationFn = Apollo.MutationFunction<
  AddSoundtrackMutation,
  AddSoundtrackMutationVariables
>
export type AddSoundtrackMutationOptions = Apollo.BaseMutationOptions<
  AddSoundtrackMutation,
  AddSoundtrackMutationVariables
>
