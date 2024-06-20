import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RisePhotoAsset } from 'app/utils/camera'

import { RootStackParamsList } from './root-stack'
import { MessageParams, OnDoneFn } from './types'

export type BVNStackParamsList = {
  EnterBVN: undefined | OnDoneFn
  MessageScreen: MessageParams & OnDoneFn
  PreviewSelfie: {
    bvn: string
    imageObject: void | RisePhotoAsset
  } & OnDoneFn
  UploadSelfie: {
    bvn: string
  } & OnDoneFn
}

export type BVNStackScreenProps<Screen extends keyof BVNStackParamsList> =
  CompositeScreenProps<
    NativeStackScreenProps<BVNStackParamsList, Screen>,
    NativeStackScreenProps<RootStackParamsList>
  >
