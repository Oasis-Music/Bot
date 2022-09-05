export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: any
}

export type NotFound = {
  __typename?: 'NotFound'
  message: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  soundtrack?: Maybe<SoundtrackResult>
  soundtracks: SoundtracksResponse
}

export type QuerySoundtrackArgs = {
  id: Scalars['ID']
}

export type QuerySoundtracksArgs = {
  filter: SoundtracksFilter
}

export type Soundtrack = {
  __typename?: 'Soundtrack'
  author: Scalars['String']
  coverImage: Scalars['String']
  createdAt: Scalars['Date']
  duration: Scalars['Int']
  fileURL: Scalars['String']
  id: Scalars['ID']
  title: Scalars['String']
}

export type SoundtrackResult = NotFound | Soundtrack

export type SoundtracksFilter = {
  page: Scalars['Int']
}

export type SoundtracksResponse = {
  __typename?: 'SoundtracksResponse'
  soundtracks: Array<Soundtrack>
}

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    SoundtrackResult: ['NotFound', 'Soundtrack']
  }
}
export default result
