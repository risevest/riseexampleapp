import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import type {
  CompositeScreenProps,
  NavigatorScreenParams
} from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { DashboardStackParamsList } from './dashboard-stack'
import { FutureFeedStackParamsList } from './future-feed-stack'
import { FutureWalletStackParamsList } from './future-wallet-stack'
import { MoreStackParamsList } from './more-stack'
import { NestedStackStackParamsList } from './nested-stack'
import { PlansStackParamsList } from './plans-stack'

export type BottomTabParamsList = {
  Dashboard?: NavigatorScreenParams<DashboardStackParamsList>
  Feed?: NavigatorScreenParams<FutureFeedStackParamsList>
  FutureWalletStack?: NavigatorScreenParams<FutureWalletStackParamsList>
  MoreStack?: NavigatorScreenParams<MoreStackParamsList>
  PlansStack?: NavigatorScreenParams<PlansStackParamsList>
}

export type BottomTabProps<Screen extends keyof BottomTabParamsList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamsList, Screen>,
    NativeStackScreenProps<NestedStackStackParamsList>
  >
