import { createSelector } from 'reselect'

import { AppState } from '../types'
import { VirtualAccountState } from './virtual-account.types'

function selectVirtualAccount(state: AppState): VirtualAccountState {
  return state.virtualAccount
}

export const getRequestDetails = createSelector(
  selectVirtualAccount,
  (onboardingSeries) => onboardingSeries.requestDetails
)
