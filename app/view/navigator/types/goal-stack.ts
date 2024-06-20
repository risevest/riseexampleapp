import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { GoalBasedPlanType } from 'app/domains/plans'
import { Currency } from 'app/domains/wallet'
import { GoalScreen } from 'app/view/App/Plans/Future/PlanPortfolioTab/goal-class/types'

import { ExternalLinksParams } from './auth-stack'
import { SelectCurrencyParams } from './build-wealth-stack'
import { RootStackParamsList } from './root-stack'

export type GoalClassStackParamsList = {
  CreateGoal: { fromDashboard: boolean; item: GoalBasedPlanType }
  CreateGoalPlan: { fromDashboard: boolean; planParamsMeta: GoalPlanData }
  ExternalLink: ExternalLinksParams
  Review: {
    currency: Currency
    fromDashboard: boolean
    planMetadata: GoalPlanData & { targetDate: string | Date }
  }
  SelectCurrency: SelectCurrencyParams
  TargetAmount: {
    currency: Currency
    currencySymbol?: string
    fromDashboard: boolean
    planParamsMeta: GoalPlanData & {
      goalName: string
      planImage: string
      planType: string
      screens: GoalScreen[]
    }
  }
  TargetDate: {
    currency: Currency
    currencySymbol?: string
    fromDashboard: boolean
    planParamsMeta: GoalPlanData & {
      goalName: string
      planImage: string
      planType: string
      screens: GoalScreen[]
    }
  }
  TargetName: {
    currency: Currency
    currencySymbol?: string
    fromDashboard: boolean
    planParamsMeta: GoalPlanData & {
      goalName: string
      planImage: string
      planType: string
      screens: GoalScreen[]
    }
  }
}

export type GoalClassStackScreenProps<
  Screen extends keyof GoalClassStackParamsList
> = CompositeScreenProps<
  NativeStackScreenProps<GoalClassStackParamsList, Screen>,
  NativeStackScreenProps<RootStackParamsList>
>
