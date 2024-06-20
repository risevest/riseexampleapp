import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamsList } from '../root-stack'

export type EditPlanStackParamsList = {
  EditPlan: { plan: IPlan }
  EditPlanSuccess: { planId: number }
}

export type EditPlanStackScreenName = keyof EditPlanStackParamsList

export type EditPlanStackScreenProps<
  Screen extends keyof EditPlanStackParamsList
> = CompositeScreenProps<
  NativeStackScreenProps<EditPlanStackParamsList, Screen>,
  NativeStackScreenProps<RootStackParamsList>
>
