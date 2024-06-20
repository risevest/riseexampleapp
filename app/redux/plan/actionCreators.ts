import { PLANS_ACTION_TYPES } from './types'

export const setInvestmentProfile = (
  investmentProfile: IInvestmentProfile
) => ({
  investmentProfile,
  type: PLANS_ACTION_TYPES.CREATE_INVESTMENT_PROFILE_SUCCESS
})

export const setAssetClassSuggestion = (assetClasses: any) => ({
  assetClasses,
  type: PLANS_ACTION_TYPES.SET_ASSET_CLASS_SUGGESTION
})

export const setBuildWealthPlanAction = (buildWealthPlan: any) => ({
  buildWealthPlan,
  type: PLANS_ACTION_TYPES.CREATE_BUILD_WEALTH_PLAN_SUCCESS
})

export const setAssetClassPlanAction = (assetClassPlan: any) => ({
  assetClassPlan,
  type: PLANS_ACTION_TYPES.CREATE_ASSET_CLASS_PLAN_SUCCESS
})

export const setInvestmentData = (investmentData: any) => ({
  investmentData,
  type: PLANS_ACTION_TYPES.SET_INVESTMENT_DATA
})

export const fetchUserPlanAction = (plan: IPlan) => ({
  plan,
  type: PLANS_ACTION_TYPES.FETCH_USER_PLAN_SUCCESS
})

export const fetchUserPlansAction = (userPlans: IPlan[]) => ({
  type: PLANS_ACTION_TYPES.FETCH_USER_PLANS_SUCCESS,
  userPlans
})

export const savePlanTempData = (tempPlanData: any) => ({
  tempPlanData,
  type: PLANS_ACTION_TYPES.SAVE_PLAN_TEMP_DATA
})

export const resetPlanTempData = () => ({
  type: PLANS_ACTION_TYPES.RESET_PLAN_TEMP_DATA
})

export const fetchInvestmentProfileSuccess = (investmentProfile: any) => ({
  investmentProfile,
  type: PLANS_ACTION_TYPES.FETCH_INVESTMENT_PROFILE_SUCCESS
})

export const getAssetClassesSuccessAction = (assetClasses: any) => ({
  assetClasses,
  type: PLANS_ACTION_TYPES.GET_ASSET_CLASSES_SUCCESS
})

export const fetchBuildWealthPlanSuccessAction = (buildWealthPlan: IPlan) => ({
  buildWealthPlan,
  type: PLANS_ACTION_TYPES.FETCH_BUILD_WEALTH_PLAN_SUCCESS
})

export const editPlanSuccessAction = (plan: IPlan) => ({
  plan,
  type: PLANS_ACTION_TYPES.EDIT_PLAN_SUCCESS
})

export const updatePlanAmountSuccessAction = (
  planId: number,
  amount: string | number,
  updateType: 'debit-plan' | 'credit-plan'
) => ({
  amount,
  planId,
  type: PLANS_ACTION_TYPES.UPDATE_PLAN_AMOUNT_SUCCESS,
  updateType
})

export const fetchGiftedPlanSuccessAction = (giftedPlan: GiftPlanData) => ({
  giftedPlan,
  type: PLANS_ACTION_TYPES.FETCH_GIFTED_PLAN_SUCCESS
})

export const fetchPlanHistorySuccessAction = (
  planId: number,
  planHistory: IPlan[]
) => ({
  planHistory,
  planId,
  type: PLANS_ACTION_TYPES.FETCH_PLAN_HISTORY_SUCCESS
})

export const updateGiftedPlanSuccessAction = (status: string, plan: IPlan) => ({
  plan,
  status,
  type: PLANS_ACTION_TYPES.UPDATE_GIFTED_PLAN_SUCCESS
})

export const joinPlanSuccessAction = (plan: IPlan) => ({
  plan,
  type: PLANS_ACTION_TYPES.JOIN_CHALLENGE_SUCCESS
})

export const watchPlanChallengeSuccess = (plan: IPlan) => ({
  plan,
  type: PLANS_ACTION_TYPES.WATCH_PLAN_CHALLENGE_UPDATE
})

export const fetchGoalPlansSuccess = (goalPlans: GoalPlanData[]) => ({
  goalPlans,
  type: PLANS_ACTION_TYPES.FETCH_GOAL_PLANS_SUCCESS
})

export const fetchStockPortfolioAssets = (assets: any) => ({
  assets,
  type: PLANS_ACTION_TYPES.GET_RISE_STOCK_PORTFOLIO_ASSETS
})

export const fetchPropertiesPortfolioAssets = (assets: any) => ({
  assets,
  type: PLANS_ACTION_TYPES.GET_RISE_REAL_ESTATE_PORTFOLIO_ASSETS
})
