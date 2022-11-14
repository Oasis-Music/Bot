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
  Upload: any
}

export type AddSoundtrackInput = {
  audiofile: Scalars['Upload']
  author: Scalars['String']
  coverImage: Scalars['Upload']
  title: Scalars['String']
}

export type AddTrackToUserInput = {
  trackId: Scalars['String']
  userId: Scalars['String']
}

export type DeleteTrackFromUserInput = {
  trackId: Scalars['ID']
  userId: Scalars['ID']
}

export type Mutation = {
  __typename?: 'Mutation'
  addSoundtrack: Scalars['Boolean']
  addTrackToUser: Scalars['Boolean']
  deleteTrackFromUser: Scalars['Boolean']
}

export type MutationAddSoundtrackArgs = {
  input: AddSoundtrackInput
}

export type MutationAddTrackToUserArgs = {
  input: AddTrackToUserInput
}

export type MutationDeleteTrackFromUserArgs = {
  input: DeleteTrackFromUserInput
}

export type NotFound = {
  __typename?: 'NotFound'
  message: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  soundtrack?: Maybe<SoundtrackResult>
  soundtracks: SoundtracksResponse
  user?: Maybe<UserResult>
  userTracks: UserTracksResult
}

export type QuerySoundtrackArgs = {
  id: Scalars['ID']
}

export type QuerySoundtracksArgs = {
  filter: SoundtracksFilter
}

export type QueryUserArgs = {
  id: Scalars['ID']
}

export type QueryUserTracksArgs = {
  filter: UserTracksFilter
  id: Scalars['ID']
}

export type Soundtrack = {
  __typename?: 'Soundtrack'
  audioURL: Scalars['String']
  author: Scalars['String']
  coverURL: Scalars['String']
  createdAt: Scalars['Date']
  creatorId: Scalars['String']
  duration: Scalars['Int']
  id: Scalars['ID']
  title: Scalars['String']
  validated: Scalars['Boolean']
}

export type SoundtrackResult = NotFound | Soundtrack

export type SoundtracksFilter = {
  page: Scalars['Int']
}

export type SoundtracksResponse = {
  __typename?: 'SoundtracksResponse'
  soundtracks: Array<Soundtrack>
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['Date']
  id: Scalars['ID']
  telegramId: Scalars['String']
}

export type UserResult = NotFound | User

export type UserTracksFilter = {
  page: Scalars['Int']
}

export type UserTracksResponse = {
  __typename?: 'UserTracksResponse'
  soundtracks: Array<Soundtrack>
}

export type UserTracksResult = NotFound | UserTracksResponse

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    SoundtrackResult: ['NotFound', 'Soundtrack'],
    UserResult: ['NotFound', 'User'],
    UserTracksResult: ['NotFound', 'UserTracksResponse']
  }
}
export default result
