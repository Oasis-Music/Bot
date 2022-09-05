import * as Types from '../../../types'

import { gql } from '@apollo/client'
export type GetTrackByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetTrackByIdQuery = {
  __typename?: 'Query'
  soundtrack?:
    | { __typename: 'NotFound'; message: string }
    | {
        __typename: 'Soundtrack'
        id: string
        title: string
        author: string
        duration: number
        coverImage: string
        fileURL: string
        createdAt: string
      }
    | null
}

type DiscriminateUnion<T, U> = T extends U ? T : never

export type GetTrackByIdVariables = GetTrackByIdQueryVariables
export type GetTrackByIdSoundtrack = NonNullable<GetTrackByIdQuery['soundtrack']>
export type GetTrackByIdSoundtrackInlineFragment = DiscriminateUnion<
  NonNullable<GetTrackByIdQuery['soundtrack']>,
  { __typename?: 'Soundtrack' }
>
export type GetTrackByIdNotFoundInlineFragment = DiscriminateUnion<
  NonNullable<GetTrackByIdQuery['soundtrack']>,
  { __typename?: 'NotFound' }
>

export const GetTrackByIdDocument = gql`
  query getTrackByID($id: ID!) {
    soundtrack(id: $id) {
      __typename
      ... on Soundtrack {
        id
        title
        author
        duration
        coverImage
        fileURL
        createdAt
      }
      ... on NotFound {
        message
      }
    }
  }
`
