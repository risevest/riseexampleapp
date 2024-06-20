import { Currency, ServerCurrency } from '../types'

export interface NewCryptoWalletPayload {
  currency: Currency
  network: string
}

export interface ServerCryptoWallet {
  created_at: string
  details: {
    currency: ServerCurrency
    network: string
    wallet_address: string
  }
  id: string
  is_visible: boolean
  owner_id: string
  status: string
  wallet_type: string
}

export interface CryptoWallet {
  address: string
  currency: Currency
  network: string
}
