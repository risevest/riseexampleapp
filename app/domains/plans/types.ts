export interface Plan {
  assetId: number
  assetType: string
  capitalGains: string
  category: PlanCategory
  createdAt: string
  currentBalance: string
  currentEarnings: number
  duration: number
  fundingSourceId: null | number
  fundingSourceType: string
  goalAmount: number
  goalTimeline: number
  id: number
  isArchived: boolean
  isClosed: boolean
  isRecurring: boolean
  lastChargeDate: string
  maturityDate: string
  name: string
  nextChargeDate: string
  numRecurringTries: number
  parentId: number
  pictureUrl: string
  planType: string
  recurringAmount: number
  recurringFrequency: Frequency
  reinvest: boolean
  returnPercent?: number
  returns: IReturns[]
  tag: string
  totalDepositedLocalCurr: number
  totalFunded: string
  totalWithdrawn: string
  transactions: ITransactionObj[]
  type: string
  updatedAt: string
  userId: number
}

export interface GoalBasedPlanType {
  createdAt: string
  hasAddMoneyScreen: boolean
  id: number
  info: any
  isLive: boolean
  landingPageImage: string
  planDescription: string
  planImage: string
  planName: string
  planType: string
  updatedAt: string
}

export interface AssetClassPlanType {
  createdAt: string
  currentReturnsValue: string
  description: string
  historicalPerformance: Array<{
    returnsPercentage: number
    year: number
  }>
  iconUrl: string
  id: number
  isAgro: boolean
  isCrypto: boolean
  isEurobond: boolean
  isFixedIncome: boolean
  isLive: boolean
  isRealEstate: boolean
  isStock: boolean
  isVenture: boolean
  landingPageImage: string
  longName: string
  minimumInvestment: string
  name: string
  returns: string
  returnsRange: string
  riskLevel: string
  updatedAt: string
  uuid: string
}

export interface Stocks {
  costPrice: string
  createdAt: string
  currentPrice: string
  id: number
  imageUrl: string
  info: any[]
  liquidatedAt: any
  name: string
  quantity: number
  symbol: string
  updatedAt: string
}
