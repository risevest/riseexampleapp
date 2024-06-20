import { RisePhotoAsset } from 'app/utils/camera'
import { TakePictureResponse } from 'react-native-camera'

export interface RiseCameraAsset extends TakePictureResponse {
  name?: string
}

export interface CreateIdentityServer {
  country: string
  id_image?: BaseAsset
  identifier: string
  identity_type: IdentityCode
  selfie: BaseAsset
}

export interface CreateManualIdentityServer {
  country: string
  id_image?: BaseAsset
  identifier: string
  identity_type: IdentityCode
}

export interface NewManualIdentity {
  country: string
  idImage?: RisePhotoAsset
  identifier: string
  identityType: IdentityCode
}

export interface NewIdentity {
  country: string
  idImage?: RisePhotoAsset
  identifier: string
  selfie: RisePhotoAsset
}

export interface BaseAsset {
  name: string
  type: string | null
  uri: string
}

export type IdentityCode =
  | 'bvn'
  | 'national_id'
  | 'passport'
  | 'phone_number'
  | 'ssnit'
  | 'driver_license'
  | 'voter_id'
  | 'ID'

export type CountryCode = 'ng' | 'gh' | 'ke' | 'ug'

export interface IdentityType {
  code: IdentityCode
  country: string
  countryCode: CountryCode
  isIdentityCard: boolean
  name: string
  provider: string
  smileidIdType: string
  smileidJobId: number
}

export interface IdentityTypeServer {
  code: IdentityCode
  country: CountryCode
  country_name: string
  is_identity_card: boolean
  name: string
  provider: string
  requires_ocr: boolean
  smileid_id_type: string
  smileid_job_id: number
}

export interface OTPVerificationPayload {
  email: string
  phone: string
}

export interface VerifyPhoneNumberOTPPayload {
  country: string
  phone: string
}

export interface ServerOTPVerification {
  created_at: string
  id: string
  identifier: string
  identity_type: string
  owner_id: string
  token: string
  updated_at: string
  verification_metadata: {
    provider: string
    provider_reference: string
  }
  verification_status: string
}

export interface ServerVerifyPhoneNumber {
  reference: string
  token: string
}

export interface ReverifyIdentityServer {
  should_reverify: boolean
}

export interface ReverifyIdentity {
  shouldReverify: boolean
}

export interface VerifyEmailOTPPayload {
  email: string
  path?: string
  token: string
}

export interface VerifyUserPayload {
  email?: string
  path?: string
  phone?: string
  token: string
}

export interface VerificationIntiationServer {
  country: string
  created_at: string
  id: string
  identifier: string
  identity_type: string
  owner_id: string
  updated_at: string
  verification_status: string
}

export interface VerificationStatusServer extends VerificationIntiationServer {
  verifcationMetaData?: {
    date_of_birth: string
    face_match_status: boolean
    full_name: string
    name_match: boolean
    provider: string
    result_text: string
    selfie_url: string
  }
}
