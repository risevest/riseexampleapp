import { useDisplayMessage, useInvalidateCache } from 'app/hooks'
import { queryClient } from 'app/rq'
import { useMutation, useQuery } from '@tanstack/react-query'

import {
  getAllRates,
  getDefaultWallet,
  getEarnings,
  getRates,
  getWallets,
  setDefaultWallet,
  transferToWallet
} from './api'
import { WALLET_QUERY_KEYS } from './constants'
import {
  Currency,
  CurrencyRate,
  EarningsPayload,
  EarningsSummary,
  EarningsSummaryServer,
  ServerCurrency,
  ServerCurrencyRate,
  TransferToWalletPayload,
  Wallet,
  WalletServer
} from './types'

// helper functions
export function toServerCurrency(currency: string): ServerCurrency {
  return String(currency).toLowerCase() as ServerCurrency
}

export function toUICurrency(serverCurrency: string): Currency {
  return String(serverCurrency).toUpperCase() as Currency
}

export function extractRates(data?: ServerCurrencyRate[]): CurrencyRate[] {
  return (data ?? []).map((rate: ServerCurrencyRate) => ({
    buyRate: rate.buy_rate,
    currencyType: rate.currency_type,
    name: rate.name,
    network: rate.network,
    sellRate: rate.sell_rate,
    symbol: toUICurrency(rate.symbol)
  }))
}

export function extractEarningsSummary(
  data: EarningsSummaryServer
): EarningsSummary {
  return {
    percentageIncrease: data?.percentage_increase,
    periodEarnings: data?.period_earnings,
    periodEndDate: data?.period_end_date,
    periodStartDate: data?.period_start_date,
    planFunding: data?.plan_funding,
    planWithdrawal: data?.plan_withdrawal,
    totalPlans: data?.total_plans,
    walletFund: data?.wallet_fund
  }
}

function extractWallets(data: WalletServer[]): Wallet[] {
  return data?.map((wallet) => ({
    balance: wallet?.balance,
    createdAt: wallet?.created_at,
    currency: wallet?.currency,
    deletedAt: wallet?.deleted_at,
    id: wallet?.id,
    interest: wallet?.interest,
    interestEnabled: wallet?.interest_enabled,
    isDefault: wallet?.is_default,
    ownerId: wallet?.owner_id,
    updatedAt: wallet?.updated_at
  }))
}

export function useRates(currency: Currency) {
  const { data, ...query } = useQuery({
    queryFn: () => getRates(currency),
    queryKey: WALLET_QUERY_KEYS.rates(currency)
  })

  return {
    ...query,
    rate: extractRates(data)?.[0] ?? {}
  }
}

export function useAllRates() {
  const { data, ...query } = useQuery({
    queryFn: () => getAllRates(),
    queryKey: WALLET_QUERY_KEYS.allRates
  })

  return {
    ...query,
    rates: extractRates(data)
  }
}

export function useGetEarningsSummary() {
  const { displayServerError } = useDisplayMessage()

  return useMutation(
    (payload: EarningsPayload) => {
      return getEarnings(payload.startDate, payload.endDate)
    },
    {
      mutationKey: WALLET_QUERY_KEYS.earningsSummary,
      onError: (error) => {
        displayServerError(error)
      }
    }
  )
}

export function useGetDefaultWallet() {
  const { displayServerError } = useDisplayMessage()

  const { data, ...query } = useQuery({
    onError: (error) => displayServerError(error),
    queryFn: () => getDefaultWallet(),
    queryKey: WALLET_QUERY_KEYS.allRates
  })

  return {
    data,
    ...query
  }
}

export function useSetDefaultWallet() {
  const { displayServerError } = useDisplayMessage()

  return useMutation(
    (payload: string) => {
      return setDefaultWallet(payload)
    },
    {
      mutationKey: WALLET_QUERY_KEYS.defaultWallet,
      onError: (error) => {
        displayServerError(error)
      },
      onSuccess: () =>
        queryClient.invalidateQueries(WALLET_QUERY_KEYS.getWallets)
    }
  )
}

export function useGetWallets() {
  const { displayServerError } = useDisplayMessage()

  const { data, ...query } = useQuery({
    onError: (err) => displayServerError(err),
    queryFn: () => getWallets(),
    queryKey: WALLET_QUERY_KEYS.getWallets
  })

  return {
    ...query,
    wallets: extractWallets(data || []) ?? []
  }
}

export function useTransferToWallet() {
  const { displayServerError } = useDisplayMessage()
  const { invalidateTransactionRelatedCache } = useInvalidateCache()

  return useMutation(
    (payload: TransferToWalletPayload) => {
      return transferToWallet(payload)
    },
    {
      mutationKey: WALLET_QUERY_KEYS.transferToWallet,
      onError: (error) => {
        displayServerError(error)
      },
      onSuccess: () => invalidateTransactionRelatedCache()
    }
  )
}

export function invalidateWalletRelatedQueries() {
  queryClient.invalidateQueries(WALLET_QUERY_KEYS.getWallets)
  queryClient.invalidateQueries('infiniteTransactions')
  queryClient.invalidateQueries('infiniteNotifications')
}
