import { WALLET_QUERY_KEYS } from 'app/domains/wallet/constants'
import { TRANSACTIONS_QUERY_KEYS } from 'app/domains/wallet/transactions/constants'
import { updateUser } from 'app/redux/user/actionCreators'
import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'

import { WALLET_QUERY_CONFIG } from './wallet/useWallet'

interface InvalidateOptions {
  planId?: PlanId
  transactionId?: number | string
}

export const useInvalidateCache = (options?: InvalidateOptions) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  const { planId, transactionId } = options || {}

  const invalidatePlanCache = React.useCallback(
    () => planId && queryClient.invalidateQueries(['planDetails', planId]),
    [planId, queryClient]
  )

  const invalidateWallet = React.useCallback(() => {
    queryClient.invalidateQueries(WALLET_QUERY_CONFIG.queryKey)
    queryClient.invalidateQueries(WALLET_QUERY_KEYS.getWallets)
  }, [queryClient])

  const invalidateWalletStats = React.useCallback(() => {
    return queryClient.invalidateQueries('walletStats')
  }, [queryClient])

  const invalidateAccountNumbers = React.useCallback(
    () => queryClient.invalidateQueries('accountNumbers'),
    [queryClient]
  )

  const invalidatePlans = React.useCallback(() => {
    queryClient.invalidateQueries('plans')
    queryClient.invalidateQueries('infinitePlans')
  }, [queryClient])

  const invalidateJoinedChallenges = React.useCallback(() => {
    queryClient.invalidateQueries('joinedChallenges')
  }, [queryClient])

  const invalidateNotifications = React.useCallback(
    () => queryClient.invalidateQueries('infiniteNotifications'),
    [queryClient]
  )
  const invalidateUserBankAccounts = React.useCallback(
    () => queryClient.invalidateQueries('bankAccounts'),
    [queryClient]
  )

  const invalidateTransactions = React.useCallback(() => {
    queryClient.invalidateQueries(TRANSACTIONS_QUERY_KEYS.walletTransactions)
    queryClient.invalidateQueries(TRANSACTIONS_QUERY_KEYS.walletTransaction)
  }, [queryClient])

  const invalidateTransactionCache = React.useCallback(
    () =>
      transactionId &&
      queryClient.invalidateQueries(['transactionDetails', transactionId]),
    [transactionId, queryClient]
  )

  const invalidateUserCache = React.useCallback(
    (user?: RiseUser) => {
      queryClient.invalidateQueries('user')
      user && dispatch(updateUser(user))
    },
    [dispatch, queryClient]
  )

  const invalidateWallets = React.useCallback(() => {
    queryClient.invalidateQueries(WALLET_QUERY_KEYS.getWallets)
  }, [queryClient])

  const invalidatePlanRelatedCache = () =>
    Promise.all(
      [
        invalidatePlans,
        invalidatePlanCache,
        invalidateWallet,
        invalidateWalletStats,
        invalidateNotifications,
        invalidateJoinedChallenges
      ].map((fn) => fn())
    )

  const invalidateTransactionRelatedCache = () =>
    Promise.all(
      [
        invalidateWallet,
        invalidateWalletStats,
        invalidateTransactions,
        invalidateTransactionCache,
        invalidateWallets
      ].map((fn) => fn())
    )

  return {
    invalidateAccountNumbers,
    invalidateJoinedChallenges,
    invalidateNotifications,
    invalidatePlanCache,
    invalidatePlanRelatedCache,
    invalidatePlans,
    invalidateTransactionRelatedCache,
    invalidateTransactions,
    invalidateUserBankAccounts,
    invalidateUserCache,
    invalidateWallet,
    invalidateWalletStats
  }
}
