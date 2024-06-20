import { useDisplayMessage, useInvalidateCache } from 'app/hooks'
import { groupBy } from 'lodash'
import { useMutation, useQuery } from 'react-query'

import { toUICurrency } from '../hooks'
import { Currency } from '../types'
import {
  cancelTransaction,
  confirmTransaction,
  confirmVolumeTransaction,
  getFundingMethods,
  getWithdrawalMethods
} from './api'
import { TRANSACTION_REQUEST_QUERY_KEYS } from './constants'
import {
  FeeValue,
  FundingMethod,
  Grade,
  ServerFeeType,
  ServerFeeValue,
  ServerFundingMethod,
  ServerGrade,
  ServerWithdrawalMethod,
  WalletMethod,
  WithdrawalMethod
} from './types'

export function toUIFeeValue(feeValue: ServerFeeValue): FeeValue {
  if (typeof feeValue === 'number') {
    return feeValue
  } else {
    return feeValue?.map((fee: ServerGrade) => ({
      feeType: fee?.fee_type,
      feeValue: fee?.fee_value,
      threshold: fee?.threshold
    }))
  }
}

export function extractFundingMethods(
  data?: ServerFundingMethod[]
): FundingMethod[] {
  return (data ?? []).map((fundingMethod) => ({
    collectionProvider: fundingMethod.collection_provider,
    currency: toUICurrency(fundingMethod.currency),
    currencySymbol: fundingMethod?.currency_symbol,
    currencyTitle: fundingMethod?.currency_name,
    feeType: fundingMethod?.fee_type,
    feeValue: toUIFeeValue(fundingMethod?.fee_value),
    isEnabled: fundingMethod.is_enabled,
    limit: fundingMethod?.limit,
    name: fundingMethod.wallet_type,
    network: fundingMethod?.network,
    networkName: fundingMethod?.network_name,
    timeline: fundingMethod.timeline,
    walletType: fundingMethod?.wallet_type
  }))
}

function extractWithdrawalMethods(
  data: ServerWithdrawalMethod[]
): WithdrawalMethod[] {
  return data.map((withdrawalMethod: ServerWithdrawalMethod) => ({
    currency: toUICurrency(withdrawalMethod.currency),
    currencyName: withdrawalMethod.currency_name,
    currencySymbol: withdrawalMethod.currency_symbol,
    feeType: withdrawalMethod.fee_type,
    feeValue: toUIFeeValue(withdrawalMethod.fee_value),
    isEnabled: withdrawalMethod.is_enabled,
    limit: withdrawalMethod?.limit,
    name: withdrawalMethod.wallet_type,
    network: withdrawalMethod.network,
    networkName: withdrawalMethod.network_name,
    timeline: withdrawalMethod.timeline,
    walletType: withdrawalMethod.wallet_type
  }))
}

export function getWalletsIsEnabled(wallets: WalletMethod[]): boolean {
  if (wallets.length === 0) {
    return false
  }
  return wallets.every((wallet) => wallet.isEnabled)
}

export const useCancelTransaction = (id: string) => {
  const { invalidateTransactionRelatedCache } = useInvalidateCache({
    transactionId: id
  })

  return useMutation({
    mutationFn: () => cancelTransaction(id),
    mutationKey: TRANSACTION_REQUEST_QUERY_KEYS.cancelTransaction(id),
    onSuccess: async (data) => {
      invalidateTransactionRelatedCache()
      return data
    }
  })
}

export function useConfirmTransaction() {
  const { displayServerError } = useDisplayMessage()
  const { invalidateTransactionRelatedCache } = useInvalidateCache()

  return useMutation({
    mutationFn: (transactionID: string) => confirmTransaction(transactionID),
    mutationKey: TRANSACTION_REQUEST_QUERY_KEYS.confirmTransaction,
    onError: (err) => displayServerError(err),
    onSuccess: () => invalidateTransactionRelatedCache()
  })
}

export function useConfirmVolumeTransaction() {
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: confirmVolumeTransaction,
    mutationKey: TRANSACTION_REQUEST_QUERY_KEYS.confirmTransaction,
    onError: (err) => displayServerError(err)
  })
}

export function useFundingMethods(wallet?: Currency) {
  const { data, ...query } = useQuery({
    queryFn: () => getFundingMethods(wallet || 'USD'),
    queryKey: [TRANSACTION_REQUEST_QUERY_KEYS.fundingMethods, wallet]
  })

  const rawFundingMethods = extractFundingMethods(data)

  // remove when fincra is ready
  const fundingMethods = rawFundingMethods?.filter((fundingMethod) => {
    if (
      fundingMethod.currency !== 'NGN' &&
      fundingMethod.walletType === 'virtual_account'
    ) {
      return false
    }
    return true
  })

  const fundingMethodsByCurrency = groupBy(fundingMethods, 'currency')

  const fundingMethodsByCurrencyMap: FundingMethod[] = Object.keys(
    fundingMethodsByCurrency
  ).map((k) => {
    const wallets = fundingMethodsByCurrency[k]
    const [sample] = wallets
    return {
      ...sample,
      isEnabled: getWalletsIsEnabled(wallets)
    }
  })

  return {
    ...query,
    fundingMethods,
    fundingMethodsByCurrency,
    fundingMethodsByCurrencyMap
  }
}

export function getWalletLimit(
  wallets: WalletMethod | WalletMethod[],
  filterArgs?: Pick<WalletMethod, 'currency' | 'walletType'>
): number | undefined {
  if (Array.isArray(wallets)) {
    if (!filterArgs) return
    return wallets.find((method) => {
      return (
        method.currency === filterArgs.currency &&
        method.walletType === filterArgs.walletType
      )
    })?.limit
  }
  return wallets.limit
}

export const WITHDRAWAL_METHODS_QUERY_CONFIG = {
  queryFn: getWithdrawalMethods,
  queryKey: TRANSACTION_REQUEST_QUERY_KEYS.withdrawalMethods
}

export function useWithdrawalMethods(wallet: Currency) {
  const { data, ...query } = useQuery({
    queryFn: () => getWithdrawalMethods(wallet ?? 'USD'),
    queryKey: [TRANSACTION_REQUEST_QUERY_KEYS.withdrawalMethods, wallet]
  })

  const withdrawalMethods = extractWithdrawalMethods(data || [])
  const withdrawalMethodsByCurrency = groupBy(
    withdrawalMethods,
    'currencySymbol'
  )

  const withdrawalMethodsByCurrencyMap: WithdrawalMethod[] = Object.keys(
    withdrawalMethodsByCurrency
  ).map((k) => {
    const wallets = withdrawalMethodsByCurrency[k]
    const [sample] = wallets
    return {
      ...sample,
      isEnabled: getWalletsIsEnabled(wallets)
    }
  })

  return {
    withdrawalMethods,
    withdrawalMethodsByCurrency,
    withdrawalMethodsByCurrencyMap,
    ...query
  }
}

export function calculateProcessingFee(
  amount: number,
  feeType: ServerFeeType,
  feeValue: FeeValue,
  currency?: string
): number {
  switch (feeType) {
    case 'flat':
      return Number(feeValue)
    case 'percentage': {
      let fee = (Number(feeValue) / 100) * amount
      if (currency === 'KES') {
        const amountPlusFee = fee + amount
        const rounded = Math.ceil(amountPlusFee)
        fee = rounded - amount
      }
      return Number(fee.toFixed(2))
    }
    case 'graded': {
      const fee = (feeValue as Grade[]).find((item) => {
        if (item.threshold && amount < item.threshold) {
          return item
        } else if (!item.threshold) {
          return item
        }
      })
      return fee ? calculateProcessingFee(amount, fee.feeType, fee.feeValue) : 0
    }
    default:
      return 0
  }
}
