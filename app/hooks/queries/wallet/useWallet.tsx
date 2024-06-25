import { fetchWallet, fetchWalletStats } from 'app/api'
import { selectUserId } from 'app/redux/user/selector'
import { setUserProperties } from 'app/utils/analytics'
import { transformQueryStatusToRiseStatus } from 'app/utils/utilFunctions'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

export const WALLET_QUERY_KEYS = {
  walletQuery: 'wallet',
  walletStats: 'walletStats'
}

export const WALLET_QUERY_CONFIG = {
  queryKey: WALLET_QUERY_KEYS.walletQuery
}

export const useWalletQuery = () => {
  const userId = useSelector(selectUserId)

  const { status, data, ...query } = useQuery<IRiseWallet>({
    ...WALLET_QUERY_CONFIG,
    queryFn: () => fetchWallet(userId)
  })
  const wallet = (data || {
    balance: 0,
    balanceUsd: 0,
    totalBalance: 0
  }) as IRiseWallet
  const hasFunds = React.useMemo(
    () => Number(wallet.balanceUsd) > 1,
    [wallet.balanceUsd]
  )

  return {
    ...query,
    hasFunds,
    requestStatus: transformQueryStatusToRiseStatus(status),
    status,
    wallet
  }
}

export const useWalletInterestQuery = () => {
  const userId = useSelector(selectUserId)

  const { status, data, ...query } = useQuery<IRiseWallet>({
    queryFn: () => fetchWallet(userId),
    queryKey: ['wallet-interest-query'],
    // react query caches requests but we need this data to be constantly refreshed whenever we need to use it
    refetchOnMount: 'always'
  })
  const wallet = data as IRiseWallet | undefined

  return {
    ...query,
    interestEnabled: wallet?.interestEnabled,
    status
  }
}

export const useWalletStats = () => {
  const { status, data, ...query } = useQuery<RiseWalletStats>(
    WALLET_QUERY_KEYS.walletStats,
    () => fetchWalletStats(),
    {
      onSuccess: (stats) => {
        setUserProperties({ aum: Number(stats.totalBalance) })
      }
    }
  )
  const stats = (data || {
    percentageChange: 0,
    totalBalance: 0
  }) as RiseWalletStats

  return {
    ...query,
    requestStatus: transformQueryStatusToRiseStatus(status),
    stats,
    status
  }
}
