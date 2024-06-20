import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamsList } from '../root-stack'

export type EditAutoInvestStackParamsList = {
  EditAmount: { onSave(amount: number): void }
  EditAutoInvest: { plan: IPlan }
  EditFrequency: { onSave(frequency: string, chargeDate: string | Date): void }
}

export type EditAutoInvestStackScreenName = keyof EditAutoInvestStackParamsList

export type EditAutoInvestStackScreenProps<
  Screen extends keyof EditAutoInvestStackParamsList
> = CompositeScreenProps<
  NativeStackScreenProps<EditAutoInvestStackParamsList, Screen>,
  NativeStackScreenProps<RootStackParamsList>
>
