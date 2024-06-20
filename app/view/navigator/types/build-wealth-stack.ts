import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Currency } from 'app/domains/wallet'

import { ExternalLinksParams } from './auth-stack'
import { RootStackParamsList } from './root-stack'

export type SelectCurrencyParams = {
  pressAction: (currency: Currency, currencySymbol?: string) => void
  title: string
}

type QuestionParams = {
  isBuildWealth: boolean
}

type PlansPortfolioParams = {
  age: string | number
  assetClasses: AssetClassUI[]
  hasDOB: boolean
  riskProfile: string
} & QuestionParams

type FourthQuestionParams = {
  investmentProfile: {
    age: number
    dob: string
    hasDob: boolean
    monthlyIncome: string
    percentageInvestable: number
    retirementAge: number
  }
} & QuestionParams

type SecondQuestionParams = {
  currencySymbol?: string
  dob: string
  monthlyIncome: string
}

type ThirdQuestionParams = {
  investmentProfile: {
    dob: string
    monthlyIncome: string
    percentageInvestable: number
  }
}

type AddImageToPlanParams =
  | {
      isStocksPlan?: boolean
    }
  | {
      age: number | string
      dollarAmount: string
      duration: string
      estimatedMonthlyInvestment: string
      hasDOB: boolean
      isBuildWealth: boolean
    }
  | { dollarAmount: string; recurringFrequency: FrequencyWithOnce }

type ReviewBuildWealthParams = {
  image: string
  imageUri: {
    data: object
    name: string
    type: string
    uri: string
  }
} & {
  age: string
  dollarAmount: string
  duration: string
  estimatedMonthlyInvestment: string
  hasDOB: boolean
  isBuildWealth: boolean
  recurringFrequency: FrequencyWithOnce
}

export type BuildWealthParamsList = {
  AddImageToPlan: AddImageToPlanParams
  AutoInvest: {
    dollarAmount: number | string
    isStocksPlan: boolean
    recurringFrequency: FrequencyWithOnce
  }
  BuildWealthHome: undefined
  EditAmount: {
    recurringAmount: number | string
  }
  EditPortfolio: {
    assetClasses: AssetClassUI[]
    isBuildWealth: boolean
  }
  ExternalLink: ExternalLinksParams
  FirstQuestion: {
    currency: Currency
    currencySymbol?: string
  }
  FourthQuestion: FourthQuestionParams
  PlanDuration: {
    convertInvestmentToDollars: string
    estimatedMonthlyInvestment: string
    recurringFrequency: FrequencyWithOnce
  }
  PlansPortfolio: PlansPortfolioParams
  Projection: {
    age: number
    isBuildWealth: boolean
  }
  ReviewBuildWealth: ReviewBuildWealthParams
  SecondQuestion: SecondQuestionParams
  SelectCurrency: SelectCurrencyParams
  Status: undefined
  ThirdQuestion: ThirdQuestionParams
}

export type BuildWealthScreenProps<Screen extends keyof BuildWealthParamsList> =
  CompositeScreenProps<
    NativeStackScreenProps<BuildWealthParamsList, Screen>,
    NativeStackScreenProps<RootStackParamsList>
  >
