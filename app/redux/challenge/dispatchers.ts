import instance from 'app/utils/axios'

import { setError } from '../error/actionCreators'
import { updatePlanAmountSuccessAction } from '../plan/actionCreators'
import { fetchLeaderboardActionSuccess } from './actionCreators'
import { CHALLENGE_TYPES } from './types'

export type LeaderboardData = {
  leaderboard: {
    netFunded: string
    nickname: string
    rank: string
    userId: number
  }[]
  totalRegistered: number
}

export const fetchChallengeBreakdownDispatcher = (name: string) => {
  return (dispatch: any) => {
    dispatch({ type: CHALLENGE_TYPES.GET_BREAKDOWN_REQUEST })
    return instance
      .get(`/challenges/break-down/?name=${name}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            data: response.data.data,
            type: CHALLENGE_TYPES.GET_BREAKDOWN_SUCCESS
          })
        }
      })
      .catch((error) => {
        dispatch(setError('Challenge Error', error))
        dispatch({ type: CHALLENGE_TYPES.GET_BREAKDOWN_ERROR })
      })
  }
}

export const fundChallengeDispatcher = (data: {
  name: string
  periods: { amount: number; period: number }[]
  planId: number
}) => {
  return (dispatch: any) => {
    dispatch({ type: CHALLENGE_TYPES.FUND_CHALLENGE_REQUEST })
    return instance
      .post('/challenges/fund', data)
      .then((response) => {
        if (response.status === 200) {
          const amountFunded = data.periods.reduce(
            (acc, currVal) => Number(acc) + Number(currVal.amount),
            0
          )
          dispatch({
            data: data.periods,
            type: CHALLENGE_TYPES.FUND_CHALLENGE_SUCCESS
          })
          dispatch(
            updatePlanAmountSuccessAction(
              data.planId,
              amountFunded,
              'credit-plan'
            )
          )

          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(setError('Fund Challenge Error', error))
        dispatch({ type: CHALLENGE_TYPES.FUND_CHALLENGE_ERROR })
      })
  }
}

export const getLeaderboardDispatcher = (name: string) => {
  return (dispatch: any) => {
    dispatch({ type: CHALLENGE_TYPES.GET_LEADERBOARD_REQUEST })
    return instance
      .get(`/challenges/leaderboard?name=${name}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchLeaderboardActionSuccess(response.data.data))
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(setError('Leaderboard Error', error))
        dispatch({ type: CHALLENGE_TYPES.GET_LEADERBOARD_ERROR })
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const getJoinedChallenges = () => {
  return (dispatch: any) => {
    dispatch({ type: CHALLENGE_TYPES.GET_JOINED_CHALLENGES_REQUEST })
    return instance
      .get('/challenges/joined-challenges')
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            data: response.data.data,
            type: CHALLENGE_TYPES.GET_JOINED_CHALLENGES_SUCCESS
          })

          return {
            data: response.data.data as ChallengeData[],
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(setError('Challenge Error', error))
        dispatch({ type: CHALLENGE_TYPES.GET_JOINED_CHALLENGES_ERROR })
        return {
          requestStatus: 'failed'
        }
      })
  }
}
