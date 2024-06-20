import { setPlanImages } from 'app/utils/getPlanImage'
import { createSelector } from 'reselect'

import { AppState } from '../types'

export const selectPlan = (state: AppState) => state?.plan

export const selectAssetClasses = createSelector(
  selectPlan,
  (plan) => (plan.assetClasses ?? []) as IAssetClass[]
)

export const selectGoalPlans = createSelector(
  selectPlan,
  (plan) => (plan.goalPlans ?? []) as GoalPlanData[]
)

export const selectTempPlanData = (state: AppState, key?: string) => {
  if (key) {
    return state.plan?.tempPlanData?.[key]
  }
  return state.plan?.tempPlanData
}

export const getSingleAssetClass = createSelector(
  selectAssetClasses,
  (state: AppState) => selectTempPlanData(state, 'assetId'),
  (assetClasses, id) => {
    return ((assetClasses || []) as IAssetClass[])?.find(
      (item: any) => item.id === id
    )
  }
)

export const getRequestStatus = (state: AppState) =>
  state.plan?.requestStatus ?? 'idle'

export const selectPlanTypeImages = (category: PlanCategory) =>
  createSelector(
    selectAssetClasses,
    selectGoalPlans,
    (assetClasses, goalPlans) => {
      const plans = category === 'asset-class' ? assetClasses : goalPlans
      return setPlanImages({ category, plans })
    }
  )
