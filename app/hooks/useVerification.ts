import { generateOTP } from 'app/redux/user/dispatchers'
import { selectAppUser, selectUserMetadata } from 'app/redux/user/selector'
import { USER_ACTION_TYPES } from 'app/redux/user/types'
import { setUserProperties } from 'app/utils/analytics'
import instance from 'app/utils/axios'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const ITEMS_TO_VERIFY = 2

export function useVerification() {
  const dispatch = useDispatch()
  const selectIDVerified = createSelector(
    selectUserMetadata,
    (metadata) => !!metadata?.idVerified
  )

  const selectIDVerificationStatus = createSelector(
    selectAppUser,
    selectIDVerified,
    (user, idVerified) => {
      if (idVerified) {
        return 'Verified'
      } else if (user?.verification?.proofOfIdStatus === 'pending approval') {
        return 'Pending'
      } else if (user?.verification?.proofOfIdStatus === 'declined') {
        return 'Declined'
      } else {
        return 'Not Verified'
      }
    }
  )

  const selectBvnVerified = createSelector(
    selectAppUser,
    (user) => !!user?.bvnVerified
  )

  const selectItemsVerified = createSelector(
    selectUserMetadata,
    selectAppUser,
    (metadata, user) => {
      const idVerified = !!metadata?.idVerified
      const emailVerified = !!user?.emailVerified
      return Number(emailVerified) + Number(idVerified)
    }
  )

  const selectFullyVerified = createSelector(
    selectItemsVerified,
    (verified) => verified === ITEMS_TO_VERIFY
  )

  const selectEmailVerified = createSelector(
    selectAppUser,
    (user) => user?.emailVerified ?? false
  )

  const handleVerifyEmail = (email: string, phone: string) => {
    return generateOTP(email, phone)(dispatch)
  }

  const handleSubmitId = async (userId: number, data: any) => {
    const response = await instance.post(`/users/${userId}/documents`, data)
    if (response?.status === 200) {
      dispatch({ type: USER_ACTION_TYPES.UPLOAD_DOCUMENT_IMAGE })
    }
  }

  setUserProperties({ id_verified: useSelector(selectIDVerified) })

  return {
    bvnVerified: useSelector(selectBvnVerified),
    emailVerified: useSelector(selectEmailVerified),
    fullyVerified: useSelector(selectFullyVerified),
    handleSubmitId,
    handleVerifyEmail,
    idVerified: useSelector(selectIDVerified),
    idVerifiedStatus: useSelector(selectIDVerificationStatus),
    itemsToVerify: ITEMS_TO_VERIFY,
    itemsVerified: useSelector(selectItemsVerified)
  }
}
