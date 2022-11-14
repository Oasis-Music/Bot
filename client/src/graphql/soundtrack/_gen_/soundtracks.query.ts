import * as Types from '../../../types'

import { gql } from '@apollo/client'
export type AllSoundtracksQueryVariables = Types.Exact<{
  page: Types.Scalars['Int']
}>

export type AllSoundtracksQuery = {
  __typename?: 'Query'
  soundtracks: {
    __typename?: 'SoundtracksResponse'
    soundtracks: Array<{
      __typename?: 'Soundtrack'
      id: string
      title: string
      author: string
      duration: number
      coverURL: string
      audioURL: string
    }>
  }
}

export type AllSoundtracksVariables = AllSoundtracksQueryVariables
export type AllSoundtracksSoundtracks = NonNullable<AllSoundtracksQuery['soundtracks']>
export type AllSoundtracks_Soundtracks = NonNullable<
  NonNullable<NonNullable<AllSoundtracksQuery['soundtracks']>['soundtracks']>[number]
>

export const AllSoundtracksDocument = gql`
  query allSoundtracks($page: Int!) {
    soundtracks(filter: { page: $page }) {
      soundtracks {
        id
        title
        author
        duration
        coverURL
        audioURL
      }
    }
  }
`
