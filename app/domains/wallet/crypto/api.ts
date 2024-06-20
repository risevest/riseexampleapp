import instance from 'app/api/v2/base'

import { ServerCryptoWallet, toServerCurrency } from '..'
import { NewCryptoWalletPayload } from './types'

export async function newCryptoWallet(
  payload: NewCryptoWalletPayload
): Promise<ServerCryptoWallet> {
  return (
    await instance.post('/external-wallets', {
      metadata: {
        currency: toServerCurrency(payload.currency),
        network: payload.network
      },
      wallet_type: 'crypto_wallet'
    })
  ).data
}
