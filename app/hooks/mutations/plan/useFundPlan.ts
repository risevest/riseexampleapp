import { fundPlan } from 'app/api'
import { useDisplayMessage, useInvalidateCache } from 'app/hooks'
import { useMutation } from 'react-query'

export const useFundPlanMutation = (planId: PlanId) => {
  const { invalidatePlanRelatedCache } = useInvalidateCache({ planId })
  const { displayServerError } = useDisplayMessage()

  const mutation = useMutation(
    (payload: { amount: number }) =>
      fundPlan({ ...payload, userPlanId: planId }),
    {
      mutationKey: ['fundPlan', planId],
      onError: (error) => {
        displayServerError(error)
      },
      onSuccess: async (plan) => {
        invalidatePlanRelatedCache()
        return plan
      }
    }
  )
  return mutation
}
