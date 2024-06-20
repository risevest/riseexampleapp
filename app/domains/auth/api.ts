import { NEW_API_BASE_URL } from '@env'
import instanceV2 from 'app/api/v2/base'
import instance from 'app/utils/axios'
import axios from 'axios'

import {
  ReverifyIdentityServer,
  VerifyPhoneNumberOTPPayload
} from '../verification'
import {
  RegisterPhoneNumberServer,
  ServerVerifyPhoneNumber,
  SignUp,
  SignUpPayloadServer,
  ValidateSignUpPayloadServer
} from './types'

export async function generateOTP({
  email,
  path = 'verify-email',
  phone
}: {
  email: string
  path?: string
  phone?: string
}) {
  const resp = await instance.get(`/auth/${path}`, {
    params: {
      email,
      phone
    }
  })
  return resp.data
}

export async function resetPassword(password: string) {
  const resp = await instance.patch('/auth/reset-password', { password })
  return await resp.data
}

export async function verifyUser({
  email,
  token,
  type
}: {
  email: string
  token: string
  type: string
}) {
  const resp = await instance.patch(`/auth/${type}/${token}`, { email })
  return resp.data
}

export async function verifyPassword({
  userID,
  password
}: {
  password: string
  userID: number
}) {
  const resp = await instance.post(`/users/${userID}/verify-password`, {
    password
  })

  return resp.data
}

export async function registerPhoneNumber({
  phone,
  country
}: VerifyPhoneNumberOTPPayload): Promise<RegisterPhoneNumberServer> {
  const resp = await instanceV2.get('identities/verification', {
    params: {
      country: country,
      identifier: phone,
      identity_type: 'phone_number'
    }
  })
  return resp?.data
}

export async function checkPhoneNumberVerification(
  phoneNumber: string
): Promise<ReverifyIdentityServer> {
  const resp = await instanceV2.get(
    `identities/phone_number/${phoneNumber}/reverify`
  )
  return resp?.data
}

export async function signUp(data: SignUpPayloadServer): Promise<SignUp> {
  const resp = await instanceV2.post('users/signup', data)
  return resp?.data
}

export async function validateSignUp(
  data: ValidateSignUpPayloadServer
): Promise<{ message: string }> {
  const resp = await instanceV2.post('users/signup/validate', data)
  return resp?.data
}

export async function verifyPhoneNumber(payload: ServerVerifyPhoneNumber) {
  const newInstance = axios.create({
    baseURL: NEW_API_BASE_URL,
    headers: { Authorization: 'Bearer ' + payload.authorizationToken },
    timeout: 60 * 1000
  })

  const resp = await newInstance.post('/identities/verify', {
    identity_type: 'phone_number',
    reference: payload.reference,
    token: payload.token
  })

  return resp?.data
}
