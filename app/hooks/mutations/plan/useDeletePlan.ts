import { deletePlan } from 'app/api'
import { useMutation } from 'react-query'

import { useInvalidateCache } from '../../queries'

export const useDeletePlanMutation = () => {
  const { invalidatePlanRelatedCache } = useInvalidateCache()
  return useMutation(deletePlan, {
    mutationKey: 'deletePlan',
    onSuccess: async (data) => {
      invalidatePlanRelatedCache()
      return data
    }
  })
}
