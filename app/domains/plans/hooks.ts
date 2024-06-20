import { useScroller } from 'app/hooks'
import React from 'react'
import { useQuery } from 'react-query'

import {
  fetchAssetBasedPlans,
  fetchGoalBasedPlans,
  fetchMaturedPlans,
  fetchPlans,
  fetchStocks
} from './api'
import { PLANS_QUERY_KEYS } from './constants'
import { Plan } from './types'

export const usePlans = (scrollable?: boolean) => {
  // scrollable represents if this is a scrollable or just a screen that shows the first 10 plans
  // query key has to be different so we don't show the whole users plan on non-scrollable screens
  const { data: plans, ...query } = useScroller<Plan>(
    fetchPlans,
    scrollable ? PLANS_QUERY_KEYS['infinite-plans'] : PLANS_QUERY_KEYS.plans
  )
  const hasPlans = React.useMemo(() => Number(plans.length) > 0, [plans.length])
  return {
    ...query,
    hasPlans,
    plans
  }
}

export const useMaturedPlans = (scrollable?: boolean) => {
  const { data: plans, ...query } = useScroller<Plan>(
    fetchMaturedPlans,
    scrollable
      ? PLANS_QUERY_KEYS['infinite-matured-plans']
      : PLANS_QUERY_KEYS['matured-plans']
  )
  const hasPlans = React.useMemo(() => Number(plans.length) > 0, [plans.length])
  return {
    ...query,
    hasPlans,
    plans
  }
}

export function useGoalBasedPlans() {
  return useQuery({
    queryFn: fetchGoalBasedPlans,
    queryKey: PLANS_QUERY_KEYS['goal-based-plans']
  })
}

export function useAssetBasedPlans() {
  return useQuery({
    queryFn: fetchAssetBasedPlans,
    queryKey: PLANS_QUERY_KEYS['asset-based-plans']
  })
}

export function useStocks() {
  return useQuery({
    queryFn: fetchStocks,
    queryKey: PLANS_QUERY_KEYS.stocks
  })
}
