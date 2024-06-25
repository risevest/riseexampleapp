import { fetchJoinedChallenges } from 'app/api/challenges'
import { transformQueryStatusToRiseStatus } from 'app/utils/utilFunctions'
import { useQuery } from '@tanstack/react-query'

export const useChallengesQuery = () => {
  const { status, data, ...query } = useQuery<ChallengeData[]>(
    'joinedChallenges',
    () => fetchJoinedChallenges()
  )
  const joinedChallenges = (data ?? []) as ChallengeData[]

  return {
    ...query,
    joinedChallenges,
    requestStatus: transformQueryStatusToRiseStatus(status)
  }
}
