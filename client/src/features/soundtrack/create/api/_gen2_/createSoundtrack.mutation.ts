import * as Types from '../../../../../shared/lib/gqlgen.types2'

import { gql } from 'urql'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
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

export function useCreateSoundtrackMutation() {
  return Urql.useMutation<CreateSoundtrackMutation, CreateSoundtrackMutationVariables>(
    CreateSoundtrackDocument
  )
}
