import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AffiliateTransaction } from 'app/domains/user'

import { RootStackParamsList } from '../root-stack'

export type AffiliateStackParamsList = {
  AffiliateProgram: undefined
  AffiliateTransactionDetails: {
    transaction: AffiliateTransaction
  }
  AffiliateTransactionList: undefined
  EnterReferralCode: undefined
  RefferalsFAQs: undefined
}

export type AffiliateStackScreenName = keyof AffiliateStackParamsList

export type AffiliateStackScreenProps<
  Screen extends keyof AffiliateStackParamsList
> = CompositeScreenProps<
  NativeStackScreenProps<AffiliateStackParamsList, Screen>,
  NativeStackScreenProps<RootStackParamsList>
>
