import { useCampaigns } from 'app/domains/campaigns/hooks'
import { usePlans } from 'app/domains/plans'
import { WITHDRAWAL_METHODS_QUERY_CONFIG } from 'app/domains/wallet'
import { getWallets } from 'app/domains/wallet/api'
import { WALLET_QUERY_KEYS } from 'app/domains/wallet/constants'
import { useWalletStats } from 'app/hooks/queries/wallet/useWallet'
import React from 'react'
import { useQueries } from 'react-query'

import { RATES_QUERY_CONFIG, USE_USER_CONFIG, usePopulateUser } from './queries'
import { useToggle } from './useToggle'

export const useSetupState = () => {
  const populate = usePopulateUser()
  const { refetch: refetchPlans } = usePlans()
  const { refetch: refetchWalletStats } = useWalletStats()
  const [isRefreshing, { on: setRefreshingOn, off: setRefreshingOff }] =
    useToggle(false)
  const { refetch: refetchCampaigns } = useCampaigns()
  const queries = useQueries([
    // user
    { ...USE_USER_CONFIG, onSuccess: populate },
    // wallet
    {
      queryFn: getWallets,
      queryKey: WALLET_QUERY_KEYS.getWallets
    },
    // rates
    RATES_QUERY_CONFIG,
    // WITHDRAWAL METHODS
    // @ts-expect-error error from assigning?
    WITHDRAWAL_METHODS_QUERY_CONFIG
  ])

  const retryFetch = React.useCallback(() => {
    setRefreshingOn()
    return Promise.all([
      ...queries.map((query) => query.refetch?.()),
      refetchPlans(),
      refetchCampaigns(),
      refetchWalletStats()
    ]).finally(() => {
      setRefreshingOff()
    })
  }, [
    setRefreshingOn,
    queries,
    refetchPlans,
    refetchCampaigns,
    refetchWalletStats,
    setRefreshingOff
  ])

  return {
    isRefreshing,
    queries,
    retryFetch
  }
}
