import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamsList } from '../root-stack'

export type RisePortfolioStackParamsList = {
  RealEstate: { portfolioId: number }
  RisePortfolio: undefined
  Stocks: { portfolioId: number }
}

export type RisePortfolioStackScreenName = keyof RisePortfolioStackParamsList

export type RisePortfolioStackScreenProps<
  Screen extends keyof RisePortfolioStackParamsList
> = CompositeScreenProps<
  NativeStackScreenProps<RisePortfolioStackParamsList, Screen>,
  NativeStackScreenProps<RootStackParamsList>
>
