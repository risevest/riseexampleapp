import {
  CompositeScreenProps,
  NavigatorScreenParams
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { AppStackParamsList } from './app-stack'
import { ExternalLinksParams } from './auth-stack'
import { BottomTabParamsList } from './bottom-stack'
import { AccountStatementStackParamsList } from './nested/account-statement-stack'
import { AccountAndCardsStackParamsList } from './nested/accounts-and-cards-stack'
import { AffiliateStackParamsList } from './nested/affiliate-program-stack'
import { DeleteAccountStackParamsList } from './nested/delete-account-stack'
import { EditAutoInvestStackParamsList } from './nested/edit-auto-invest'
import { EditPlanStackParamsList } from './nested/edit-plan'
import { GiftPlanStackParamsList } from './nested/gift-plan-stack'
import { IDStackParamsList } from './nested/id-stack'
import { PayDayStackParamsList } from './nested/pay-day-stack'
import { ProfileStackParamsList } from './nested/profile-stack'
import { RisePortfolioStackParamsList } from './nested/rise-portfolio-stack'
import { TransactionsStackParamsList } from './nested/transactions-stack'
import { WalletStackParamsList } from './nested/wallet-stack'
import { WithdrawFromPlanStackParamsList } from './nested/withdraw-from-plan-stack'
import { MessageParams } from './types'
import { VerifyEmailStackParamsList } from './verify-email-stack'

export type NestedStackStackParamsList = {
  AccountStatementStack: NavigatorScreenParams<AccountStatementStackParamsList>
  AccountSuccessScreen: { name: string }
  AccountsAndCardsStack?: NavigatorScreenParams<AccountAndCardsStackParamsList>
  AffiliateProgramStack:
    | NavigatorScreenParams<AffiliateStackParamsList>
    | undefined
  ContactUs: undefined
  DefaultFundingWallet: undefined
  DeleteAccount?: NavigatorScreenParams<DeleteAccountStackParamsList>
  EditAutoInvestStack: NavigatorScreenParams<EditAutoInvestStackParamsList>
  EditPlanStack: NavigatorScreenParams<EditPlanStackParamsList>
  EditPortfolioSA: { planId: number }
  ExternalLinks: ExternalLinksParams
  FullScreenImage: { imageUrl: string }
  FullScreenVideo: { title: string; uri: string }
  GiftPlanStack: NavigatorScreenParams<GiftPlanStackParamsList> | undefined
  HistoryPlanDetails: {
    planId: number
  }
  Home: NavigatorScreenParams<BottomTabParamsList> | undefined
  IDStack?: NavigatorScreenParams<IDStackParamsList>
  MaturedPlans: undefined
  MessageScreen: MessageParams
  NewsDetails: { feedId: number }
  Notifications: undefined
  OnboardingSeries: undefined
  PayDayStack: NavigatorScreenParams<PayDayStackParamsList>

  PlanHistory: {
    planId: number
    planName: string
  }
  ProfileStack: NavigatorScreenParams<ProfileStackParamsList>
  RisePortfolioStack: NavigatorScreenParams<RisePortfolioStackParamsList>
  SingleFeed: { id: string }
  SocialSurvey: undefined
  TransactionsStack: NavigatorScreenParams<TransactionsStackParamsList>
  UpdateAIFrequency: undefined
  UserPlans: undefined
  VerifyEmailStack: NavigatorScreenParams<VerifyEmailStackParamsList>
  WalletInterest: undefined
  WalletStack: NavigatorScreenParams<WalletStackParamsList>
  WithdrawFromPlanStack: NavigatorScreenParams<WithdrawFromPlanStackParamsList>
}

export type NestedStackScreenProps<
  Screen extends keyof NestedStackStackParamsList
> = CompositeScreenProps<
  NativeStackScreenProps<NestedStackStackParamsList, Screen>,
  NativeStackScreenProps<AppStackParamsList>
>
