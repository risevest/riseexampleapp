import { NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import {
  AssetClassStackParamsList,
  ForgotPasswordParamsList,
  GoalClassStackParamsList
} from '.'
import { AppStackParamsList } from './app-stack'
import { BuildWealthParamsList } from './build-wealth-stack'
import { BVNStackParamsList } from './bvn-stack'
import { PinStackParamsList } from './pin-stack'
import { PlanDetailsParams } from './types'

export type RootStackParamsList = {
  AcceptDeclineStack: {
    planId: number
  }
  App: NavigatorScreenParams<AppStackParamsList>
  AssetClassStack: NavigatorScreenParams<AssetClassStackParamsList>
  BVNStack?: NavigatorScreenParams<BVNStackParamsList>
  BuildWealth: NavigatorScreenParams<BuildWealthParamsList> | undefined
  CreatePin: NavigatorScreenParams<PinStackParamsList>
  CreatePlan: undefined
  GoalClass?: NavigatorScreenParams<GoalClassStackParamsList>
  PlanDetails: PlanDetailsParams
  ResetPassword?: NavigatorScreenParams<ForgotPasswordParamsList>
  ResetPin: undefined
  Splash: undefined
  ViewAll: {
    isAssetClass: boolean
    plans: IAssetClass[] | GoalPlanData[]
    risePortfolio: IRisePortfolioData
    title: string
  }
}

export type RootStackScreenProps<T extends keyof RootStackParamsList> =
  NativeStackScreenProps<RootStackParamsList, T>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamsList {}
  }
}
