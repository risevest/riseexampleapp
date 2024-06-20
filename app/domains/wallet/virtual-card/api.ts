import instance, { AxiosError } from 'app/api/v2/base'

import {
  ActionPayload,
  AutoFundDTOServer,
  InitiateVirtualCardTransaction,
  MigrateVirtualCardPayload,
  ServerVirtualCard,
  ServerVirtualCardFees,
  ServerVirtualCardMultiple,
  ServerVirtualCardState
} from './types'

export async function getVirtualCard(uuid: string): Promise<ServerVirtualCard> {
  const resp = await instance.get(`/cards/${uuid}`)
  return resp.data
}

export async function getCardFundingFee(): Promise<ServerVirtualCardFees[]> {
  const resp = await instance.get('/config', {
    params: {
      entity: 'card',
      filter_key: 'type',
      filter_value: 'virtual'
    }
  })
  return resp?.data
}

export async function getVirtualCardState(): Promise<
  ServerVirtualCardState | undefined
> {
  try {
    return await getVirtualCardRequest()
  } catch (error) {
    const err = error as AxiosError<any>
    if (err.isAxiosError && err.response?.status === 404) {
      return undefined
    } else {
      throw error
    }
  }
}
export async function getVirtualCardRequest(): Promise<ServerVirtualCardState> {
  const resp = await instance.get('/card-requests/pending')
  return resp?.data
}

export async function requestCard(pin?: string): Promise<any> {
  const resp = await instance.post('/card-requests', { pin })
  return resp?.data
}

export async function initiateVirtualCardTransaction({
  cardId,
  requestType,
  amount
}: InitiateVirtualCardTransaction) {
  return await instance.post('/cards/transaction-requests', {
    amount: amount,
    card_id: cardId,
    request_type: requestType
  })
}

export async function takeActionOnCard({
  id,
  action,
  credential
}: ActionPayload): Promise<any> {
  const resp = await instance.patch(`/cards/${id}/${action}`, { credential })
  return resp.data
}

export async function autoFund(
  cardId: string,
  cardAutoConfig: AutoFundDTOServer
) {
  return await instance.post(`/cards/${cardId}/config`, cardAutoConfig)
}

export async function getCardTransaction({
  id,
  offset
}: {
  id: string
  offset: number
}): Promise<any> {
  const resp = await instance.get(`/cards/${id}/transactions`, {
    params: { offset }
  })
  return resp.data
}

export async function getUserVirtualCardStatus(): Promise<
  ServerVirtualCardMultiple[]
> {
  const resp = await instance.get('/cards')
  return resp.data
}

export async function migrateVirtualCard({
  cardId,
  pin
}: MigrateVirtualCardPayload) {
  const resp = await instance.post(`/cards/${cardId}/migrate`, { pin })
  return resp?.data
}

export async function generateVirtualCardOTP(cardId: string) {
  const resp = await instance.get(`cards/${cardId}/reset-pin`)
  return resp?.data
}

export async function verifyVirtualCardOTP({
  cardId,
  otp
}: {
  cardId: string
  otp: string
}) {
  const resp = await instance.patch(`cards/${cardId}/verify-pin-reset`, { otp })
  return resp?.data
}

export async function changeCardPIN({
  cardId,
  pin
}: MigrateVirtualCardPayload) {
  const resp = await instance.post(`cards/${cardId}/reset-pin`, {
    pin
  })
  return resp?.data
}
