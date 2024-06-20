import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { AssetClassPlanType } from 'app/domains/plans'
import type { OtherPlanType } from 'app/view/App/Dashboard/sections/others-class-types'

import { RootStackParamsList } from '../root-stack'

export type GiftPlanStackParamsList = {
  FindUser: { assetData?: AssetClassPlanType } | undefined
  GiftPlan: OtherPlanType
  GiftPlanAddMoney: { payload: string }
  GiftPlanDuration: { payload: string }
  GiftPlanPin: { payload: string }
  GiftPlanSuccess: {
    planType: string
    recipientEmail: string
    recipientName: string
  }
  PersonalNote: {
    assetData?: AssetClassPlanType
    recipientEmail: string
    recipientId: number | null
    recipientName: string
    senderId: number
  }
  PickAssetClass: {
    name: string
    note: string
    recipientEmail: string
    recipientId: number | null
    recipientName: string
    senderId: number
  }
  VerificationNotice: undefined
}

export type GiftPlanStackScreenName = keyof GiftPlanStackParamsList

export type GiftPlanStackScreenProps<
  Screen extends keyof GiftPlanStackParamsList
> = CompositeScreenProps<
  NativeStackScreenProps<GiftPlanStackParamsList, Screen>,
  NativeStackScreenProps<RootStackParamsList>
>
