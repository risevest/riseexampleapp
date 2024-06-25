import { editPlan } from 'app/api'
import { useInvalidateCache } from 'app/hooks'
import { useMutation } from '@tanstack/react-query'

export const useEditPlanMutation = (planId: PlanId) => {
  const { invalidatePlanRelatedCache } = useInvalidateCache({ planId })
  const mutation = useMutation(
    (payload: Partial<IPlan>) => editPlan({ payload, planId }),
    {
      mutationKey: ['editPlan', planId],
      onSuccess: async (data) => {
        invalidatePlanRelatedCache()
        return data
      }
    }
  )
  return { ...mutation }
}
