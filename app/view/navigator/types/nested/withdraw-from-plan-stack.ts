import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamsList } from '../root-stack'

export type WithdrawFromPlanStackParamsList = {
  ConfirmPlanToWalletAmount: {
    amount: string
    hasMatured: boolean
    planId: number
    planType: string
  }
  WithdrawFromPlan: { hasMatured: boolean; plan: IPlan }
}

export type WithdrawFromPlanStackScreenName =
  keyof WithdrawFromPlanStackParamsList

export type WithdrawFromPlanStackScreenProps<
  Screen extends keyof WithdrawFromPlanStackParamsList
> = CompositeScreenProps<
  NativeStackScreenProps<WithdrawFromPlanStackParamsList, Screen>,
  NativeStackScreenProps<RootStackParamsList>
>
