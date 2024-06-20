import { Currency, ServerCurrency, WalletType } from '../types'

export interface SavedBankAccount {
  accountName: string
  accountNumber: string
  address?: string
  bankName: string
  createdAt: DateTime
  currency: ServerBankAccountDetails['currency']
  id: string
}

export interface Bank {
  id: string
  name: string
}

export interface ServerBank {
  code: string
  country: string
  currency: Currency
  name: string
}

type NgnBankAccount = {
  account_number: string
  bank_code: string
  bank_name: string
}
type GbpEurBankAccount = {
  account_name: string
  account_number: string
  address: {
    city: string
    house_number: string
    postal_code: string
    street_name: string
  }

  bank_name: string
  country: string
  routing_number: string
  swift_code: string
}
export type VerifyBankAccountPayload =
  | {
      bank_account: NgnBankAccount
      currency: 'ngn'
    }
  | {
      bank_account: GbpEurBankAccount
      currency: 'gbp' | 'eur'
    }

export interface VerifiedBankAccount<T = BankAccountDetails> {
  details: T
  token: string
  valid: boolean
}

export interface ServerSavedBankAccount {
  created_at: DateTime
  details: ServerBankAccountDetails
  id: string
}

type ServerNgnBankAccountDetails = {
  account_name: string
  account_number: string
  bank_code: string
  bank_id: number
  bank_name: string
  currency: 'ngn'
}

type ServerGbpEuBankAccountDetails = {
  account_name: string
  account_number: string
  address: {
    city: string
    house_number: string
    postal_code: string
    street_name: string
  }
  bank_name: string
  country: string
  currency: 'gbp' | 'eur'
  provider_reference: string
  routing_number: string
  swift_code: string
}

export type ServerBankAccountDetails =
  | ServerNgnBankAccountDetails
  | ServerGbpEuBankAccountDetails

export interface BankAccountDetails {
  accountName: string
  accountNumber: string
  bankCode?: string
  bankId?: number
  bankName: string
}

export interface SaveBankAccountPayload {
  currency: Currency
  metadata: Metadata
  wallet_type: WalletType
}

export interface ModifyBankAccountResponse {
  created_at: string
  details: ServerBankAccountDetails
  id: string
}

interface Metadata {
  token: string
}

export interface WithdrawalBankDetailsPayload {
  amount: number
  credential: string
  currency: ServerCurrency
  external_wallet_id: string
  reason: string
  wallet_currency?: string
}

export interface FundBankDetailsPayload {
  amount: number
  currency: ServerCurrency
}

export interface ProviderMetadata {
  buy_rate: number
  reference: string
}

export interface ServerTransactionRequestsResult {
  amount: number
  authentication_url?: string
  created_at: string
  external_wallet_id: any
  fee: number
  id: string
  local_amount: number
  local_currency: string
  owner_id: string
  provider: string
  provider_metadata: ProviderMetadata
  reference?: string
  request_type: string
  status: string
  transaction_id: string
  updated_at: string
}
