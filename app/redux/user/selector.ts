import { createSelector } from 'reselect'

import { AppState } from '../types'

export const selectUser = (state: AppState) => state.user
export const selectUserMetadata = (state: AppState) =>
  state.user?.user?.metadata

export const selectAppUser = createSelector(
  selectUser,
  (user) => (user?.user ?? {}) as RiseUser
)

export const selectUserAvatar = createSelector(
  selectUser,
  (userSlice) => userSlice.user?.profilePicUrl
)

export const selectUserId = createSelector(selectUser, (user) => user.userId)
export const selectUserToken = createSelector(selectUser, (user) => user.token)
export const selectIDVerified = createSelector(
  selectUserMetadata,
  (metadata) => !!metadata?.idVerified
)

export const selectIDVerificationStatus = createSelector(
  selectAppUser,
  selectIDVerified,
  (user, idVerified) => {
    if (idVerified) {
      return 'Verified'
    } else if (user.verification.proofOfIdStatus === 'pending approval') {
      return 'Pending'
    } else if (user.verification.proofOfIdStatus === 'declined') {
      return 'Declined'
    } else {
      return 'Not Verified'
    }
  }
)

export const selectItemsVerified = createSelector(
  selectUserMetadata,
  selectAppUser,
  (metadata, user) => {
    const idVerified = !!metadata?.idVerified
    const emailVerified = !!user?.emailVerified
    return Number(emailVerified) + Number(idVerified)
  }
)

export const selectUserStats = createSelector(selectUser, (user) => user.stats)
