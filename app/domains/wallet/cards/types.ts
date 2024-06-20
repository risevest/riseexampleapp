import { Currency, WalletType } from '../types'

export interface ServerCard {
  created_at: string
  details: {
    brand: string
    currency: string
    expiry_month: string
    expiry_year: string
    last_digits: string
    provider: string
  }
  id: string
  is_visible: boolean
  owner_id: string
  status: boolean
  wallet_type: string
}

export interface SavedCard {
  createdAt: string
  currency: Currency
  expiryMonth: string
  expiryYear: string
  id: string
  last4: string
  type: string
}

export interface FundWithCardPayload {
  amount: number
  credential?: string
  currency: string
  external_wallet?: {} | SavedCard
  external_wallet_id?: string
  request_type: 'funding' | 'withdrawal'
  should_save?: boolean
  wallet_currency?: string
  wallet_type: WalletType
}
