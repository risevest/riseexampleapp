import { LeaderboardData } from './dispatchers'
export enum CHALLENGE_TYPES {
  FUND_CHALLENGE_ERROR = 'challenge/FUND_CHALLENGE_ERROR',
  FUND_CHALLENGE_REQUEST = 'challenge/FUND_CHALLANGE_REQUEST',
  FUND_CHALLENGE_SUCCESS = 'challenge/FUND_CHALLENGE_SUCCESS',

  GET_BREAKDOWN_ERROR = 'challenge/GET_BREAKDOWN_ERROR',
  GET_BREAKDOWN_REQUEST = 'challenge/GET_BREAKDOWN_REQUEST',
  GET_BREAKDOWN_SUCCESS = 'challenge/GET_BREAKDOWN_SUCCESS',

  GET_JOINED_CHALLENGES_ERROR = 'challenge/GET_JOINED_CHALLENGES_ERROR',
  GET_JOINED_CHALLENGES_REQUEST = 'challenge/GET_JOINED_CHALLENGES_REQUEST',
  GET_JOINED_CHALLENGES_SUCCESS = 'challenge/GET_JOINED_CHALLENGES_SUCCESS',

  GET_LEADERBOARD_ERROR = 'challenge/GET_LEADERBOARD_ERROR',
  GET_LEADERBOARD_REQUEST = 'challenge/GET_LEADERBOARD_REQUEST',
  GET_LEADERBOARD_SUCCESS = 'challenge/GET_LEADERBOARD_SUCCESS',

  LISTEN_DELETE_CHALLENGE_SUCCESS = 'challenge/LISTEN_DELETE_CHALLENGE_SUCCESS',
  LISTEN_JOIN_CHALLENGE_SUCCESS = 'challenge/LISTEN_JOIN_CHALLENGE_SUCCESS'
}

export type LeaderBoardResult = {
  data: BreakdownData[]
  type: CHALLENGE_TYPES.GET_BREAKDOWN_SUCCESS
}

export type FundChallengeSuccess = {
  data: {
    amount: number
    period: number
  }[]
  type: CHALLENGE_TYPES.FUND_CHALLENGE_SUCCESS
}

export type FetchJoinedChallengesSuccess = {
  data: ChallengeData[]
  type: CHALLENGE_TYPES.GET_JOINED_CHALLENGES_SUCCESS
}

export type ListenJoinChallengeSuccess = {
  data: IPlan
  type: CHALLENGE_TYPES.LISTEN_JOIN_CHALLENGE_SUCCESS
}

export type FetchLeaderboardSuccess = {
  leaderboardData: LeaderboardData
  type: CHALLENGE_TYPES.GET_LEADERBOARD_SUCCESS
}

export type ListenDeleteChallengeSuccess = {
  plan: IPlan
  type: CHALLENGE_TYPES.LISTEN_DELETE_CHALLENGE_SUCCESS
}

export type ChallengeActions =
  | LeaderBoardResult
  | FundChallengeSuccess
  | FetchJoinedChallengesSuccess
  | ListenJoinChallengeSuccess
  | FetchLeaderboardSuccess
  | ListenDeleteChallengeSuccess
