import instance from 'app/api/v2/base'

import { WalletTransactionPayload, WalletTransactionServer } from './types'

export async function getWalletTransactions(
  offset: number,
  payload: WalletTransactionPayload
): Promise<WalletTransactionServer[]> {
  const resp = await instance.get('wallets/transaction-requests', {
    params: { offset, ...payload }
  })

  return resp?.data
}

export async function getSingleWalletTransactionDetail(
  id: string
): Promise<WalletTransactionServer> {
  const resp = await instance.get(`wallets/transaction-requests/${id}`)
  return resp?.data
}
