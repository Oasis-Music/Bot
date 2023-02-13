import * as Types from '../../../types'

import { gql } from '@apollo/client'
export type SoundtrackByTitleQueryVariables = Types.Exact<{
  title: Types.Scalars['String']
}>

export type SoundtrackByTitleQuery = {
  __typename?: 'Query'
  soundtrackByTitle: Array<{
    __typename?: 'Soundtrack'
    id: string
    title: string
    author: string
    duration: number
    coverURL?: string | null
    audioURL: string
    createdAt: string
    attached: boolean
  }>
}

export type SoundtrackByTitleVariables = SoundtrackByTitleQueryVariables
export type SoundtrackByTitleSoundtrackByTitle = NonNullable<
  NonNullable<SoundtrackByTitleQuery['soundtrackByTitle']>[number]
>

export const SoundtrackByTitleDocument = gql`
  query SoundtrackByTitle($title: String!) {
    soundtrackByTitle(title: $title) {
      id
      title
      author
      duration
      coverURL
      audioURL
      createdAt
      attached
    }
  }
`
