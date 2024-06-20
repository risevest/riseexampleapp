import {
  CompositeScreenProps,
  NavigatorScreenParams
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { CreatePlanStackParamsList } from './create-plan-stack'
import { RootStackParamsList } from './root-stack'
import { PlanDetailsParams } from './types'

export type PlansStackParamsList = {
  CreatePlan?: NavigatorScreenParams<CreatePlanStackParamsList>
  PlanDetails: PlanDetailsParams
}

export type PlansStackScreenProps<Screen extends keyof PlansStackParamsList> =
  CompositeScreenProps<
    NativeStackScreenProps<PlansStackParamsList, Screen>,
    NativeStackScreenProps<RootStackParamsList>
  >
