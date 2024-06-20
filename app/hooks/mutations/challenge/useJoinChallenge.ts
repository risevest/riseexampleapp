import { joinChallenge } from 'app/api/challenges'
import { useInvalidateCache } from 'app/hooks'
import { useMutation } from 'react-query'

export const useJoinChallenge = () => {
  const { invalidatePlans, invalidateJoinedChallenges } = useInvalidateCache()

  return useMutation(joinChallenge, {
    mutationKey: 'joinChallenge',
    onSuccess: async (data) => {
      invalidatePlans()
      invalidateJoinedChallenges()
      return data
    }
  })
}
