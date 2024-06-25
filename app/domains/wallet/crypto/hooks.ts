import { useQuery } from '@tanstack/react-query'

import { WalletMethod } from '../transaction-request'
import { newCryptoWallet } from './api'
import { CRYPTO_QUERY_KEYS } from './constants'
import {
  CryptoWallet,
  NewCryptoWalletPayload,
  ServerCryptoWallet
} from './types'

function extractCryptoWallet(
  data: ServerCryptoWallet | undefined
): CryptoWallet | undefined {
  if (!data) {
    return undefined
  }
  return {
    address: data.details.wallet_address,
    currency: data.details.currency,
    network: data.details.network
  } as CryptoWallet
}

export function useNewCryptoWallet(payload: NewCryptoWalletPayload) {
  return useQuery({
    queryFn: () => newCryptoWallet(payload),
    queryKey: CRYPTO_QUERY_KEYS.newCryptoWallet,
    retry: false,
    select: extractCryptoWallet
  })
}

export function isCryptoWallet<T extends WalletMethod>(wallet: T) {
  return wallet.walletType === 'crypto_wallet'
}
