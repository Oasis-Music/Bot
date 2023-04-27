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

export type AttachSoundtrackInput = {
  trackId: Scalars['String']
  userId: Scalars['String']
}

export type AuthorizationResponse = {
  __typename?: 'AuthorizationResponse'
  refreshToken: Scalars['String']
  token: Scalars['String']
}

export type CreateSoundtrackInput = {
  attach: Scalars['Boolean']
  audiofile: Scalars['Upload']
  author: Scalars['String']
  coverImage?: InputMaybe<Scalars['Upload']>
  title: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  attachSoundtrack: Scalars['Boolean']
  createSoundtrack: Scalars['Boolean']
  deleteSoundtrack: Scalars['Boolean']
  unattachSoundtrack: Scalars['Boolean']
}

export type MutationAttachSoundtrackArgs = {
  input: AttachSoundtrackInput
}

export type MutationCreateSoundtrackArgs = {
  input: CreateSoundtrackInput
}

export type MutationDeleteSoundtrackArgs = {
  id: Scalars['ID']
}

export type MutationUnattachSoundtrackArgs = {
  input: UnattachSoundtrackInput
}

export type NotFound = {
  __typename?: 'NotFound'
  message: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  authorizeUser: AuthorizationResponse
  soundtrack?: Maybe<SoundtrackResult>
  soundtrackByTitle: Array<Soundtrack>
  soundtracks: SoundtracksResponse
  user?: Maybe<UserResult>
  userSoundtracks: UserSoundtracksResult
}

export type QueryAuthorizeUserArgs = {
  initData: Scalars['String']
}

export type QuerySoundtrackArgs = {
  id: Scalars['ID']
}

export type QuerySoundtrackByTitleArgs = {
  title: Scalars['String']
}

export type QuerySoundtracksArgs = {
  filter: SoundtracksFilter
}

export type QueryUserArgs = {
  id: Scalars['ID']
}

export type QueryUserSoundtracksArgs = {
  filter: UserSoundtracksFilter
  id: Scalars['ID']
}

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Soundtrack = {
  __typename?: 'Soundtrack'
  attached: Scalars['Boolean']
  audioURL: Scalars['String']
  author: Scalars['String']
  coverURL?: Maybe<Scalars['String']>
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

export type UnattachSoundtrackInput = {
  trackId: Scalars['ID']
  userId: Scalars['ID']
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['Date']
  firstName: Scalars['String']
  id: Scalars['ID']
  languageCode?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  role: Scalars['String']
  username?: Maybe<Scalars['String']>
  visitedAt: Scalars['Date']
}

export type UserResult = NotFound | User

export type UserSoundtracksFilter = {
  page: Scalars['Int']
}

export type UserSoundtracksResponse = {
  __typename?: 'UserSoundtracksResponse'
  soundtracks: Array<Soundtrack>
  total: Scalars['Int']
}

export type UserSoundtracksResult = NotFound | UserSoundtracksResponse

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    SoundtrackResult: ['NotFound', 'Soundtrack'],
    UserResult: ['NotFound', 'User'],
    UserSoundtracksResult: ['NotFound', 'UserSoundtracksResponse']
  }
}
export default result
