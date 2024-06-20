import { USE_USER_CONFIG, useDisplayMessage } from 'app/hooks'
import { setUserId } from 'app/redux/user/actionCreators'
import { DispatchAuthAction } from 'app/redux/user/types'
import { queryClient } from 'app/rq'
import { logEvent } from 'app/utils/analytics'
import amplitude from 'app/utils/analytics/amplitude'
import appsFlyer from 'app/utils/analytics/appsFlyer'
import CustomerIO from 'app/utils/analytics/customer-io'
import { logEvent as fbLogEvent } from 'app/utils/analytics/fbsdk'
import firebaseUtils from 'app/utils/analytics/firebaseUtils'
import { setItemToStorage } from 'app/utils/asyncstorage'
import { convertKeysToSnakeCase } from 'app/utils/utilFunctions'
import { useMutation } from 'react-query'
import { useDispatch } from 'react-redux'

import { VerifyPhoneNumberOTPPayload } from '../verification'
import {
  checkPhoneNumberVerification,
  generateOTP,
  registerPhoneNumber,
  resetPassword,
  signUp,
  validateSignUp,
  verifyPassword,
  verifyPhoneNumber,
  verifyUser
} from './api'
import { AUTH_MUTATION_KEYS } from './constants'
import { SignUpPayload, ValidateSignUpPayload } from './types'

export function useGenerateOtpMutation() {
  const { displaySuccess } = useDisplayMessage()

  return useMutation({
    mutationFn: generateOTP,
    mutationKey: AUTH_MUTATION_KEYS.generateOTP,
    onSuccess: () => {
      displaySuccess('Verify Email', 'Verification code sent to your email')
    }
  })
}

export function useVerifyUserMutation() {
  return useMutation({
    mutationFn: verifyUser,
    mutationKey: AUTH_MUTATION_KEYS.verifyUser,
    onSuccess: async (response) => {
      await setItemToStorage('sessionToken', response.token)
      await setItemToStorage('country', response.country)
    }
  })
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: resetPassword,
    mutationKey: AUTH_MUTATION_KEYS.resetPassword
  })
}

export function useVerifyPasswordMutation() {
  const { displaySuccess, displayError } = useDisplayMessage()
  return useMutation({
    mutationFn: verifyPassword,
    onError: () => {
      displayError('Verification Error', 'Error verifying this request')
      firebaseUtils.logEvent('change_pin', { status: 'failed' })
    },
    onSuccess: () => {
      displaySuccess('Password verified', 'Successfully verified your password')
      firebaseUtils.logEvent('change_pin', { status: 'success' })
    }
  })
}

interface Session {
  country: string
  hasCompletedSignup: boolean
  id: number
  token: string
  uuid: string
}

async function handleLogin(
  session: Pick<Session, 'token' | 'id'>,
  dispatch: DispatchAuthAction
) {
  await setItemToStorage('sessionToken', session.token)
  dispatch(setUserId(session.id))
}

export function useRegisterPhoneNumber() {
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: (payload: VerifyPhoneNumberOTPPayload) =>
      registerPhoneNumber(payload),
    mutationKey: AUTH_MUTATION_KEYS.registerPhoneNumber,
    onError: (error) => {
      displayServerError(error)
    }
  })
}

export function useCheckPhoneNumberVerification() {
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: (payload: string) => checkPhoneNumberVerification(payload),
    mutationKey: AUTH_MUTATION_KEYS.checkPhoneNumberVerification,
    onError: (error) => {
      displayServerError(error)
    }
  })
}

export function useSignUp() {
  const { displayServerError } = useDisplayMessage()
  const dispatch = useDispatch()

  return useMutation({
    mutationFn: (payload: SignUpPayload) =>
      signUp(convertKeysToSnakeCase(payload)),
    mutationKey: AUTH_MUTATION_KEYS.signUp,
    onError: (error) => {
      displayServerError(error)
    },
    onSuccess: (session) => {
      logEvent('signup', { user_id: session?.uuid })
      appsFlyer.setUserId(session?.uuid)
      appsFlyer.logEvent('sign_up', {})
      fbLogEvent('sign_up')
      handleLogin(session, dispatch)
      CustomerIO.identifyUser(session?.uuid, session?.email)
      amplitude.setUserId(session?.uuid)
    }
  })
}

export function useValidateSignUp() {
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: (payload: ValidateSignUpPayload) =>
      validateSignUp(convertKeysToSnakeCase(payload)),
    mutationKey: AUTH_MUTATION_KEYS.validateSignUp,
    onError: (error) => {
      displayServerError(error)
    }
  })
}

export function usePhoneNumberVerification() {
  const { displayServerError } = useDisplayMessage()
  return useMutation({
    mutationFn: verifyPhoneNumber,
    mutationKey: AUTH_MUTATION_KEYS.verifyPhoneNumber,
    onError: (error) => displayServerError(error),
    onSuccess: async () => {
      await queryClient.invalidateQueries(USE_USER_CONFIG.queryKey)
      logEvent('verify_phone_no')
    }
  })
}
