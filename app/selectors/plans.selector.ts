import { AppState } from 'app/redux/types'
import { createSelector } from 'reselect'

export const selectPlan = (state: AppState) => state.plan

export const selectUserPlans = createSelector(
  selectPlan,
  (planSlice) => planSlice?.userPlans?.userPlans ?? []
)

export const selectRequestStatus = createSelector(
  selectPlan,
  (planSlice) => planSlice?.requestStatus ?? 'idle'
)
