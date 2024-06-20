import { LeaderboardData } from './dispatchers'
import { CHALLENGE_TYPES } from './types'

export const fetchLeaderboardActionSuccess = (
  leaderboardData: LeaderboardData
) => ({
  leaderboardData,
  type: CHALLENGE_TYPES.GET_LEADERBOARD_SUCCESS
})
