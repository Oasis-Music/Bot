import * as Types from '../../../types'

import { gql } from '@apollo/client'
export type GetSoundtrackQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetSoundtrackQuery = {
  __typename?: 'Query'
  soundtrack?:
    | { __typename: 'NotFound'; message: string }
    | {
        __typename: 'Soundtrack'
        id: string
        title: string
        author: string
        duration: number
        coverURL?: string | null
        audioURL: string
        createdAt: string
        attached: boolean
      }
    | null
}

type DiscriminateUnion<T, U> = T extends U ? T : never

export type GetSoundtrackVariables = GetSoundtrackQueryVariables
export type GetSoundtrackSoundtrack = NonNullable<GetSoundtrackQuery['soundtrack']>
export type GetSoundtrackSoundtrackInlineFragment = DiscriminateUnion<
  NonNullable<GetSoundtrackQuery['soundtrack']>,
  { __typename?: 'Soundtrack' }
>
export type GetSoundtrackNotFoundInlineFragment = DiscriminateUnion<
  NonNullable<GetSoundtrackQuery['soundtrack']>,
  { __typename?: 'NotFound' }
>

export const GetSoundtrackDocument = gql`
  query GetSoundtrack($id: ID!) {
    soundtrack(id: $id) {
      __typename
      ... on Soundtrack {
        id
        title
        author
        duration
        coverURL
        audioURL
        createdAt
        attached
      }
      ... on NotFound {
        message
      }
    }
  }
`
