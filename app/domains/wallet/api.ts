import instance from 'app/api/v2/base'
import { delay } from 'app/internals/time'
import instanceV1 from 'app/utils/axios'

import { toServerCurrency } from './hooks'
import {
  Currency,
  EarningsSummaryServer,
  TransferToWalletPayload,
  WalletServer
} from './types'

export async function getRates(currency: Currency): Promise<any[]> {
  const resp = await instance.get('/config', {
    params: {
      entity: 'currency',
      filter_key: 'symbol',
      filter_value: toServerCurrency(currency)
    }
  })
  return resp.data
}

export async function getAllRates(): Promise<any[]> {
  const resp = await instance.get('/config', {
    params: {
      entity: 'currency'
    }
  })
  return resp.data
}

export async function getEarnings(
  startDate: string,
  endDate: string
): Promise<EarningsSummaryServer> {
  const resp = await instanceV1.get('user-plans/earnings-summary', {
    params: {
      end_date: endDate,
      start_date: startDate
    }
  })
  return resp?.data?.data
}

export async function getDefaultWallet(): Promise<{ wallet: Currency }> {
  await delay(1000)
  return { wallet: 'USD' }
}

export async function setDefaultWallet(walletId: string) {
  return await instance.patch(`wallets/${walletId}/default`)
}

export async function getWallets(): Promise<WalletServer[]> {
  const resp = await instance.get('wallets')

  return resp?.data
}

export async function transferToWallet(payload: TransferToWalletPayload) {
  return await instance.post('wallets/transfer', payload)
}
