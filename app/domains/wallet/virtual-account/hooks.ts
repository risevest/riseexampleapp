import { countryDataMap } from 'app/components/phone-input/constants/countriesData'
import { useDisplayMessage } from 'app/hooks'
import { queryClient } from 'app/rq'
import { setUserProperties } from 'app/utils/analytics'
import { VirtualAccountParams } from 'app/view/App/Wallet/funding/virtual-accounts/types'
import { useMutation, useQuery } from 'react-query'

import { toUICurrency } from '../hooks'
import { Currency, ExternalWallet, ServerExternalWallet } from '../types'
import {
  getVirtualAccount,
  getVirtualAccountRequest,
  requestMultiCurrencyVirtualAccount,
  requestVirtualAccount
} from './api'
import { VIRTUAL_ACCOUNT_QUERY_KEYS } from './constants'
import {
  ExternalWalletInfo,
  RequestVirtualAccountPayload,
  ServerVirtualAccountRequest,
  VirtualAccountDetails,
  VirtualAccountRequest
} from './types'

// extraction functions
function extractVirtualAccounts(
  data?: ServerExternalWallet<VirtualAccountDetails>[]
): ExternalWallet<ExternalWalletInfo>[] {
  return (data ?? []).map(
    (wallet: ServerExternalWallet<VirtualAccountDetails>) => {
      return {
        details: {
          accountName: wallet.details.account_name,
          accountNo: wallet.details.account_number,
          accountType: wallet.details.account_type,
          bankAddress: wallet.details.bank_address,
          bankName: wallet.details.bank_name,
          currency: toUICurrency(wallet.details.currency),
          swiftCode: wallet.details.swift_code,
          wireRouting: wallet.details.routing_number || wallet.details.bank_code
        },
        id: wallet.owner_id,
        status: wallet.status,
        walletType: wallet.wallet_type
      }
    }
  )
}

function extractVirtualAccountRequest(
  data?: ServerVirtualAccountRequest
): VirtualAccountRequest | undefined {
  if (!data) return
  return {
    details: data.details,
    id: data.id,
    status: data.request_status,
    walletType: data.wallet_type
  }
}

export function useCreateVirtualAccountMutation(
  currency: Currency,
  walletCurrency?: 'usd' | 'ngn',
  displayError: boolean = true
) {
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: () => requestVirtualAccount(currency, walletCurrency),
    mutationKey: VIRTUAL_ACCOUNT_QUERY_KEYS.createVirtualAccount(currency),
    onError: (error: any) => {
      if (displayError) {
        displayServerError(error)
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        VIRTUAL_ACCOUNT_QUERY_KEYS.virtualAccount(currency)
      )
    }
  })
}

export function useRequestMultiCurrencyVirtualAccount() {
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: requestMultiCurrencyVirtualAccount,
    onError: (error: any) => {
      displayServerError(error)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        VIRTUAL_ACCOUNT_QUERY_KEYS.virtualAccount('USD')
      )
    }
  })
}

export function useVirtualAccountRequest() {
  const { data, ...query } = useQuery({
    queryFn: getVirtualAccountRequest,
    queryKey: VIRTUAL_ACCOUNT_QUERY_KEYS.recentVirtualAccountRequest
  })
  return {
    virtualAccountRequest: extractVirtualAccountRequest(data),
    ...query
  }
}

export function useVirtualAccount<T extends ExternalWalletInfo>(
  currency: Currency,
  walletCurrency: 'usd' | 'ngn' = 'usd'
) {
  const { data, ...query } = useQuery({
    onSuccess: (resp) => {
      setUserProperties({ virtual_acct_generated: resp?.length > 0 })
    },
    queryFn: () => getVirtualAccount(currency, walletCurrency),
    queryKey: VIRTUAL_ACCOUNT_QUERY_KEYS.virtualAccount(
      currency,
      walletCurrency
    )
  })

  const wallets = extractVirtualAccounts(data)

  const account = (wallets[0]?.details ?? {}) as T
  const accountStatus = wallets[0]?.status ?? 'inactive'

  return {
    account,
    accountStatus,
    wallets,
    ...query
  }
}

export function getRequestVirtualAccountPayload(
  rawPayload: VirtualAccountParams
): RequestVirtualAccountPayload {
  const payload: RequestVirtualAccountPayload = {
    bank_statement: rawPayload.bankStatement,
    details: {
      account_designation: rawPayload.accountDesignation,
      address: {
        city: rawPayload.city,
        country: rawPayload.country,
        number: rawPayload.houseNumber,
        state: rawPayload.state,
        street: rawPayload.street,
        zip: rawPayload.zipCode
      },
      dob: rawPayload.birthDate,
      document: {
        expiry_date: rawPayload.expiryDate,
        issued_by:
          countryDataMap[rawPayload.issuanceCountry.toLowerCase()]?.nameEn,
        issued_country_code: rawPayload.issuanceCountry,
        issued_date: rawPayload.issuanceDate,
        number: rawPayload.documentNumber,
        type: rawPayload.code
      },
      employment_status: rawPayload.employmentStatus,
      income_band: rawPayload.incomeBand,
      occupation: rawPayload.occupation,
      source_of_income: rawPayload.sourceOfIncome
    },
    id_back: rawPayload?.backImage,
    id_front: rawPayload.frontImage,
    wallet_type: 'virtual_account'
  }
  return payload
}
