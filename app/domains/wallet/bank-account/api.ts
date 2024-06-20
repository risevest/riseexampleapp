import instance, { AxiosError } from 'app/api/v2/base'

import {
  FundBankDetailsPayload,
  ModifyBankAccountResponse,
  SaveBankAccountPayload,
  ServerBankAccountDetails,
  VerifiedBankAccount,
  VerifyBankAccountPayload,
  WithdrawalBankDetailsPayload
} from './types'

export async function saveBankAccount(
  payload: SaveBankAccountPayload
): Promise<ModifyBankAccountResponse> {
  return (await instance.post('/external-wallets', payload)).data
}

export async function getSavedBankAccounts(currency?: string) {
  return (
    await instance.get('/external-wallets', {
      params: { currency, wallet_type: 'bank_account' }
    })
  ).data
}

export async function deleteBankAccount(
  id: string
): Promise<ModifyBankAccountResponse> {
  return (await instance.delete(`/external-wallets/${id}`)).data
}

export async function withdrawWithBankAccount(
  payload: WithdrawalBankDetailsPayload
) {
  return (
    await instance.post('/transaction-requests', {
      ...payload,
      request_type: 'withdrawal',
      wallet_type: 'bank_account'
    })
  ).data
}

export async function fundWithBankAccount(payload: FundBankDetailsPayload) {
  return (
    await instance.post('/transaction-requests', {
      ...payload,
      external_wallet: {},
      request_type: 'funding',
      wallet_type: 'bank_account'
    })
  ).data
}

export async function getBanks(country?: string) {
  return instance
    .get('/banks', {
      params: {
        country
      }
    })
    .then((res) => res.data)
}

export async function verifyBankAccount(
  accountDetail: VerifyBankAccountPayload
): Promise<VerifiedBankAccount<ServerBankAccountDetails>> {
  return await instance
    .post('/external-wallets/verify', {
      details: accountDetail,
      wallet_type: 'bank_account'
    })
    .then((res) => ({ ...res.data, valid: true }))
    .catch((error: AxiosError) => {
      const code = error.response?.status
      if (!!code && code === 403) {
        return { valid: false }
      }
      throw error
    })
}
