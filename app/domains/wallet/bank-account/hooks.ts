import { useDisplayMessage, useInvalidateCache } from 'app/hooks'
import { setUserProperties } from 'app/utils/analytics'
import amplitude from 'app/utils/analytics/amplitude'
import { AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { invalidateWalletRelatedQueries } from '../hooks'
import { WithdrawalMethod } from '../transaction-request'
import { Currency } from '../types'
import {
  deleteBankAccount,
  fundWithBankAccount,
  getBanks,
  getSavedBankAccounts,
  saveBankAccount,
  verifyBankAccount,
  withdrawWithBankAccount
} from './api'
import { BANK_ACCOUNTS_QUERY_KEYS } from './constants'
import {
  Bank,
  BankAccountDetails,
  FundBankDetailsPayload,
  SavedBankAccount,
  ServerBank,
  ServerBankAccountDetails,
  ServerSavedBankAccount,
  ServerTransactionRequestsResult,
  VerifiedBankAccount,
  VerifyBankAccountPayload
} from './types'

// extraction function
function extractSavedBankAccounts(
  bankAccounts: ServerSavedBankAccount[]
): SavedBankAccount[] {
  const getAddress = (bankAccount: ServerSavedBankAccount) => {
    if (bankAccount.details.currency === 'ngn') return

    const { house_number, street_name, city, postal_code } =
      bankAccount.details.address

    return `${house_number}, ${street_name}, ${city}, ${bankAccount.details.country}, ${postal_code}`
  }
  return bankAccounts.map((bankAccount: ServerSavedBankAccount) => ({
    accountName: bankAccount.details.account_name,
    accountNumber: bankAccount.details.account_number,
    address: getAddress(bankAccount),
    bankName: bankAccount.details.bank_name,
    createdAt: bankAccount.created_at,
    currency: bankAccount.details.currency,
    id: bankAccount.id
  }))
}

function extractBanks(banks: ServerBank[]): Bank[] {
  return banks.map((bank) => ({
    id: bank.code,
    name: bank.name
  }))
}

function extractVerifiedBankAccount(
  bankAccount: VerifiedBankAccount<ServerBankAccountDetails>
): VerifiedBankAccount {
  if (!bankAccount.valid) {
    return { valid: bankAccount.valid } as VerifiedBankAccount
  }
  return {
    details: {
      accountName: bankAccount.details.account_name,
      accountNumber: bankAccount.details.account_number,
      bankCode:
        bankAccount.details.currency === 'ngn'
          ? bankAccount.details.bank_code
          : undefined,
      bankId:
        bankAccount.details.currency === 'ngn'
          ? bankAccount.details.bank_id
          : undefined,
      bankName: bankAccount.details.bank_name
    },
    token: bankAccount.token,
    valid: bankAccount.valid
  }
}

function extractTransactionRequestResult(
  result: ServerTransactionRequestsResult
) {
  return {
    authenticationUrl: result.authentication_url,
    id: result.id,
    local_amount: result.local_amount,
    providerMetadata: {
      buyRate: result?.provider_metadata?.buy_rate,
      reference: result?.provider_metadata?.reference
    },
    reference: result.reference
  }
}

// hooks
export function useAddBankAccount() {
  const queryClient = useQueryClient()
  const { displayServerError } = useDisplayMessage()
  return useMutation({
    mutationFn: saveBankAccount,
    mutationKey: BANK_ACCOUNTS_QUERY_KEYS.saveBankAccount,
    onError: (error) => {
      displayServerError(error)
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries([
        BANK_ACCOUNTS_QUERY_KEYS.savedBankAccounts,
        result.details.currency
      ])
    }
  })
}

export function isBankAccountWallet<T extends WithdrawalMethod>(wallet: T) {
  return wallet.walletType === 'bank_account'
}

const setUserHasBankAccountProps = (savedBankAccounts: []) => {
  setUserProperties({ has_bank_account: savedBankAccounts?.length > 0 })
}

export function useBankAccounts(currency?: Currency) {
  currency = currency?.toLowerCase() as Currency
  const { data, ...query } = useQuery(
    [BANK_ACCOUNTS_QUERY_KEYS.savedBankAccounts, currency],
    () => getSavedBankAccounts(currency),
    {
      onSuccess: (resp) => {
        amplitude.setUserProperties({
          'Number of Bank Accts Added': resp?.length ?? 0
        })
        setUserHasBankAccountProps(resp || [])
      }
    }
  )

  return {
    savedBankAccounts: extractSavedBankAccounts(data || []),
    ...query
  }
}

export function useDeleteBankAccount() {
  const queryClient = useQueryClient()
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: deleteBankAccount,
    mutationKey: BANK_ACCOUNTS_QUERY_KEYS.deleteSavedBankAccount,
    onError: (error) => {
      displayServerError(error)
    },
    onSuccess: (result) =>
      queryClient.invalidateQueries([
        BANK_ACCOUNTS_QUERY_KEYS.savedBankAccounts,
        result.details.currency
      ])
  })
}

export function useWithDrawWithBankAccount() {
  const { displayServerError } = useDisplayMessage()
  return useMutation({
    mutationFn: withdrawWithBankAccount,
    mutationKey: BANK_ACCOUNTS_QUERY_KEYS.withdrawWithBankAccount,
    onError: (error) => {
      displayServerError(error)
    },
    onSuccess: async () => {
      await invalidateWalletRelatedQueries()
    }
  })
}

export function useFundWithBankAccount() {
  const { invalidateTransactions } = useInvalidateCache()
  const { displayServerError } = useDisplayMessage()
  return useMutation({
    mutationFn: (details: FundBankDetailsPayload) =>
      fundWithBankAccount(details).then(extractTransactionRequestResult),
    mutationKey: BANK_ACCOUNTS_QUERY_KEYS.fundWithBankAccount,
    onError: (error) => {
      displayServerError(error)
    },
    onSuccess: async () => {
      await invalidateTransactions()
    }
  })
}

export function useGetBanks(country?: string) {
  const { data, ...query } = useQuery(
    [BANK_ACCOUNTS_QUERY_KEYS.banks, country],
    () => getBanks(country)
  )

  return {
    banks: extractBanks(data || []),
    ...query
  }
}

export function useVerifyBankAccount() {
  const { displayError, displayServerError } = useDisplayMessage()
  return useMutation<
    VerifiedBankAccount<BankAccountDetails>,
    AxiosError,
    VerifyBankAccountPayload
  >({
    mutationFn: (details) =>
      verifyBankAccount(details).then(extractVerifiedBankAccount),
    mutationKey: BANK_ACCOUNTS_QUERY_KEYS.verifyBankAccount,
    onError: (error: AxiosError) => {
      const code = error.response?.status
      if (!!code && code === 422) {
        displayError(
          'Error',
          'We cannot find any bank account with your account number'
        )
        return
      }
      displayServerError(error)
    }
  })
}
