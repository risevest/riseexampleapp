import instance from 'app/api/v2/base'

import v1Instance from '../../utils/axios'
import {
  CreateIdentityServer,
  CreateManualIdentityServer,
  IdentityType,
  IdentityTypeServer,
  ReverifyIdentityServer,
  ServerOTPVerification,
  ServerVerifyPhoneNumber,
  VerificationIntiationServer,
  VerificationStatusServer,
  VerifyEmailOTPPayload,
  VerifyPhoneNumberOTPPayload,
  VerifyUserPayload
} from './types'

export function createIdentity(payload: CreateIdentityServer) {
  const forms = new FormData()

  for (const key in payload) {
    forms.append(key, payload[key as keyof CreateIdentityServer] as any)
  }

  return instance.post('/identities', forms)
}

export async function createIdentityManually(
  payload: CreateManualIdentityServer
) {
  const forms = new FormData()

  for (const key in payload) {
    forms.append(key, payload[key as keyof CreateManualIdentityServer] as any)
  }

  return instance.post('/identities/manual', forms)
}

export async function getIdentityTypes(): Promise<IdentityTypeServer[]> {
  const resp = await instance.get('/config', {
    params: {
      entity: 'identity_type'
    }
  })

  return resp.data
}

export const generateOTP = (
  email: string,
  phone: string,
  path: string = 'verify-email'
) => {
  return v1Instance.get(`/auth/${path}`, {
    params: {
      email,
      phone
    }
  })
}

export async function verifyPhoneNumberOTP({
  phone,
  country
}: VerifyPhoneNumberOTPPayload): Promise<ServerOTPVerification> {
  const resp = await instance.post('/identities', {
    country: String(country).toLowerCase(),
    identifier: phone,
    identity_type: 'phone_number'
  })
  return resp?.data
}

export async function verifyPhoneNumber(payload: ServerVerifyPhoneNumber) {
  return instance.post('/identities/verify', {
    identity_type: 'phone_number',
    ...payload
  })
}

export async function reverifyIdentityCheck(
  identityType: string
): Promise<ReverifyIdentityServer> {
  const resp = await instance.get(`identities/${identityType}/reverify`)
  return resp?.data
}

export function resetIdentity(
  identityType: string
): Promise<ReverifyIdentityServer> {
  return instance.patch('identities/reset', { identity_type: identityType })
}

export const verifyEmailOTP = ({
  email,
  token,
  path = 'verify'
}: VerifyEmailOTPPayload) => {
  return v1Instance.patch(`/auth/${path}/${token}`, { email })
}

export const verifyUser = ({
  token,
  email,
  path = 'verify',
  phone
}: VerifyUserPayload) => {
  return instance.patch(`/auth/${path}/${token}`, {
    email,
    phone
  })
}

export const intitateVerification = async ({
  identityType,
  identifier
}: {
  identifier: string
  identityType: IdentityType
}): Promise<VerificationIntiationServer> => {
  const resp = await instance.post('/identities/initiate', {
    country: identityType.countryCode,
    identifier,
    identity_type: identityType.code
  })

  return resp?.data
}

export async function getRecentlySubmittedIdentity(
  category: 'phone-number' | 'id-card'
): Promise<VerificationStatusServer> {
  const resp = await instance.get('/identities/recent', {
    params: {
      category
    }
  })
  return resp?.data
}
