import { useDisplayMessage, useInvalidateCache } from 'app/hooks'
import { queryClient } from 'app/rq'
import { convertKeysToCamelCase } from 'app/utils/utilFunctions'
import { useMutation, useQuery } from '@tanstack/react-query'

import { WalletMethod } from '../transaction-request'
import {
  deleteMomoWallet,
  fundWithMomo,
  getMomoNetworks,
  getMomoWallets,
  saveMomoWallet,
  withdrawWithMomo
} from './api'
import { MOMO_QUERY_KEYS } from './constants'
import { SavedMomoWallet, ServerMomoWallet } from './types'

function extractSavedMomoWallet(
  momoWallets: ServerMomoWallet[]
): SavedMomoWallet[] {
  return momoWallets.map((momowallet: ServerMomoWallet) => ({
    id: momowallet.id,
    name: momowallet.details.name,
    network: momowallet.details.network,
    networkName: momowallet.details.network_name,
    number: momowallet.details.phone_number
  }))
}

export function useDeleteMomoWallet() {
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: (id: string) => deleteMomoWallet(id),
    mutationKey: MOMO_QUERY_KEYS.deleteMomoWallet,
    onError: (error) => {
      displayServerError(error)
    },
    onSuccess: () => queryClient.invalidateQueries(MOMO_QUERY_KEYS.momoWallets)
  })
}

export function useSaveMomoWallet() {
  const { displayServerError } = useDisplayMessage()
  return useMutation({
    mutationFn: saveMomoWallet,
    mutationKey: MOMO_QUERY_KEYS.saveMomoWallet,
    onError: (error) => {
      displayServerError(error)
    },
    onSuccess: () => queryClient.invalidateQueries(MOMO_QUERY_KEYS.momoWallets)
  })
}

export function useMomoWallets() {
  const { data, ...query } = useQuery({
    queryFn: getMomoWallets,
    queryKey: MOMO_QUERY_KEYS.momoWallets
  })

  return {
    ...query,
    data: extractSavedMomoWallet(data || [])
  }
}

export function useFundWithMomo() {
  const { displayServerError } = useDisplayMessage()
  const { invalidateTransactionRelatedCache } = useInvalidateCache()

  return useMutation({
    mutationFn: fundWithMomo,
    mutationKey: MOMO_QUERY_KEYS.fundWithMomo,
    onError: (error) => {
      displayServerError(error)
    },
    onSuccess: invalidateTransactionRelatedCache
  })
}

export function useWithdrawWithMomo() {
  const { invalidateTransactionRelatedCache } = useInvalidateCache()
  const { displayServerError } = useDisplayMessage()
  return useMutation({
    mutationFn: withdrawWithMomo,
    mutationKey: MOMO_QUERY_KEYS.withdrawWithMomoWallet,
    onError: (error) => displayServerError(error),
    onSettled: invalidateTransactionRelatedCache
  })
}

export function isMomoWallet<T extends WalletMethod>(wallet: T) {
  return wallet.walletType === 'mobile_money'
}

export function useMomoNetworks(
  entity: 'withdrawal_method' | 'funding_method',
  currency: string
) {
  const { data, ...query } = useQuery({
    queryFn: () => getMomoNetworks(entity),
    queryKey: MOMO_QUERY_KEYS.getMomoNetworks
  })

  return {
    networks: !!data
      ? data
          .filter((fundingMethod) => fundingMethod.currency === currency)
          .map((fundingMethod) => convertKeysToCamelCase(fundingMethod))
      : [],
    ...query
  }
}
