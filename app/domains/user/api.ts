import instance from 'app/api/v2/base'
import v1Instance from 'app/utils/axios'

import {
  ServerOTPVerification,
  VerifyPhoneNumberOTPPayload
} from '../verification/types'
import { EditUserPayload, SocialSurveyPayloadServer } from './types'

export async function editUser({ userId, ...data }: EditUserPayload) {
  const resp = await v1Instance.put(`/users/${userId}`, data)
  return resp.data
}

export async function changePhoneNumber({
  phone,
  country
}: VerifyPhoneNumberOTPPayload): Promise<ServerOTPVerification> {
  const resp = await instance.patch('/identities', {
    country: String(country).toLowerCase(),
    identifier: phone,
    identity_type: 'phone_number'
  })
  return resp?.data
}

export async function addSocialSurvey(data: SocialSurveyPayloadServer) {
  return instance.post('users/survey', data)
}

export async function getAffiliateDetails(offset = 0) {
  return instance
    .get('/users/referral/affiliate/details', { params: { offset } })
    .then((res) => {
      return res.data
    })
}
