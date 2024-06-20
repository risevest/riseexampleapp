import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamsList } from './root-stack'

export interface ExternalLinksParams {
  canShare?: boolean
  id?: string
  prevScreen: string
  title?: string
  type?: string
  uri: string
}

export interface VerifyPhoneNumberParams {
  email: string
  firstName: string
  phone: string
}

export interface MoreInformationFields {
  dob: string | Date
  email: string
  firstName: string
  lastName: string
  subscribeToNewsletter: boolean
}

export type AuthStackParamsList = {
  ConfirmPIN: undefined
  CreatePIN: undefined
  EnterPhoneNumber: undefined
  ExternalLinks: ExternalLinksParams
  Info: {
    firstName: string
  }
  InitialRoute: undefined
  IntroScreens: undefined
  Login: undefined

  MoreInformation: undefined
  PINSuccessScreen: undefined
  PinLogin: undefined
  ReviewDetails: undefined
  SetupPassword: undefined
  // MoreInformation: undefined
  Signup: undefined
  SuccessScreen: { name: string }
  VerifyPhoneNumber: undefined
  VerifyPhoneNumber2: VerifyPhoneNumberParams
}

export type AuthStackScreenProps<Screen extends keyof AuthStackParamsList> =
  CompositeScreenProps<
    NativeStackScreenProps<AuthStackParamsList, Screen>,
    NativeStackScreenProps<RootStackParamsList>
  >
