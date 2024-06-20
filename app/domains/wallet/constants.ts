import { Currency } from './types'

export const WALLET_QUERY_KEYS = {
  allRates: 'allRates',
  defaultWallet: 'defaultWallet',
  earningsSummary: 'earningsSummary',
  getWallets: 'getWallets',
  rates: (currency: Currency) => ['rates', currency],
  setDefaultWallet: 'setDefaultWallet',
  transferToWallet: 'transferToWallet'
} as const
