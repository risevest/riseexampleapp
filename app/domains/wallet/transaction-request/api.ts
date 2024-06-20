import instance from 'app/api/v2/base'
import { AxiosResponse } from 'axios'

import { Currency } from '../types'
import {
  ConfirmVolumeTransactionPayload,
  ServerCompleteTransactionPayload,
  ServerFundingMethod,
  ServerWithdrawalMethod
} from './types'

export async function cancelTransaction(id: string) {
  const res = await instance.patch(`transaction-requests/${id}/cancel`)
  return res.data
}

export async function confirmTransaction(transactionId: string) {
  const res = await instance.put<
    never,
    AxiosResponse<ServerCompleteTransactionPayload>
  >(`transaction-requests/${transactionId}/complete`)

  return res.data
}

export async function confirmVolumeTransaction({
  transactionId,
  provider_reference
}: ConfirmVolumeTransactionPayload) {
  const res = await instance.put(
    `transaction-requests/${transactionId}/complete`,
    { provider_reference }
  )

  return res.data
}

export async function getFundingMethods(
  wallet: Currency
): Promise<ServerFundingMethod[]> {
  const res = await instance.get('/config', {
    params: {
      entity: 'funding_method',
      filter_key: 'permitted_wallet',
      filter_value: wallet?.toLowerCase()
    }
  })

  return res.data
}

export async function getWithdrawalMethods(
  wallet: Currency
): Promise<ServerWithdrawalMethod[]> {
  const res = await instance.get('/config', {
    params: {
      entity: 'withdrawal_method',
      filter_key: 'permitted_wallet',
      filter_value: wallet?.toLowerCase()
    }
  })

  return res.data
}
