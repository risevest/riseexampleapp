import { createBuildWealthPlan, createPlan } from 'app/api'
import { logEvent } from 'app/utils/analytics/fbsdk'
import { useMutation } from 'react-query'

import { useInvalidateCache } from '../../queries/useInvalidateCache'

export const useCreatePlanMutation = () => {
  const { invalidatePlanRelatedCache } = useInvalidateCache()
  return useMutation(createPlan, {
    mutationKey: 'createPlan',
    onSuccess: async (data) => {
      invalidatePlanRelatedCache()
      return data
    }
  })
}

export const useCreateBuildWealthPlanMutation = () => {
  const { invalidatePlanRelatedCache } = useInvalidateCache()
  return useMutation((data: object) => createBuildWealthPlan(data), {
    mutationKey: 'createBuildWealthPlan',
    onSuccess: async (data) => {
      logEvent('create_plan')
      invalidatePlanRelatedCache()
      return data
    }
  })
}
