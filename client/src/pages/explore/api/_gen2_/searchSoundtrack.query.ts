import * as Types from '../../../../shared/lib/gqlgen.types2'

import { gql } from 'urql'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type SearchSoundtrackQueryVariables = Types.Exact<{
  value: Types.Scalars['String']['input']
}>

export type SearchSoundtrackQuery = {
  __typename?: 'Query'
  searchSoundtrack: Array<{
    __typename?: 'Soundtrack'
    id: string
    title: string
    author: string
    duration: number
    coverURL?: string | null
    audioURL: string
    createdAt: unknown
    attached: boolean
  }>
}

export const SearchSoundtrackDocument = gql`
  query SearchSoundtrack($value: String!) {
    searchSoundtrack(value: $value) {
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

export function useSearchSoundtrackQuery(
  options: Omit<Urql.UseQueryArgs<SearchSoundtrackQueryVariables>, 'query'>
) {
  return Urql.useQuery<SearchSoundtrackQuery, SearchSoundtrackQueryVariables>({
    query: SearchSoundtrackDocument,
    ...options
  })
}
