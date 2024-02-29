import { userVar } from '@/entities/user'
import { isAuthenticatedVar } from '@/entities/auth'

import { logout } from './user'

export const UserMutations = {
  logout: logout(userVar, isAuthenticatedVar)
}
