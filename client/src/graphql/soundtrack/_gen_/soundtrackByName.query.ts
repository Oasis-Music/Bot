import * as Types from '../../../types'

import { gql } from '@apollo/client'
export type SoundtrackByNameQueryVariables = Types.Exact<{
  name: Types.Scalars['String']
}>

export type SoundtrackByNameQuery = {
  __typename?: 'Query'
  soundtrackByName: Array<{
    __typename?: 'Soundtrack'
    id: string
    title: string
    author: string
    duration: number
    coverURL?: string | null
    audioURL: string
    createdAt: string
  }>
}

export type SoundtrackByNameVariables = SoundtrackByNameQueryVariables
export type SoundtrackByNameSoundtrackByName = NonNullable<
  NonNullable<SoundtrackByNameQuery['soundtrackByName']>[number]
>

export const SoundtrackByNameDocument = gql`
  query SoundtrackByName($name: String!) {
    soundtrackByName(name: $name) {
      id
      title
      author
      duration
      coverURL
      audioURL
      createdAt
    }
  }
`
