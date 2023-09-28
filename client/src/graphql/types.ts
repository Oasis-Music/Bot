export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  Date: { input: any; output: any }
  Upload: { input: any; output: any }
}

export type AttachSoundtrackInput = {
  trackId: Scalars['String']['input']
  userId: Scalars['String']['input']
}

export type AuthorizationResponse = {
  __typename?: 'AuthorizationResponse'
  refreshToken: Scalars['String']['output']
  token: Scalars['String']['output']
}

export type CreateSoundtrackInput = {
  attach: Scalars['Boolean']['input']
  audiofile: Scalars['Upload']['input']
  author: Scalars['String']['input']
  coverImage?: InputMaybe<Scalars['Upload']['input']>
  title: Scalars['String']['input']
}

export type Mutation = {
  __typename?: 'Mutation'
  attachSoundtrack: Scalars['Boolean']['output']
  createSoundtrack: Scalars['Boolean']['output']
  deleteSoundtrack: Scalars['Boolean']['output']
  unattachSoundtrack: Scalars['Boolean']['output']
}

export type MutationAttachSoundtrackArgs = {
  input: AttachSoundtrackInput
}

export type MutationCreateSoundtrackArgs = {
  input: CreateSoundtrackInput
}

export type MutationDeleteSoundtrackArgs = {
  id: Scalars['ID']['input']
}

export type MutationUnattachSoundtrackArgs = {
  input: UnattachSoundtrackInput
}

export type NotFound = {
  __typename?: 'NotFound'
  message: Scalars['String']['output']
}

export type Query = {
  __typename?: 'Query'
  authorizeUser: AuthorizationResponse
  searchSoundtrack: Array<Soundtrack>
  soundtrack?: Maybe<SoundtrackResult>
  soundtracks: SoundtracksResponse
  user?: Maybe<UserResult>
  userSoundtracks: UserSoundtracksResult
}

export type QueryAuthorizeUserArgs = {
  initData: Scalars['String']['input']
}

export type QuerySearchSoundtrackArgs = {
  value: Scalars['String']['input']
}

export type QuerySoundtrackArgs = {
  id: Scalars['ID']['input']
}

export type QuerySoundtracksArgs = {
  filter: SoundtracksFilter
}

export type QueryUserArgs = {
  id: Scalars['ID']['input']
}

export type QueryUserSoundtracksArgs = {
  filter: UserSoundtracksFilter
  id: Scalars['ID']['input']
}

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Soundtrack = {
  __typename?: 'Soundtrack'
  attached: Scalars['Boolean']['output']
  audioURL: Scalars['String']['output']
  author: Scalars['String']['output']
  coverURL?: Maybe<Scalars['String']['output']>
  createdAt: Scalars['Date']['output']
  creator: User
  creatorId: Scalars['String']['output']
  duration: Scalars['Int']['output']
  id: Scalars['ID']['output']
  title: Scalars['String']['output']
  validated: Scalars['Boolean']['output']
}

export type SoundtrackResult = NotFound | Soundtrack

export type SoundtracksFilter = {
  page: Scalars['Int']['input']
}

export type SoundtracksResponse = {
  __typename?: 'SoundtracksResponse'
  soundtracks: Array<Soundtrack>
}

export type UnattachSoundtrackInput = {
  trackId: Scalars['ID']['input']
  userId: Scalars['ID']['input']
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['Date']['output']
  firstName: Scalars['String']['output']
  id: Scalars['ID']['output']
  languageCode?: Maybe<Scalars['String']['output']>
  lastName?: Maybe<Scalars['String']['output']>
  role: Scalars['String']['output']
  username?: Maybe<Scalars['String']['output']>
  visitedAt: Scalars['Date']['output']
}

export type UserResult = NotFound | User

export type UserSoundtracksFilter = {
  page: Scalars['Int']['input']
}

export type UserSoundtracksResponse = {
  __typename?: 'UserSoundtracksResponse'
  soundtracks: Array<Soundtrack>
  total: Scalars['Int']['output']
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
