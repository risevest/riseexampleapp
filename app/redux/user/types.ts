import { Dispatch } from 'redux'

/** --------- ACTION TYPES ENUM  */
export enum USER_ACTION_TYPES {
  CHANGE_EMAIL_ERROR = 'user/CHANGE_EMAIL_ERROR',
  CHANGE_EMAIL_REQUEST = 'user/CHANGE_EMAIL_REQUEST',
  CHANGE_EMAIL_SUCCESS = 'user/CHANGE_EMAIL_SUCCESS',
  CLEAR_REDUX_STORE = 'user/CLEAR_REDUX_STORE',

  CLEAR_TOKEN = 'user/CLEAR_TOKEN',
  EDIT_USER_ERROR = 'user/EDIT_USER_ERROR',
  EDIT_USER_REQUEST = 'user/EDIT_USER_REQUEST',

  EDIT_USER_SUCCESS = 'user/EDIT_USER_SUCCESS',
  ENTER_REFERRAL_CODE_ERROR = 'user/ENTER_REFERRAL_CODE_ERROR',
  ENTER_REFERRAL_CODE_REQUEST = 'user/ENTER_REFERRAL_CODE_REQUEST',

  ENTER_REFERRAL_CODE_SUCCESS = 'user/ENTER_REFERRAL_CODE_SUCCESS',
  FETCH_USER_ERROR = 'user/FETCH_USER_ERROR',
  FETCH_USER_REQUEST = 'user/FETCH_USER_REQUEST',

  FETCH_USER_SUCCESS = 'user/FETCH_USER_SUCCESS',
  GENERATE_OTP_ERROR = 'user/GENERATE_OTP_ERROR',
  GENERATE_OTP_REQUEST = 'user/GENERATE_OTP_REQUEST',

  GENERATE_OTP_SUCCESS = 'user/GENERATE_OTP_SUCCESS',
  GET_NEXT_OF_KIN_ERROR = 'user/GET_NEXT_OF_KIN_ERROR',
  GET_NEXT_OF_KIN_REQUEST = 'user/GET_NEXT_OF_KIN_REQUEST',

  GET_NEXT_OF_KIN_SUCCESS = 'user/GET_NEXT_OF_KIN_SUCCESS',
  GET_SETTINGS_ERROR = 'user/GET_SETTINGS_ERROR',
  GET_SETTINGS_REQUEST = 'user/GET_SETTINGS_REQUEST',

  GET_SETTINGS_SUCCESS = 'user/GET_SETTINGS_SUCCESS',
  GET_USER_STAT_ERROR = 'user/GET_USER_STAT_ERROR',
  GET_USER_STAT_REQUEST = 'user/GET_USER_STAT_REQUEST',

  GET_USER_STAT_SUCCESS = 'user/GET_USER_STAT_SUCCESS',
  LOGIN_ERROR = 'user/LOGIN_ERROR',
  LOGIN_REQUEST = 'user/LOGIN_REQUEST',

  LOGIN_SUCCESS = 'user/LOGIN_SUCCESS',
  MAKE_USER_AFFILIATE_ERROR = 'user/MAKE_USER_AFFILIATE_ERROR',
  MAKE_USER_AFFILIATE_REQUEST = 'user/MAKE_USER_AFFILIATE_REQUEST',

  MAKE_USER_AFFILIATE_SUCCESS = 'user/MAKE_USER_AFFILIATE_SUCCESS',
  PIN_LOGIN_ERROR = 'user/PIN_LOGIN_ERROR',
  PIN_LOGIN_REQUEST = 'user/PIN_LOGIN_REQUEST',

  PIN_LOGIN_SUCCESS = 'user/PIN_LOGIN_SUCCESS',
  RESET_LOGIN_STATE = 'user/RESET_LOGIN_STATE',
  RESET_USER_PASSWORD_ERROR = 'user/RESET_USER_PASSWORD_ERROR',

  RESET_USER_PASSWORD_REQUEST = 'user/RESET_USER_PASSWORD_REQUEST',
  RESET_USER_PASSWORD_SUCCESS = 'user/RESET_USER_PASSWORD_SUCCESS',
  SAVE_USER_BVN_ERROR = 'user/SAVE_USER_BVN_ERROR',

  SAVE_USER_BVN_REQUEST = 'user/SAVE_USER_BVN_REQUEST',
  SAVE_USER_BVN_SUCCESS = 'user/SAVE_USER_BVN_SUCCESS',
  SET_AUTH_TOKEN = 'user/SET_AUTH_TOKEN',

  SET_LAST_SEEN = 'user/SET_LAST_SEEN',
  SET_NEXT_OF_KIN_ERROR = 'user/SET_NEXT_OF_KIN_ERROR',
  SET_NEXT_OF_KIN_REQUEST = 'user/SET_NEXT_OF_KIN_REQUEST',

  SET_NEXT_OF_KIN_SUCCESS = 'user/SET_NEXT_OF_KIN_SUCCESS',
  SET_USER_ID = 'user/SET_USER_ID',
  SIGN_UP_ERROR = 'user/SIGN_UP_ERROR',

  SIGN_UP_REQUEST = 'user/SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS = 'user/SIGN_UP_SUCCESS',
  STATEMENT_ERROR = 'user/STATEMNT_ERROR',
  STATEMENT_REQUEST = 'user/STATEMENT_REQUEST',

  STATEMENT_SUCCESS = 'user/STATEMENT_SUCCESS',
  UPDATE_MORE_INFO_ERROR = 'user/UPDATTE_MORE_INFO_ERROR',
  UPDATE_MORE_INFO_REQUEST = 'user/UPDATE_MORE_INFO',

  UPDATE_MORE_INFO_SUCCESS = 'user/UPDATE_MORE_INFO_SUCCESS',
  UPDATE_USER = 'UPDATE_USER',
  UPLOAD_DOCUMENT_IMAGE = 'user/UPLOAD_DOCUMENT_IMAGE',

  UPLOAD_DOCUMENT_IMAGE_ERROR = 'user/UPLOAD_DOCUMENT_IMAGE_ERROR',
  UPLOAD_DOCUMENT_IMAGE_REQUEST = 'user/UPLOAD_DOCUMENT_IMAGE_REQUEST',
  UPLOAD_USER_IMAGE_ERROR = 'user/UPLOAD_USER_IMAGE_ERROR',

  UPLOAD_USER_IMAGE_REQUEST = 'user/UPLOAD_USER_IMAGE_REQUEST',
  UPLOAD_USER_IMAGE_SUCCESS = 'user/UPLOAD_USER_IMAGE_SUCCESS',
  VERIFY_EMAIL_ERROR = 'user/VERIFY_EMAIL_ERROR',

  VERIFY_EMAIL_REQUEST = 'user/VERIFY_EMAIL_REQUEST',
  VERIFY_EMAIL_SUCCESS = 'user/VERIFY_EMAIL_SUCCESS',
  VERIFY_USER_BVN_ERROR = 'user/VERIFY_USER_BVN_ERROR',

  VERIFY_USER_BVN_REQUEST = 'user/VERIFY_USER_BVN_REQUEST',
  VERIFY_USER_BVN_SELFIE_ERROR = 'user/VERIFY_USER_BVN_SELFIE_ERROR',
  VERIFY_USER_BVN_SELFIE_REQUEST = 'user/VERIFY_USER_BVN_SELFIE_REQUEST',

  VERIFY_USER_BVN_SELFIE_SUCCESS = 'user/VERIFY_USER_BVN_SELFIE_SUCCESS',
  VERIFY_USER_BVN_SUCCESS = 'user/VERIFY_USER_BVN_SUCCESS',
  VERIFY_USER_ERROR = 'user/VERIFY_USER_ERROR',

  VERIFY_USER_PASSWORD_ERROR = 'user/VERIFY_USER_PASSWORD_ERROR',
  VERIFY_USER_PASSWORD_REQUEST = 'user/VERIFY_USER_PASSWORD_REQUEST',
  VERIFY_USER_PASSWORD_SUCCESS = 'user/VERIFY_USER_PASSWORD_SUCCESS',

  VERIFY_USER_REQUEST = 'user/VERIFY_USER_REQUEST',
  VERIFY_USER_SUCCESS = 'user/VERIFY_USER_SUCCESS'
}

export type UserState = {
  cards: null
  isLoading: boolean
  nextOfKin: null | INextOfKin
  requestStatus: RequestStatus
  searchedUsers: RiseUser[]
  settings: ISettings
  stats: UserStats
  timeStamp: number
  token: string | null
  user: null | RiseUser
  userId: null | number
}

export interface DispatchAuthAction
  extends Dispatch<
    {
      type: USER_ACTION_TYPES
    } & Partial<UserState>
  > {}

export type User = {
  businessName?: string
  dob: string | Date
  email: string
  firstName: string
  lastName: string
  password: string
  phone: string
  referralCode?: string
}

export type UserStats = {
  totalDeposited: number
  totalPaidOut: number
  totalReturns: number
}

/** ------------------------- User Actions Types -------------------------  */
export type SignupRequest = {
  type: USER_ACTION_TYPES.SIGN_UP_REQUEST
  userData: User
}

export type LoginRequest = {
  email: string
  password: string
  type: USER_ACTION_TYPES.LOGIN_REQUEST
}

export type SetUserToken = {
  token: any
  type: USER_ACTION_TYPES.SET_AUTH_TOKEN
}

export type ClearUserToken = {
  type: USER_ACTION_TYPES.CLEAR_TOKEN
}

export type SetUserIdSuccess = {
  type: USER_ACTION_TYPES.SET_USER_ID
  userId: number
}

export type EditUserSuccess = {
  type: USER_ACTION_TYPES.EDIT_USER_SUCCESS
  userData: RiseUser
}

export type changeUserEmailSuccess = {
  email: string
  type: USER_ACTION_TYPES.CHANGE_EMAIL_SUCCESS
}

export type FetchUserSuccess = {
  type: USER_ACTION_TYPES.FETCH_USER_SUCCESS
  userData: RiseUser
}

export type setUserImage = {
  type: USER_ACTION_TYPES.UPLOAD_USER_IMAGE_SUCCESS
  url: any
}

export type setNextOfKin = {
  nextOfKin: INextOfKin
  type: USER_ACTION_TYPES.SET_NEXT_OF_KIN_SUCCESS
}

export type VerifyUserSuccess = {
  type: USER_ACTION_TYPES.VERIFY_USER_SUCCESS
  verifyType: string
}

export type SetLastSeen = {
  timeStamp: number
  type: USER_ACTION_TYPES.SET_LAST_SEEN
}
export type EnterReferralCodSuccess = {
  referralId: number
  type: USER_ACTION_TYPES.ENTER_REFERRAL_CODE_SUCCESS
}

export type UpdateMoreInfoSuccess = {
  type: USER_ACTION_TYPES.UPDATE_MORE_INFO_SUCCESS
  userData: RiseUser
}
export type MakeUserAffiliateSuccess = {
  isApproved: boolean
  type: USER_ACTION_TYPES.MAKE_USER_AFFILIATE_SUCCESS
}
export type GetUserStatsSuccess = {
  stats: UserStats
  type: USER_ACTION_TYPES.GET_USER_STAT_SUCCESS
}

export type LoginActionSuccess = {
  type: USER_ACTION_TYPES.LOGIN_SUCCESS
}

export type LoginActionError = {
  type: USER_ACTION_TYPES.LOGIN_ERROR
}

export type UnmatchedAction = {
  type: 'UNMATCHED_ACTION'
}

export type GetSettingsSuccess = {
  settings: ISettings
  type: USER_ACTION_TYPES.GET_SETTINGS_SUCCESS
}

export type UserActions =
  | SignupRequest
  | LoginRequest
  | SetUserToken
  | ClearUserToken
  | SetUserIdSuccess
  | EditUserSuccess
  | changeUserEmailSuccess
  | VerifyUserSuccess
  | setNextOfKin
  | SetLastSeen
  | EnterReferralCodSuccess
  | UpdateMoreInfoSuccess
  | MakeUserAffiliateSuccess
  | LoginActionSuccess
  | LoginActionError
  | UnmatchedAction
  | FetchUserSuccess
  | setUserImage
  | GetUserStatsSuccess
  | GetSettingsSuccess
