import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
  Currency,
  SavedBankAccount,
  SavedCard,
  SavedMomoWallet,
  VerifiedBankAccount
} from 'app/domains/wallet'

import { RootStackParamsList } from '../root-stack'

export type AccountAndCardsStackParamsList = {
  AccountDetail: SavedBankAccount
  BankAccounts:
    | {
        currency: Currency
      }
    | undefined
  CardDetail: { card: SavedCard }
  Cards: undefined
  ConfirmBankAccount: VerifiedBankAccount
  EnterAccountNumber: undefined
  EnterPhoneNumberMomo: undefined
  MoreAddBankAccount: undefined
  MoreBankAccountDetails: { bank: IBankAccount }
  MoreBankList: undefined
  MoreConfirmBank: {
    accountName: string
    accountNumber: string
    bankId: number
    bankName: string
  }
  MoreSelectBank: { accountNumber: string }
  SelectBank: { accountNumber: string }
  SelectBankOption: undefined
  SelectCurrencyCard: { onDone?: () => void }
  SelectOption: undefined
  VerifyNumberMomoWallet: Omit<SavedMomoWallet, 'id'> & { currency: Currency }
  ViewMomoWallets: undefined
  ViewSavedMomoWallet: SavedMomoWallet
}

export type AccountAndCardsStackScreenName =
  keyof AccountAndCardsStackParamsList

export type AccountAndCardsStackScreenProps<
  Screen extends keyof AccountAndCardsStackParamsList
> = CompositeScreenProps<
  NativeStackScreenProps<AccountAndCardsStackParamsList, Screen>,
  NativeStackScreenProps<RootStackParamsList>
>
