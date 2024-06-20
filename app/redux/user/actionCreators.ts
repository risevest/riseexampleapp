import { USER_ACTION_TYPES as actionTypes, UserStats } from './types'

export const handleRequestTypeActionCreators = (type: actionTypes) => ({
  type
})

export const setToken = (token: any) => ({
  token,
  type: actionTypes.SET_AUTH_TOKEN
})

export const setUserId = (userId: number) => ({
  type: actionTypes.SET_USER_ID,
  userId
})

export const editUserAction = (userData: RiseUser) => ({
  type: actionTypes.EDIT_USER_SUCCESS,
  userData
})
export const updateUser = (userData: RiseUser) => ({
  type: actionTypes.UPDATE_USER,
  userData
})
export const getNextOfKinAction = (nextOfKin: INextOfKin) => ({
  nextOfKin,
  type: actionTypes.GET_NEXT_OF_KIN_SUCCESS
})

export const changeUserEmailAction = (email: string) => ({
  email,
  type: actionTypes.CHANGE_EMAIL_SUCCESS
})

export const clearToken = () => ({
  type: actionTypes.CLEAR_TOKEN
})

export const clearReduxStore = () => ({
  type: actionTypes.CLEAR_REDUX_STORE
})

export const fetchUserSuccess = (userData: RiseUser) => ({
  type: actionTypes.FETCH_USER_SUCCESS,
  userData
})

export const resetLoginState = () => ({
  type: actionTypes.RESET_LOGIN_STATE
})

export const setLastSeen = (timeStamp: number) => {
  return {
    timeStamp,
    type: actionTypes.SET_LAST_SEEN
  }
}
export const enterReferralCodeSuccess = (referralId: number) => ({
  referralId,
  type: actionTypes.ENTER_REFERRAL_CODE_SUCCESS
})

export const updateMoreInfoAction = (userData: RiseUser) => ({
  type: actionTypes.UPDATE_MORE_INFO_SUCCESS,
  userData
})

export const makeUserAffiliateSuccess = (isApproved: boolean) => ({
  isApproved,
  type: actionTypes.MAKE_USER_AFFILIATE_SUCCESS
})

export const getUserStatsSuccess = (stats: UserStats) => ({
  stats,
  type: actionTypes.GET_USER_STAT_SUCCESS
})
