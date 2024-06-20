import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamsList } from '../root-stack'

export type TransactionsStackParamsList = {
  TransactionDetails: { transactionId: string }
  Transactions: { walletId?: string }
}

export type TransactionsStackScreenName = keyof TransactionsStackParamsList

export type TransactionsStackScreenProps<
  Screen extends keyof TransactionsStackParamsList
> = CompositeScreenProps<
  NativeStackScreenProps<TransactionsStackParamsList, Screen>,
  NativeStackScreenProps<RootStackParamsList>
>
