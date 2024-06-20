import { Currency, WalletType } from '../types'

//server types
export type ServerFeeType = 'flat' | 'percentage' | 'graded'
export type ServerFeeValue = number | ServerGrade[]

export interface ServerGrade {
  fee_type: 'flat' | 'percentage'
  fee_value: number
  threshold?: number
}
export interface FundingMethod {
  collectionProvider: string
  currency: Currency
  currencySymbol?: string
  currencyTitle?: string
  feeType: ServerFeeType
  feeValue: FeeValue
  isEnabled: boolean
  limit?: number
  name: WalletType
  network?: string
  networkName?: string
  timeline: string
  walletType: WalletType
}

export type FeeValue = number | Grade[]

export interface Grade {
  feeType: 'flat' | 'percentage'
  feeValue: number
  threshold?: number
}

export interface ServerFundingMethod {
  collection_provider: string
  currency: string
  currency_name: string
  currency_symbol: string
  fee_type: ServerFeeType
  fee_value: ServerFeeValue
  is_enabled: boolean
  limit?: number
  network?: string
  network_name?: string
  timeline: string
  wallet_type: WalletType
}

export interface ServerWithdrawalMethod {
  currency: string
  currency_name: string
  currency_symbol: string
  fee_type: ServerFeeType
  fee_value: ServerFeeValue
  is_enabled: boolean
  limit?: number
  network?: string
  network_name?: string
  timeline: string
  wallet_type: WalletType
}

export interface WithdrawalMethod {
  currency: Currency
  currencyName: string
  currencySymbol: string
  feeType: ServerFeeType
  feeValue: FeeValue
  isEnabled: boolean
  limit?: number
  name: WalletType
  network?: string
  networkName?: string
  timeline: string
  walletType: WalletType
}

export interface InitiateTransactionResponse {
  authentication_url?: string
  flutterwave_key?: string
  local_amount: number
  reference: string
}

export type WalletMethod = WithdrawalMethod | FundingMethod

export interface TransactionReference {
  flutterwaveKey: string
  localAmount: number
  reference: string
}

export interface ConfirmVolumeTransactionPayload {
  provider_reference: string
  transactionId: string
}

export interface ServerCompleteTransactionPayload {
  amount: number
  created_at: string
  external_wallet_id: string
  id: string
  local_amount: number
  local_currency: string
  owner_id: string
  provider: string
  provider_metadata: any
  request_type: string
  status: string
  transaction_id: any
  updated_at: string
}
