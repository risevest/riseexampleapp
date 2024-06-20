import { LeaderboardData } from './dispatchers'
import {
  CHALLENGE_TYPES,
  ChallengeActions,
  FetchJoinedChallengesSuccess,
  FetchLeaderboardSuccess,
  FundChallengeSuccess,
  LeaderBoardResult,
  ListenDeleteChallengeSuccess,
  ListenJoinChallengeSuccess
} from './types'

export type ChallengeState = {
  breakdown: BreakdownData[]
  challenges: ChallengeData[]
  leaderboard: LeaderboardData
  requestStatus: RequestStatus
}

const initialState: ChallengeState = {
  breakdown: [],
  challenges: [],
  leaderboard: {
    leaderboard: [],
    totalRegistered: 0
  },
  requestStatus: 'idle'
}

const ACTION: any = {
  [CHALLENGE_TYPES.GET_BREAKDOWN_REQUEST]: (state: ChallengeState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [CHALLENGE_TYPES.GET_BREAKDOWN_SUCCESS]: (
    state: ChallengeState,
    { data }: LeaderBoardResult
  ) => ({
    ...state,
    breakdown: data,
    requestStatus: 'success'
  }),
  [CHALLENGE_TYPES.GET_BREAKDOWN_ERROR]: (state: ChallengeState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [CHALLENGE_TYPES.FUND_CHALLENGE_REQUEST]: (state: ChallengeState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [CHALLENGE_TYPES.FUND_CHALLENGE_SUCCESS]: (
    state: ChallengeState,
    { data }: FundChallengeSuccess
  ) => {
    const breakdown = state.breakdown.map((stateBreakdown) => {
      const findBreakdown = data.find(
        (dt) => dt.period === stateBreakdown.period
      )
      if (findBreakdown) {
        return {
          ...stateBreakdown,
          netFunded:
            Number(stateBreakdown.amount) + Number(findBreakdown.amount)
        }
      }

      return stateBreakdown
    })

    return {
      ...state,
      breakdown,
      requestStatus: 'success'
    }
  },
  [CHALLENGE_TYPES.FUND_CHALLENGE_ERROR]: (state: ChallengeState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [CHALLENGE_TYPES.GET_JOINED_CHALLENGES_REQUEST]: (state: ChallengeState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [CHALLENGE_TYPES.GET_JOINED_CHALLENGES_SUCCESS]: (
    state: ChallengeState,
    { data }: FetchJoinedChallengesSuccess
  ) => ({
    ...state,
    challenges: data,
    requestStatus: 'success'
  }),
  [CHALLENGE_TYPES.GET_JOINED_CHALLENGES_ERROR]: (state: ChallengeState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [CHALLENGE_TYPES.LISTEN_JOIN_CHALLENGE_SUCCESS]: (
    state: ChallengeState,
    { data }: ListenJoinChallengeSuccess
  ) => {
    const updateChallenge: any = {
      challenge: {
        planName: data.name
      },
      challengePlan: data
    }

    return {
      ...state,
      challenges: state.challenges.concat(updateChallenge)
    }
  },
  [CHALLENGE_TYPES.GET_LEADERBOARD_REQUEST]: (state: ChallengeState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [CHALLENGE_TYPES.GET_LEADERBOARD_SUCCESS]: (
    state: ChallengeState,
    { leaderboardData }: FetchLeaderboardSuccess
  ) => ({
    ...state,
    leaderboard: leaderboardData,
    requestStatus: 'success'
  }),
  [CHALLENGE_TYPES.GET_LEADERBOARD_ERROR]: (state: ChallengeState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [CHALLENGE_TYPES.LISTEN_DELETE_CHALLENGE_SUCCESS]: (
    state: ChallengeState,
    { plan }: ListenDeleteChallengeSuccess
  ) => {
    const newChallenges = state.challenges.find(
      (challenge) => challenge.challengePlan.id === plan.id
    )
      ? state.challenges.filter(
          (challenge) => challenge.challengePlan.id !== plan.id
        )
      : state.challenges

    return {
      ...state,
      challenges: newChallenges
    }
  }
}

export const challengeReducer = (
  state = initialState,
  action: ChallengeActions
) => {
  const handler = ACTION[action.type]
  return handler ? handler(state, action) : state
}
