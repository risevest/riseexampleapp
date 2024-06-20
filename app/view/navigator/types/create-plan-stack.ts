import {
  CompositeScreenProps,
  NavigatorScreenParams
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { PayDayStackParamsList } from './nested/pay-day-stack'
import { RootStackParamsList } from './root-stack'

export type CreatePlanStackParamsList = {
  CreatePlan: undefined
  PaydayStack: NavigatorScreenParams<PayDayStackParamsList>
  Plans: undefined
}

export type CreatePlanStackScreenProps<
  Screen extends keyof CreatePlanStackParamsList
> = CompositeScreenProps<
  NativeStackScreenProps<CreatePlanStackParamsList, Screen>,
  NativeStackScreenProps<RootStackParamsList>
>
