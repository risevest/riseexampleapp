import instance from 'app/api/v2/base'

import { FundWithCardPayload } from './types'

export async function fundWithCard(transaction: FundWithCardPayload) {
  const res = await instance.post('transaction-requests', {
    ...transaction
  })

  return res.data
}

export async function getSavedCards() {
  const res = await instance.get('external-wallets', {
    params: { wallet_type: 'card' }
  })

  return res.data
}

export async function deleteCard(cardId: string) {
  const res = await instance.delete(`external-wallets/${cardId}`)

  return res.data
}
