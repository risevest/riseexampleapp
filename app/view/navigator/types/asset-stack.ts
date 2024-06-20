import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AssetClassPlanType } from 'app/domains/plans'

import { RootStackParamsList } from './root-stack'

type AssetClassParams = {
  assetClass: string
  assetId?: number
  description: string
  duration?: number
  fromDashboard: boolean
  id: number
  image: boolean
  isFixedIncome: boolean
  isStock: boolean
  isStocksPlan?: boolean
  name: string
  planImage: string
  planName: string
  planType?: string
  portfolio?: []
  portfolioPerformance:
    | assetPerformance[]
    | HistoricalPerformance[]
    | YearlyRisePortfolio[]
}

export type AssetClassStackParamsList = {
  AssetClass: AssetClassParams
  CreateAsset: { fromDashboard: boolean; item: AssetClassPlanType }
  NamePlan: {
    planParamsMeta: AssetClassParams
  }
  PlanCreationSuccess: {
    fromDashboard: boolean
    planId: number
    planImage: string
    planName: string
  }
  PlanDuration: {
    planParamsMeta: AssetClassParams
  }
  ReviewPlan: {
    planMetadata: AssetClassParams & {
      dollarAmount: string
      recurringFrequency: string
    }
  }
  TargetAmount: {
    planParamsMeta: AssetClassParams
  }
}

export type AssetClassStackScreenProps<
  Screen extends keyof AssetClassStackParamsList
> = CompositeScreenProps<
  NativeStackScreenProps<AssetClassStackParamsList, Screen>,
  NativeStackScreenProps<RootStackParamsList>
>
