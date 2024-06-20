import { ConvertSnakeToCamelCase } from 'app/utils/utilTypes'

export interface SignUpPayloadServer {
  date_of_birth: string | Date
  email_address: string
  first_name: string
  last_name: string
  newsletter_subscribed: boolean
  password: string
  phone_number: string
  transaction_pin: string
}

export interface SignUpPayload {
  dateOfBirth: string | Date
  emailAddress: string
  firstName: string
  lastName: string
  newsletterSubscribed: boolean
  password: string
  phoneNumber: string
  transactionPin: string
}

export interface ValidateSignUpPayloadServer {
  identifier: string
  identity_type: 'email' | 'phone_number'
}
export interface ValidateSignUpPayload
  extends ConvertSnakeToCamelCase<ValidateSignUpPayloadServer> {}

export interface RegisterPhoneNumberServer {
  identity: {
    created_at: string
    id: string
    identifier: string
    identity_type: string
    owner_id: string
    updated_at: string
    verification_metadata: {
      provider: string
      provider_reference: string
    }
    verification_status: string
  }
  token: string
}

export interface SignUp {
  email: string
  id: number
  token: string
  uuid: string
}

export interface ServerVerifyPhoneNumber {
  authorizationToken: string
  reference: string
  token: string
}
