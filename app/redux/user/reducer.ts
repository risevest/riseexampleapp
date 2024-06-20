import {
  changeUserEmailSuccess,
  EditUserSuccess,
  EnterReferralCodSuccess,
  FetchUserSuccess,
  GetSettingsSuccess,
  GetUserStatsSuccess,
  MakeUserAffiliateSuccess,
  SetLastSeen,
  setNextOfKin,
  SetUserIdSuccess,
  setUserImage,
  SetUserToken,
  UpdateMoreInfoSuccess,
  USER_ACTION_TYPES as actionType,
  UserActions,
  UserState,
  VerifyUserSuccess
} from './types'

export const initialState: UserState = {
  cards: null,
  isLoading: false,
  nextOfKin: null,
  requestStatus: 'idle',
  searchedUsers: [],
  settings: {
    'max-allowed-advisory-aum-rank': '0'
  },
  stats: {
    totalDeposited: 0,
    totalPaidOut: 0,
    totalReturns: 0
  },
  timeStamp: 0,
  token: null,
  user: null,
  userId: null
}

const ACTIONS: any = {
  [actionType.LOGIN_REQUEST]: (state: UserState) => ({
    ...state,
    isLoading: true,
    requestStatus: 'pending'
  }),
  [actionType.SET_LAST_SEEN]: (
    state: UserState,
    { timeStamp }: SetLastSeen
  ) => ({
    ...state,
    timeStamp
  }),
  [actionType.LOGIN_SUCCESS]: (state: UserState) => ({
    ...state,
    isLoading: false,
    requestStatus: 'success'
  }),
  [actionType.LOGIN_ERROR]: (state: UserState) => ({
    ...state,
    isLoading: false,
    requestStatus: 'failed'
  }),
  [actionType.SIGN_UP_REQUEST]: (state: UserState) => ({
    ...state,
    isLoading: true
  }),
  [actionType.SIGN_UP_SUCCESS]: (state: UserState) => ({
    ...state,
    isLoading: false
  }),
  [actionType.SIGN_UP_ERROR]: (state: UserState) => ({
    ...state,
    isLoading: false
  }),
  [actionType.SET_AUTH_TOKEN]: (state: UserState, { token }: SetUserToken) => ({
    ...state,
    token
  }),
  [actionType.SET_USER_ID]: (
    state: UserState,
    { userId }: SetUserIdSuccess
  ) => ({
    ...state,
    userId
  }),
  [actionType.EDIT_USER_REQUEST]: (state: UserState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [actionType.EDIT_USER_SUCCESS]: (
    state: UserState,
    { userData }: EditUserSuccess
  ) => ({
    ...state,
    requestStatus: 'success',
    user: {
      ...state.user,
      ...userData
    }
  }),
  [actionType.UPDATE_USER]: (
    state: UserState,
    { userData }: EditUserSuccess
  ) => ({
    ...state,
    user: {
      ...state.user,
      ...userData
    }
  }),
  [actionType.CHANGE_EMAIL_ERROR]: (state: UserState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [actionType.CHANGE_EMAIL_REQUEST]: (state: UserState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [actionType.CHANGE_EMAIL_SUCCESS]: (
    state: UserState,
    { email }: changeUserEmailSuccess
  ) => ({
    ...state,
    requestStatus: 'success',
    user: { ...state.user, ...{ email } }
  }),
  [actionType.EDIT_USER_ERROR]: (state: UserState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [actionType.CLEAR_TOKEN]: (state: UserState) => ({
    ...state,
    requestStatus: 'idle',
    token: null
  }),
  [actionType.FETCH_USER_REQUEST]: (state: UserState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [actionType.FETCH_USER_SUCCESS]: (
    state: UserState,
    { userData }: FetchUserSuccess
  ) => ({
    ...state,
    requestStatus: 'success',
    user: userData
  }),
  [actionType.FETCH_USER_ERROR]: (state: UserState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [actionType.VERIFY_USER_REQUEST]: (state: UserState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [actionType.VERIFY_USER_SUCCESS]: (
    state: UserState,
    { verifyType }: VerifyUserSuccess
  ) => ({
    ...state,
    requestStatus: 'success',
    user: {
      ...state.user,
      ...(verifyType === 'verify' && { emailVerified: true })
    }
  }),
  [actionType.VERIFY_USER_ERROR]: (state: UserState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [actionType.RESET_USER_PASSWORD_REQUEST]: (state: UserState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [actionType.RESET_USER_PASSWORD_SUCCESS]: (state: UserState) => ({
    ...state,
    requestStatus: 'success'
  }),
  [actionType.RESET_USER_PASSWORD_ERROR]: (state: UserState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [actionType.VERIFY_USER_BVN_REQUEST]: (state: UserState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [actionType.VERIFY_USER_BVN_SUCCESS]: (state: UserState) => ({
    ...state,
    requestStatus: 'success'
  }),
  [actionType.VERIFY_USER_BVN_ERROR]: (state: UserState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [actionType.VERIFY_USER_PASSWORD_REQUEST]: (state: UserState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [actionType.VERIFY_USER_PASSWORD_SUCCESS]: (state: UserState) => ({
    ...state,
    requestStatus: 'success'
  }),
  [actionType.VERIFY_USER_PASSWORD_ERROR]: (state: UserState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [actionType.SAVE_USER_BVN_REQUEST]: (state: UserState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [actionType.SAVE_USER_BVN_SUCCESS]: (state: UserState) => ({
    ...state,
    requestStatus: 'success'
  }),
  [actionType.SAVE_USER_BVN_ERROR]: (state: UserState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [actionType.PIN_LOGIN_REQUEST]: (state: UserState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [actionType.PIN_LOGIN_SUCCESS]: (state: UserState) => ({
    ...state,
    requestStatus: 'success'
  }),
  [actionType.PIN_LOGIN_ERROR]: (state: UserState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [actionType.UPLOAD_USER_IMAGE_REQUEST]: (state: UserState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [actionType.UPLOAD_USER_IMAGE_ERROR]: (state: UserState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [actionType.UPLOAD_USER_IMAGE_SUCCESS]: (
    state: UserState,
    { url }: setUserImage
  ) => ({
    ...state,
    requestStatus: 'success',
    user: { ...state.user, ...{ profilePicUrl: url } }
  }),
  [actionType.UPLOAD_DOCUMENT_IMAGE]: (state: UserState) => ({
    ...state,
    requestStatus: 'success',
    user: {
      ...state.user,
      verification: {
        ...state.user?.verification,
        proofOfIdStatus: 'pending approval'
      }
    }
  }),
  [actionType.GENERATE_OTP_REQUEST]: (state: UserState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [actionType.GENERATE_OTP_SUCCESS]: (state: UserState) => ({
    ...state,
    requestStatus: 'success'
  }),
  [actionType.GENERATE_OTP_ERROR]: (state: UserState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [actionType.GET_NEXT_OF_KIN_REQUEST]: (state: UserState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [actionType.GET_NEXT_OF_KIN_SUCCESS]: (
    state: UserState,
    { nextOfKin }: setNextOfKin
  ) => ({
    ...state,
    nextOfKin,
    requestStatus: 'success'
  }),
  [actionType.GET_NEXT_OF_KIN_ERROR]: (state: UserState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [actionType.SET_NEXT_OF_KIN_REQUEST]: (state: UserState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [actionType.SET_NEXT_OF_KIN_SUCCESS]: (state: UserState) => ({
    ...state,
    requestStatus: 'success'
  }),
  [actionType.SET_NEXT_OF_KIN_ERROR]: (state: UserState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [actionType.RESET_LOGIN_STATE]: (state: UserState) => ({
    ...state,
    isLoading: false,
    requestStatus: 'idle'
  }),
  [actionType.ENTER_REFERRAL_CODE_REQUEST]: (state: UserState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [actionType.ENTER_REFERRAL_CODE_SUCCESS]: (
    state: UserState,
    { referralId }: EnterReferralCodSuccess
  ) => ({
    ...state,
    requestStatus: 'success',
    user: {
      ...state.user,
      referralId
    }
  }),
  [actionType.ENTER_REFERRAL_CODE_ERROR]: (state: UserState) => ({
    ...state,
    requestStatus: 'failed'
  }),

  [actionType.UPDATE_MORE_INFO_REQUEST]: (state: UserState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [actionType.UPDATE_MORE_INFO_SUCCESS]: (
    state: UserState,
    { userData }: UpdateMoreInfoSuccess
  ) => ({
    ...state,
    requestStatus: 'success',
    user: userData
  }),
  [actionType.UPDATE_MORE_INFO_ERROR]: (state: UserState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [actionType.MAKE_USER_AFFILIATE_REQUEST]: (state: UserState) => ({
    ...state,
    requestStatus: 'pending'
  }),

  [actionType.MAKE_USER_AFFILIATE_SUCCESS]: (
    state: UserState,
    { isApproved }: MakeUserAffiliateSuccess
  ) => {
    return {
      ...state,
      requestStatus: 'success',
      user: {
        ...state.user,
        account: {
          ...state.user?.account,
          referral: {
            ...state.user?.account?.referral,
            isAffiliate: isApproved
          }
        }
      }
    }
  },
  [actionType.MAKE_USER_AFFILIATE_ERROR]: (state: UserState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [actionType.VERIFY_USER_BVN_SELFIE_REQUEST]: (state: UserState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [actionType.VERIFY_USER_BVN_SELFIE_SUCCESS]: (state: UserState) => ({
    ...state,
    requestStatus: 'success',
    user: {
      ...state.user,
      bvnVerified: true
    }
  }),
  [actionType.VERIFY_USER_BVN_SELFIE_ERROR]: (state: UserState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [actionType.GET_USER_STAT_REQUEST]: (state: UserState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [actionType.GET_USER_STAT_SUCCESS]: (
    state: UserState,
    { stats }: GetUserStatsSuccess
  ) => ({
    ...state,
    requestStatus: 'success',
    stats
  }),
  [actionType.GET_USER_STAT_ERROR]: (state: UserState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [actionType.GET_SETTINGS_REQUEST]: (state: UserState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [actionType.GET_SETTINGS_SUCCESS]: (
    state: UserState,
    { settings }: GetSettingsSuccess
  ) => ({
    ...state,
    requestStatus: 'success',
    settings
  }),
  [actionType.GET_SETTINGS_ERROR]: (state: UserState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [actionType.STATEMENT_REQUEST]: (state: UserState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [actionType.STATEMENT_SUCCESS]: (state: UserState) => ({
    ...state,
    requestStatus: 'success'
  }),
  [actionType.STATEMENT_ERROR]: (state: UserState) => ({
    ...state,
    requestStatus: 'failed'
  })
}

export const userReducer = (state = initialState, action: UserActions) => {
  const handler = ACTIONS[action.type]
  return handler ? handler(state, action) : state
}
