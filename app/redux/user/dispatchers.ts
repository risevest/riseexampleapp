import { toastMethods } from 'app/components/toast'

import { setItemToStorage } from '../../utils/asyncstorage'
import instance from '../../utils/axios'
import { setError } from '../error/actionCreators'
import { TRANSACTION_ACTION_TYPES } from '../transaction/types'
import {
  changeUserEmailAction,
  clearReduxStore,
  clearToken,
  editUserAction,
  enterReferralCodeSuccess,
  fetchUserSuccess,
  getNextOfKinAction,
  getUserStatsSuccess,
  handleRequestTypeActionCreators,
  makeUserAffiliateSuccess,
  resetLoginState,
  setLastSeen,
  setToken,
  setUserId,
  updateMoreInfoAction
} from './actionCreators'
import { USER_ACTION_TYPES as actionTypes } from './types'

type SignupData = {
  email: string
  password: string
}

export const resetAppStateDispatcher = () => {
  return (dispatch: any) => {
    dispatch(resetLoginState())
    dispatch({ type: TRANSACTION_ACTION_TYPES.RESET_TRANSACTION_STATE })
  }
}

export const setTokenToStore = (token: any) => {
  return (dispatch: any) => {
    dispatch(setToken(token))
  }
}

export const setLastSeenDispatcher = (timeStamp: number) => {
  return (dispatch: any) => {
    dispatch(setLastSeen(timeStamp))
  }
}

export const loginActionDispatcher = (userData: {
  email: string
  password: string
}) => {
  return (dispatch: any) => {
    dispatch(handleRequestTypeActionCreators(actionTypes.LOGIN_REQUEST))
    return instance
      .post('/auth/login', userData, {
        timeout: 30000
      })
      .then(async (response) => {
        await setItemToStorage('sessionToken', response.data.token)
        await setItemToStorage('country', response.data.country)
        dispatch(setUserId(response.data.id))
        dispatch(handleRequestTypeActionCreators(actionTypes.LOGIN_SUCCESS))
        return {
          data: response.data
        }
      })
      .catch((error) => {
        dispatch(handleRequestTypeActionCreators(actionTypes.LOGIN_ERROR))
        dispatch(setError('Login Error', error))
      })
  }
}

export const signupDispatcher = (userData: SignupData) => {
  return (dispatch: any) => {
    dispatch(handleRequestTypeActionCreators(actionTypes.SIGN_UP_REQUEST))
    return instance
      .post('/users', userData)
      .then(async (response) => {
        if (response?.status === 200) {
          await setItemToStorage('sessionToken', response.data.token)
          await setItemToStorage('country', response.data.country)
          await setItemToStorage('userId', `${response.data.id}`)
          dispatch(setUserId(response.data.id))
          dispatch(handleRequestTypeActionCreators(actionTypes.SIGN_UP_SUCCESS))
          return {
            data: response.data,
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(handleRequestTypeActionCreators(actionTypes.SIGN_UP_ERROR))
        dispatch(setError('Signup Error', error))
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const editUserDispatcher = (data: any, userId: number) => {
  return (dispatch: any) => {
    dispatch(handleRequestTypeActionCreators(actionTypes.EDIT_USER_REQUEST))
    return instance
      .put(`/users/${userId}`, data, {
        params: { include: 'account.profile_setting' }
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(editUserAction(response?.data?.data))
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(handleRequestTypeActionCreators(actionTypes.EDIT_USER_ERROR))
        dispatch(setError('Edit Error', error))
        if (data.pin) {
        } else if (data.phone) {
        }
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const changeUserEmailDispatcher = (
  data: { email: string },
  userId: number
) => {
  return (dispatch: any) => {
    dispatch(handleRequestTypeActionCreators(actionTypes.CHANGE_EMAIL_REQUEST))
    return instance
      .post(`/users/${userId}/change-email`, data)
      .then((response) => {
        if (response.status === 200) {
          dispatch(changeUserEmailAction(data.email))
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(
          handleRequestTypeActionCreators(actionTypes.CHANGE_EMAIL_ERROR)
        )
        dispatch(setError('Edit Error', error))
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const verifyUser = (type: string, token: string, body: any) => {
  return (dispatch: any) => {
    dispatch(handleRequestTypeActionCreators(actionTypes.VERIFY_USER_REQUEST))
    return instance
      .patch(`/auth/${type}/${token}`, body)
      .then(async (response) => {
        dispatch({ type: actionTypes.VERIFY_USER_SUCCESS, verifyType: type })
        await setItemToStorage('sessionToken', response.data.token)
        await setItemToStorage('country', response.data.country)
        if (type === 'verify') {
        } else {
        }
        return {
          name: response.data.name,
          requestStatus: 'success'
        }
      })
      .catch((error) => {
        dispatch(handleRequestTypeActionCreators(actionTypes.VERIFY_USER_ERROR))
        dispatch(setError('Verify Error', error))
        if (type === 'verify') {
        }
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const generateOTP = (
  email: string,
  phone: string,
  path: string = 'verify-email'
) => {
  return (dispatch: any) => {
    dispatch(handleRequestTypeActionCreators(actionTypes.GENERATE_OTP_REQUEST))
    return instance
      .get(`/auth/${path}?email=${email}&phone=${phone}`)
      .then((response) => {
        if (response.status === 200) {
          toastMethods.show({
            props: {
              contentProps: {
                description: 'Verification code sent to your email',
                title: 'Verify Email'
              }
            },
            type: 'alert'
          })
          dispatch(
            handleRequestTypeActionCreators(actionTypes.GENERATE_OTP_SUCCESS)
          )
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(setError('Verify Error', error))
        dispatch(
          handleRequestTypeActionCreators(actionTypes.GENERATE_OTP_ERROR)
        )
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const generatePhoneOTPDispatcher = (phone: string) => {
  return (dispatch: any) => {
    dispatch({ type: actionTypes.GENERATE_OTP_REQUEST })
    return instance
      .get(`/auth/verify-phone?phone=${phone}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: actionTypes.GENERATE_OTP_SUCCESS })
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(setError('Verify Error', error))
        dispatch({ type: actionTypes.GENERATE_OTP_ERROR })
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const resetPasswordDispatcher = (body: any) => {
  return (dispatch: any) => {
    dispatch(
      handleRequestTypeActionCreators(actionTypes.RESET_USER_PASSWORD_REQUEST)
    )
    return instance
      .patch('/auth/reset-password', body)
      .then((response) => {
        dispatch(
          handleRequestTypeActionCreators(
            actionTypes.RESET_USER_PASSWORD_SUCCESS
          )
        )
        dispatch(fetchUserSuccess(response.data.data))
      })
      .catch((error) => {
        dispatch(
          handleRequestTypeActionCreators(actionTypes.RESET_USER_PASSWORD_ERROR)
        )
        dispatch(setError('Password reset error', error))
      })
  }
}

export const verifyPasswordDispatcher = (userId: number, body: any) => {
  return (dispatch: any) => {
    dispatch(
      handleRequestTypeActionCreators(actionTypes.VERIFY_USER_PASSWORD_REQUEST)
    )
    return instance
      .post(`/users/${userId}/verify-password`, body)
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            handleRequestTypeActionCreators(
              actionTypes.VERIFY_USER_PASSWORD_SUCCESS
            )
          )
          toastMethods.show({
            props: {
              contentProps: {
                description: 'Successfully verified your password',
                title: 'Password verified'
              }
            },
            type: 'alert'
          })

          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(setError('Verification error', error))
        dispatch(
          handleRequestTypeActionCreators(
            actionTypes.VERIFY_USER_PASSWORD_ERROR
          )
        )
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const logoutUser = () => {
  return (dispatch: any) => {
    dispatch(clearToken())
    dispatch(clearReduxStore())
  }
}

export const uploadUserImageDispatcher = (userId: number, data: any) => {
  return (dispatch: any) => {
    dispatch(
      handleRequestTypeActionCreators(actionTypes.UPLOAD_USER_IMAGE_REQUEST)
    )
    return instance
      .post(`/users/${userId}/image`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.UPLOAD_USER_IMAGE_SUCCESS,
            url: response.data.url
          })
          toastMethods.show({
            props: {
              contentProps: {
                description: 'Successfully uploaded a Profile Image',
                title: 'Upload Successful'
              }
            },
            type: 'alert'
          })
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(setError('Profile Image Upload Error', error))
        dispatch({ type: actionTypes.UPLOAD_USER_IMAGE_ERROR })
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const getNextOfKinDispatcher = () => {
  return (dispatch: any) => {
    dispatch(
      handleRequestTypeActionCreators(actionTypes.GET_NEXT_OF_KIN_REQUEST)
    )
    return instance
      .get('/next-of-kins')
      .then((response) => {
        if (response.status === 200) {
          dispatch(getNextOfKinAction(response?.data?.data))
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(
          handleRequestTypeActionCreators(actionTypes.GET_NEXT_OF_KIN_ERROR)
        )
        dispatch(setError('Fetch Error', error))
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const addNextOfKinDispatcher = (data: INextOfKin) => {
  return (dispatch: any) => {
    dispatch(
      handleRequestTypeActionCreators(actionTypes.SET_NEXT_OF_KIN_REQUEST)
    )
    return instance
      .post('/next-of-kins', data)
      .then((response) => {
        if (response.status === 200) {
          dispatch(getNextOfKinDispatcher())
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(
          handleRequestTypeActionCreators(actionTypes.SET_NEXT_OF_KIN_ERROR)
        )
        dispatch(setError('Creation Error', error))
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const updateNextOfKinDispatcher = (
  nextOfKinId: number,
  data: Omit<INextOfKin, 'bankId'>
) => {
  return (dispatch: any) => {
    dispatch(
      handleRequestTypeActionCreators(actionTypes.SET_NEXT_OF_KIN_REQUEST)
    )
    return instance
      .put(`/next-of-kins/${nextOfKinId}`, data)
      .then((response) => {
        if (response.status === 200) {
          dispatch(getNextOfKinDispatcher())
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(
          handleRequestTypeActionCreators(actionTypes.SET_NEXT_OF_KIN_ERROR)
        )
        dispatch(setError('Updating Error', error))
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const enterReferralCodeDispatcher = (referralCode: string) => {
  return (dispatch: any) => {
    dispatch(
      handleRequestTypeActionCreators(actionTypes.ENTER_REFERRAL_CODE_REQUEST)
    )
    return instance
      .put('/users/refer-users/referral', { referralCode })
      .then((response) => {
        dispatch(enterReferralCodeSuccess(response.data.referralId))
        return {
          requestStatus: 'success'
        }
      })
      .catch((error) => {
        dispatch(setError('Referral Code Error', error))
        dispatch(
          handleRequestTypeActionCreators(actionTypes.ENTER_REFERRAL_CODE_ERROR)
        )
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const makeUserAffiliateDispatcher = () => {
  return (dispatch: any) => {
    dispatch(
      handleRequestTypeActionCreators(actionTypes.MAKE_USER_AFFILIATE_REQUEST)
    )
    return instance
      .post('/auth/affiliate/register')
      .then((response) => {
        if (response.status === 200) {
          dispatch(makeUserAffiliateSuccess(response.data.isApproved))
          if (response.data.isApproved) {
            toastMethods.show({
              props: {
                contentProps: {
                  description: response.data.message,
                  title: 'Affiliate Success'
                }
              },
              type: 'alert'
            })
          }

          return {
            isApproved: response.data.isApproved
          }
        }
      })
      .catch((error) => {
        dispatch(setError('Referral Error', error))
        dispatch(
          handleRequestTypeActionCreators(actionTypes.MAKE_USER_AFFILIATE_ERROR)
        )
      })
  }
}

export const addDevice = (data: any) => {
  return instance.post('/devices', data)
}

export const updateMoreInfoDispatcher = (userId: number, data: any) => {
  return (dispatch: any) => {
    dispatch(
      handleRequestTypeActionCreators(actionTypes.UPDATE_MORE_INFO_REQUEST)
    )
    return instance
      .post(`users/${userId}/profile-settings`, data)
      .then((response) => {
        if (response.status === 200) {
          dispatch(updateMoreInfoAction(response?.data?.data))
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(
          handleRequestTypeActionCreators(actionTypes.UPDATE_MORE_INFO_ERROR)
        )
        dispatch(setError('Edit Error', error))
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const getUserStatsDispatcher = () => {
  return (dispatch: any) => {
    dispatch(handleRequestTypeActionCreators(actionTypes.GET_USER_STAT_REQUEST))
    return instance
      .get('/auth/stats')
      .then((response) => {
        if (response.status === 200) {
          dispatch(getUserStatsSuccess(response.data.data))
        }
      })
      .catch((error) => {
        dispatch(
          handleRequestTypeActionCreators(actionTypes.GET_USER_STAT_ERROR)
        )
        dispatch(setError('Fetch User error', error))
      })
  }
}

export const requestStatementDispacther = (userId: number, query: string) => {
  return (dispatch: any) => {
    dispatch(handleRequestTypeActionCreators(actionTypes.STATEMENT_REQUEST))
    return instance
      .get(`/users/${userId}/get-statement?${query}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            handleRequestTypeActionCreators(actionTypes.STATEMENT_SUCCESS)
          )
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(setError('Statement Request Error', error))
        dispatch(handleRequestTypeActionCreators(actionTypes.STATEMENT_ERROR))
      })
  }
}
