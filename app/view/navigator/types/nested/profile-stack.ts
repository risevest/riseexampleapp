import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamsList } from '../root-stack'
import { MessageParams } from '../types'

export type ProfileStackParamsList = {
  ChangeEmail: undefined
  ChangePhone: {
    phone: string
    phoneCountryCode: string
  }
  ConfirmWithPassword: { itemUpdated: string; nextScreen: 'ChangePhone' }
  CreateUsername: undefined
  EnterPhoneNumber: undefined
  MessageScreen: MessageParams
  MoreInformation: { moreInformation: Record<string, string> }
  NextOfKin: undefined
  OpenEmailApp: undefined
  PreviewProfile: { imageObject: any; userId?: number }
  Profile: undefined
  Success: { itemUpdated: string }
  SuccessfulUsername: undefined
  VerifyEmail: { email: string }
  VerifyPhone: {
    country: string
    phone: string
    reference: string
  }
  VerifyPhoneNumber: {
    country: string
    isVerification?: boolean
    phone: string
    phoneCountryCode: string | undefined
    reference: string
  }
  ViewEmail: undefined
  ViewPhone: undefined
}

export type ProfileStackScreenName = keyof ProfileStackParamsList

export type ProfileStackScreenProps<
  Screen extends keyof ProfileStackParamsList
> = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamsList, Screen>,
  NativeStackScreenProps<RootStackParamsList>
>
