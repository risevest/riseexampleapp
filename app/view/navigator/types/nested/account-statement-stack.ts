import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamsList } from '../root-stack'

export type AccountStatementStackParamsList = {
  AccountStatement: undefined
  AccountStatementSuccess: undefined
}

export type AccountStatementStackScreenName =
  keyof AccountStatementStackParamsList

export type AccountStatementStackScreenProps<
  Screen extends keyof AccountStatementStackParamsList
> = CompositeScreenProps<
  NativeStackScreenProps<AccountStatementStackParamsList, Screen>,
  NativeStackScreenProps<RootStackParamsList>
>
