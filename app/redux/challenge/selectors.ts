import { createSelector } from 'reselect'

import { AppState } from '../types'

const selectChallenge = (state: AppState) => state.challenge

export const getChallengeBreakdown = createSelector(
  selectChallenge,
  (challenge) => challenge?.breakdown ?? []
)
