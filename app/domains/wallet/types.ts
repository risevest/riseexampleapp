export type WalletType =
  | 'bank_account'
  | 'card'
  | 'mobile_money'
  | 'crypto_wallet'
  | 'virtual_account'
  | 'usd_wallet'

export const supportedCountries = ['NG', 'GH', 'KE', 'UG', 'GB', 'US'] as const
export type CountryCode = (typeof supportedCountries)[number]
export type ServerCountryCode = Lowercase<CountryCode>

export const supportedCurrencies = [
  'USDT',
  'USDC',
  'BUSD',
  'DAI',
  'GHS',
  'KES',
  'UGX',
  'NGN',
  'USD',
  'EUR',
  'GBP'
] as const

export type Currency = (typeof supportedCurrencies)[number]

export type ServerCurrency = 'ngn' | 'usd' | string

export type WalletStatus = 'pending' | 'active' | 'inactive'

export interface CurrencyRate {
  buyRate: number
  currencyType: CurrencyType
  name: string
  network?: string
  sellRate: number
  symbol: Currency
}

export interface ServerCurrencyRate {
  buy_rate: number
  currency_type: CurrencyType
  name: string
  network?: string
  sell_rate: number
  symbol: string
}

export type CurrencyType = 'fiat' | 'crypto'

export interface ExternalWallet<T> {
  details: T
  id: string
  status: WalletStatus
  walletType: WalletType
}
export interface ServerExternalWallet<T> {
  details: T
  owner_id: string
  status: WalletStatus
  wallet_type: WalletType
}

export type RequestType = 'funding' | 'withdrawal'

export interface EarningsSummaryServer {
  percentage_increase: number
  period_earnings: number
  period_end_date: number
  period_start_date: number
  plan_funding: number
  plan_withdrawal: number
  total_plans: number
  wallet_fund: number
}

export interface EarningsSummary {
  percentageIncrease: number
  periodEarnings: number
  periodEndDate: number
  periodStartDate: number
  planFunding: number
  planWithdrawal: number
  totalPlans: number
  walletFund: number
}

export interface EarningsPayload {
  endDate: string
  startDate: string
}

export interface WalletServer {
  balance: number
  created_at: string
  currency: string
  deleted_at: string
  id: string
  interest: number
  interest_enabled: boolean
  is_default: boolean
  owner_id: string
  updated_at: string
}

export interface Wallet {
  balance: number
  createdAt: string
  currency: string
  deletedAt: string
  id: string
  interest: number
  interestEnabled: boolean
  isDefault: boolean
  ownerId: string
  updatedAt: string
}

export interface TransferToWalletPayload {
  amount: number
  credential?: string
  destination_currency: string
  recipient?: string
  source_currency: string
  type: 'transfer' | 'swap'
}
