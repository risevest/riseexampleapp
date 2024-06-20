import instance from 'app/api/v2/base'

import { toServerCurrency } from '../hooks'
import { ServerFundingMethod } from '../transaction-request'
import {
  FundWithMomoIdPayload,
  FundWithMomoPayload,
  FundWithMomoResponse,
  SaveMomoWalletPayload,
  ServerMomoWallet,
  WithdrawMomoWalletIdPayload,
  WithdrawMomoWalletPayload
} from './types'

export async function deleteMomoWallet(id: string) {
  const res = await instance.delete(`/external-wallets/${id}`)
  return res.data
}

export async function saveMomoWallet(payload: SaveMomoWalletPayload) {
  const res = await instance.post('/external-wallets', {
    metadata: {
      currency: toServerCurrency(payload.currency),
      name: payload.name,
      network: payload.network,
      phone_number: payload.number
    },
    wallet_type: 'mobile_money'
  })

  return res.data
}

export async function getMomoWallets(): Promise<ServerMomoWallet[]> {
  const res = await instance.get('/external-wallets', {
    params: {
      wallet_type: 'mobile_money'
    }
  })
  return res.data
}

export async function fundWithMomo(
  payload: FundWithMomoPayload | FundWithMomoIdPayload
): Promise<FundWithMomoResponse> {
  const metadata =
    'walletId' in payload
      ? { external_wallet_id: payload.walletId }
      : {
          external_wallet: {
            network: payload.network,
            phone_number: payload.number
          }
        }
  const res = await instance.post('/transaction-requests', {
    amount: payload.amount,
    currency: toServerCurrency(payload.currency),
    request_type: 'funding',
    wallet_type: 'mobile_money',
    ...metadata
  })

  return res.data
}

export async function withdrawWithMomo(
  payload: WithdrawMomoWalletPayload | WithdrawMomoWalletIdPayload
) {
  return instance.post('/transaction-requests', {
    ...payload,
    request_type: 'withdrawal',
    wallet_type: 'mobile_money'
  })
}

export async function getMomoNetworks(
  entity: 'withdrawal_method' | 'funding_method'
): Promise<ServerFundingMethod[]> {
  const res = await instance.get('/config', {
    params: {
      entity,
      filter_key: 'wallet_type',
      filter_value: 'mobile_money'
    }
  })
  return res.data
}
