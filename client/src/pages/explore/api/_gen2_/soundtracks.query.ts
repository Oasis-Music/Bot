import * as Types from '../../../../shared/lib/gqlgen.types2'

import { gql } from 'urql'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type AllSoundtracksQueryVariables = Types.Exact<{
  page: Types.Scalars['Int']['input']
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
      coverURL?: string | null
      audioURL: string
      attached: boolean
    }>
  }
}

export const AllSoundtracksDocument = gql`
  query AllSoundtracks($page: Int!) {
    soundtracks(filter: { page: $page }) {
      soundtracks {
        id
        title
        author
        duration
        coverURL
        audioURL
        attached
      }
    }
  }
`

export function useAllSoundtracksQuery(
  options: Omit<Urql.UseQueryArgs<AllSoundtracksQueryVariables>, 'query'>
) {
  return Urql.useQuery<AllSoundtracksQuery, AllSoundtracksQueryVariables>({
    query: AllSoundtracksDocument,
    ...options
  })
}
