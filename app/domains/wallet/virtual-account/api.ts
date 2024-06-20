import instance from 'app/api/v2/base'
import FormData from 'form-data'

import { toServerCurrency } from '../hooks'
import { Currency } from '../types'
import {
  RequestVirtualAccount,
  RequestVirtualAccountPayload,
  ServerVirtualAccountRequest
} from './types'

export async function getVirtualAccount(
  currency: Currency,
  walletCurrency: 'usd' | 'ngn'
): Promise<any[]> {
  const res = await instance.get('/external-wallets', {
    params: {
      currency: toServerCurrency(currency),
      wallet_currency: walletCurrency,
      wallet_type: 'virtual_account'
    }
  })

  return res.data
}

export async function requestVirtualAccount(
  currency: Currency,
  walletCurrency?: 'ngn' | 'usd'
): Promise<RequestVirtualAccount> {
  const res = await instance.post('/external-wallets', {
    metadata: {
      currency: toServerCurrency(currency),
      wallet_currency: walletCurrency || 'usd'
    },
    wallet_type: 'virtual_account'
  })

  return res.data
}

export async function getVirtualAccountRequest(): Promise<ServerVirtualAccountRequest> {
  const res = await instance.get('/external-wallet-requests/recent')
  return res.data
}

export function requestMultiCurrencyVirtualAccount(
  payload: RequestVirtualAccountPayload
): Promise<any> {
  const formData = new FormData()

  formData.append('wallet_type', 'virtual_account')
  if (payload.id_back) {
    formData.append('id_back', payload.id_back)
  }
  formData.append('id_front', payload.id_front)
  formData.append('bank_statement', payload.bank_statement)
  formData.append(
    'details[account_designation]',
    payload.details.account_designation
  )
  formData.append('details[dob]', payload.details.dob)
  formData.append(
    'details[document][expiry_date]',
    payload.details.document.expiry_date
  )
  formData.append(
    'details[document][issued_by]',
    payload.details.document.issued_by
  )
  formData.append(
    'details[document][issued_country_code]',
    payload.details.document.issued_country_code
  )
  formData.append(
    'details[document][issued_date]',
    payload.details.document.issued_date
  )
  formData.append('details[document][number]', payload.details.document.number)
  formData.append('details[document][type]', payload.details.document.type)
  formData.append('details[address][city]', payload.details.address.city)
  formData.append('details[address][country]', payload.details.address.country)
  formData.append('details[address][number]', payload.details.address.number)
  formData.append('details[address][state]', payload.details.address.state)
  formData.append('details[address][street]', payload.details.address.street)
  formData.append('details[address][zip]', payload.details.address.zip)
  formData.append(
    'details[employment_status]',
    payload.details.employment_status
  )
  formData.append('details[income_band]', payload.details.income_band)
  formData.append('details[occupation]', payload.details.occupation)
  formData.append('details[source_of_income]', payload.details.source_of_income)

  const config = {
    maxBodyLength: Infinity
  }

  return instance.post('/external-wallet-requests', formData, config)
}
