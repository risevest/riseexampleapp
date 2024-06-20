import { createSelector } from 'reselect'

import { AppState, MiscStore } from '../types'

function selectMisc(state: AppState): MiscStore {
  return state.misc
}

export const getLastPlayedVideoId = createSelector(
  selectMisc,
  (onboardingSeries) => onboardingSeries.lastPlayedVideo
)
