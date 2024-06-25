import { withdrawFromPlan, WithdrawToPlanPayload } from 'app/api'
import { useInvalidateCache } from 'app/hooks'
import { useMutation } from '@tanstack/react-query'

export const useWithdrawFromPlanMutation = (planId: PlanId) => {
  const { invalidatePlanRelatedCache } = useInvalidateCache({ planId })

  const mutation = useMutation(
    (data: WithdrawToPlanPayload) => withdrawFromPlan(data),
    {
      mutationKey: ['withdrawPlan', planId],
      onSuccess: async (data) => {
        invalidatePlanRelatedCache()
        return data
      }
    }
  )
  return { ...mutation }
}
