import { userVar, isAuthenticatedVar } from '../variables'

import { processAccessToken, logout } from './user'

export const UserMutations = {
  processAccessToken: processAccessToken(userVar, isAuthenticatedVar),
  logout: logout(userVar, isAuthenticatedVar)
}
