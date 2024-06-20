import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamsList } from './root-stack'
import { PlanDetailsParams } from './types'

export type DashboardStackParamsList = {
  Dashboard: undefined
  PlanDetails: PlanDetailsParams
}

export type DashboardStackScreenProps<
  Screen extends keyof DashboardStackParamsList
> = CompositeScreenProps<
  NativeStackScreenProps<DashboardStackParamsList, Screen>,
  NativeStackScreenProps<RootStackParamsList>
>
