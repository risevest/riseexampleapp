import { Currency } from '../types'

export interface SaveMomoWalletPayload {
  currency: Currency
  name: string
  network: string
  number: string
}

export interface FundWithMomoPayload {
  amount: number
  currency: Currency
  network: string
  number: string
}

export interface FundWithMomoIdPayload {
  amount: number
  currency: Currency
  walletId: string
}

export interface FundWithMomoResponse {
  authentication_url: string
  local_amount: number
  reference: string
}

export type SavedWalletWithdrawMomoWalletPayload = {
  amount: number
  currency: Currency
  id: string
  name: string
  network: string
  networkName: string
  number: string
}

export type WithdrawMomoWalletPayload = {
  amount: number
  credential: string
  currency: Currency
  external_wallet: {
    network: string
    phone_number: string
  }
  reason: string
}

export interface WithdrawMomoWalletIdPayload
  extends Omit<WithdrawMomoWalletPayload, 'external_wallet'> {
  external_wallet_id: string
}
export interface SavedMomoWallet {
  id: string
  name: string
  network: string
  networkName: string
  number: string
}

export interface ServerMomoWallet {
  created_at: Date
  details: Details
  id: string
  owner_id: string
  status: string
  wallet_type: string
}

export interface Details {
  name: string
  network: string
  network_name: string
  phone_number: string
}
