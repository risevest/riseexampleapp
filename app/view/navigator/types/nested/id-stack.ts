import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
  CountryCode,
  IdentityCode,
  IdentityType
} from 'app/domains/verification'
import { RisePhotoAsset } from 'app/utils/camera'
import { Flatten } from 'app/utils/utilTypes'

import { RootStackParamsList } from '../root-stack'
import { MessageParams } from '../types'

export type IDNavigationOptions = {
  country: CountryCode
  identifier: string
  identityType: IdentityCode
  preset: 'document' | 'selfie'
} & ManualVerification

export type SmileIDNavigationOptions = Flatten<
  {
    identity: IdentityType
    jobType: number
    smileIdType: string
  } & IDNavigationOptions
>

interface ManualVerification {
  manualVerification?: boolean
}

export type IDStackParamsList = {
  CameraScreen: IDNavigationOptions
  FormsOfID: {
    country: string
    countryCode: string
  }
  IDNumber: IdentityType
  IDReview: INavigationProps
  IDVerification?: { fromSetupGuide?: boolean }
  ImagePreview: IDNavigationOptions & {
    idImage: RisePhotoAsset
    selfie?: RisePhotoAsset
  }
  MessageScreen: MessageParams
  NINSlip: IdentityType
  ReSubmitFailedId: undefined
  SelectCountry: undefined
  SelfieIntro: IDNavigationOptions & {
    idImage: void | RisePhotoAsset
    selfie: void | RisePhotoAsset
  }
  SmileIDCaptureScreen: SmileIDNavigationOptions
}

export type IDStackScreenName = keyof IDStackParamsList

export type IDStackScreenProps<Screen extends keyof IDStackParamsList> =
  CompositeScreenProps<
    NativeStackScreenProps<IDStackParamsList, Screen>,
    NativeStackScreenProps<RootStackParamsList>
  >
