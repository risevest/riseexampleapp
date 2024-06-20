import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SavedCard } from 'app/domains/wallet'
import type { OtherPlanType } from 'app/view/App/Dashboard/sections/others-class-types'

import { RootStackParamsList } from '../root-stack'

export type PayDayStackParamsList = {
  ChooseCard: {
    onAddNewCard?: () => void
    onSelectCard?: (card?: SavedCard) => void
  }
  JoinSuccess: { planId: number; planName: string }
  Nickname: undefined
  PayDayLanding: OtherPlanType
  PayDayLeaderboard: undefined
  Review: { card?: SavedCard; payload: string }
}

export type PayDayStackScreenName = keyof PayDayStackParamsList

export type PayDayStackScreenProps<Screen extends keyof PayDayStackParamsList> =
  CompositeScreenProps<
    NativeStackScreenProps<PayDayStackParamsList, Screen>,
    NativeStackScreenProps<RootStackParamsList>
  >
