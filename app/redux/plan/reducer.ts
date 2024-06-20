import { updateBalance } from 'app/utils'

import {
  FetchGoalPlansSuccess,
  JoinChallengeSuccess,
  WatchPlanChallengeSuccess
} from './types'
import {
  DeletePlanSuccess,
  EditPlanSuccess,
  FetchBuildWealthPlanSuccess,
  FetchGiftedPlanSuccess,
  FetchPlanHistorySuccess,
  FundUserPlanSuccess,
  SetAssetClassPlanSuccess,
  UploadPlanImageSuccess
} from './types'
import {
  FetchInvestmentProfileSuccess,
  GetPlanProjectionSuccess
} from './types'
import {
  FetchUserPlansSuccess,
  FetchUserPlanSuccess,
  SavePlanTempData
} from './types'
import {
  PLANS_ACTION_TYPES,
  PlansActions,
  SetAssetClassSuggestion
} from './types'
import {
  SetBuildWealthPlanSuccess,
  SetInvestmentData,
  SetInvestmentProfile
} from './types'
import {
  GetAssetClassesSuccess,
  UpdateGiftedPlanSuccess,
  UpdatePlanAmountSuccess
} from './types'

export type PlanState = {
  assetClassPlan: any
  assetClasses: IAssetClass[]
  assetClassesSuggestion: any
  buildWealthPlan: any
  giftedPlan: GiftPlanData
  goalPlan: any
  goalPlans: GoalPlanData[]
  investmentProfile: IInvestmentProfile
  plan: any
  portfolioAssets: {
    properties: any
    stocks: any
  }
  projection: PlanProjection
  requestStatus: RequestStatus
  tempPlanData: any
  userPlans: {
    meta: {
      limit: number
      offset: number
      total: number
    }
    userPlans: IPlan[]
  }
}

export const initialState: PlanState = {
  assetClassPlan: {},
  assetClasses: [],
  assetClassesSuggestion: [],
  buildWealthPlan: {},
  giftedPlan: {} as GiftPlanData,
  goalPlan: {},
  goalPlans: [],
  investmentProfile: {} as IInvestmentProfile,
  plan: {},
  portfolioAssets: {
    properties: [],
    stocks: []
  },
  projection: {
    projection: [0],
    totalReturns: 0,
    years: ['2020']
  },
  requestStatus: 'idle',
  tempPlanData: {},
  userPlans: {
    meta: {
      limit: 0,
      offset: 0,
      total: 0
    },
    userPlans: []
  }
}

const ACTIONS: any = {
  [PLANS_ACTION_TYPES.CREATE_INVESTMENT_PROFILE_SUCCESS]: (
    state: PlanState,
    { investmentProfile }: SetInvestmentProfile
  ) => ({
    ...state,
    investmentProfile,
    requestStatus: 'success'
  }),
  [PLANS_ACTION_TYPES.SAVE_PLAN_TEMP_DATA]: (
    state: PlanState,
    { tempPlanData }: SavePlanTempData
  ) => ({
    ...state,
    tempPlanData: {
      ...state.tempPlanData,
      ...tempPlanData
    }
  }),
  [PLANS_ACTION_TYPES.RESET_PLAN_TEMP_DATA]: (state: PlanState) => ({
    ...state,
    tempPlanData: {}
  }),
  [PLANS_ACTION_TYPES.RESET_PLAN_DATA]: (state: PlanState) => ({
    ...state,
    plan: {}
  }),
  [PLANS_ACTION_TYPES.CREATE_INVESTMENT_PROFILE_REQUEST]: (
    state: PlanState
  ) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PLANS_ACTION_TYPES.CREATE_INVESTMENT_PROFILE_ERROR]: (state: PlanState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PLANS_ACTION_TYPES.SET_ASSET_CLASS_SUGGESTION]: (
    state: PlanState,
    { assetClasses }: SetAssetClassSuggestion
  ) => ({
    ...state,
    assetClassesSuggestion: assetClasses
  }),
  [PLANS_ACTION_TYPES.CREATE_BUILD_WEALTH_PLAN_REQUEST]: (
    state: PlanState
  ) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PLANS_ACTION_TYPES.CREATE_BUILD_WEALTH_PLAN_SUCCESS]: (
    state: PlanState,
    { buildWealthPlan }: SetBuildWealthPlanSuccess
  ) => ({
    ...state,
    buildWealthPlan:
      buildWealthPlan?.type === 'build-wealth'
        ? buildWealthPlan
        : state.buildWealthPlan,
    goalPlan:
      buildWealthPlan?.type === 'normal' ? buildWealthPlan : state.goalPlan,
    requestStatus: 'success',
    userPlans: {
      ...state.userPlans,
      userPlans: [buildWealthPlan, ...(state?.userPlans?.userPlans ?? [])]
    }
  }),
  [PLANS_ACTION_TYPES.CREATE_BUILD_WEALTH_PLAN_ERROR]: (state: PlanState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PLANS_ACTION_TYPES.CREATE_ASSET_CLASS_PLAN_REQUEST]: (state: PlanState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PLANS_ACTION_TYPES.CREATE_ASSET_CLASS_PLAN_SUCCESS]: (
    state: PlanState,
    { assetClassPlan }: SetAssetClassPlanSuccess
  ) => ({
    ...state,
    assetClassPlan,
    requestStatus: 'success',
    userPlans: {
      ...state.userPlans,
      userPlans: [assetClassPlan, ...(state?.userPlans?.userPlans ?? [])]
    }
  }),
  [PLANS_ACTION_TYPES.CREATE_ASSET_CLASS_PLAN_ERROR]: (state: PlanState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PLANS_ACTION_TYPES.SET_INVESTMENT_DATA]: (
    state: PlanState,
    { investmentData }: SetInvestmentData
  ) => ({
    ...state,
    investmentProfile: {
      ...state.investmentProfile,
      ...investmentData
    }
  }),
  [PLANS_ACTION_TYPES.UPLOAD_PLAN_IMAGE_REQUEST]: (state: PlanState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PLANS_ACTION_TYPES.UPLOAD_PLAN_IMAGE_ERROR]: (state: PlanState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PLANS_ACTION_TYPES.UPLOAD_PLAN_IMAGE_SUCCESS]: (
    state: PlanState,
    { data }: UploadPlanImageSuccess
  ) => {
    const userPlans = state?.userPlans?.userPlans?.map((userPlan) => {
      if (userPlan.id === data.planId) {
        return {
          ...userPlan,
          pictureUrl: data.url
        }
      }
      return userPlan
    })
    const plan =
      state.plan.id === data.planId
        ? { ...state.plan, pictureUrl: data.url }
        : state.plan
    const buildWealthPlan =
      state.buildWealthPlan.id === data.planId
        ? { ...state.buildWealthPlan, pictureUrl: data.url }
        : state.buildWealthPlan

    return {
      ...state,
      buildWealthPlan,
      plan,
      requestStatus: 'success',
      userPlans: {
        ...state.userPlans,
        userPlans
      }
    }
  },
  [PLANS_ACTION_TYPES.FETCH_USER_PLAN_REQUEST]: (state: PlanState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PLANS_ACTION_TYPES.FETCH_USER_PLAN_SUCCESS]: (
    state: PlanState,
    { plan }: FetchUserPlanSuccess
  ) => {
    const buildWealthPlan =
      state.buildWealthPlan.id === plan.id ? plan : state.buildWealthPlan

    return {
      ...state,
      buildWealthPlan,
      plan,
      requestStatus: 'success'
    }
  },
  [PLANS_ACTION_TYPES.FETCH_USER_PLAN_ERROR]: (state: PlanState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PLANS_ACTION_TYPES.FETCH_USER_PLANS_REQUEST]: (state: PlanState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PLANS_ACTION_TYPES.FETCH_USER_PLANS_SUCCESS]: (
    state: PlanState,
    { userPlans }: FetchUserPlansSuccess
  ) => {
    let paginatedPlans = []
    const {
      meta: { offset }
    } = userPlans
    if (offset === 0) {
      paginatedPlans = userPlans.data
    } else {
      paginatedPlans = [
        ...(state?.userPlans?.userPlans ?? []),
        ...userPlans.data
      ]
    }

    return {
      ...state,
      requestStatus: 'success',
      userPlans: {
        meta: userPlans?.meta || {},
        userPlans: paginatedPlans
      }
    }
  },
  [PLANS_ACTION_TYPES.FETCH_USER_PLANS_ERROR]: (state: PlanState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PLANS_ACTION_TYPES.FETCH_BUILD_WEALTH_PLAN_REQUEST]: (state: PlanState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PLANS_ACTION_TYPES.FETCH_BUILD_WEALTH_PLAN_SUCCESS]: (
    state: PlanState,
    { buildWealthPlan }: FetchBuildWealthPlanSuccess
  ) => ({
    ...state,
    buildWealthPlan,
    requestStatus: 'success'
  }),
  [PLANS_ACTION_TYPES.FETCH_BUILD_WEALTH_PLAN_ERROR]: (state: PlanState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PLANS_ACTION_TYPES.FUND_PLAN_WITH_WALLET_REQUEST]: (state: PlanState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PLANS_ACTION_TYPES.FUND_PLAN_WITH_WALLET_SUCCESS]: (
    state: PlanState,
    { userPlanId, amount }: FundUserPlanSuccess
  ) => {
    const buildWealthPlan =
      state.buildWealthPlan.id === userPlanId
        ? {
            ...state.buildWealthPlan,
            currentBalance: Number(
              updateBalance({
                amount: Number(amount),
                balance: state.buildWealthPlan.currentBalance,
                updateType: 'credit-plan'
              })
            ).toFixed(2)
          }
        : state.buildWealthPlan

    const plan =
      state.plan.id === userPlanId
        ? {
            ...state.plan,
            currentBalance: Number(
              updateBalance({
                amount: Number(amount),
                balance: state.plan.currentBalance,
                updateType: 'credit-plan'
              })
            ).toFixed(2)
          }
        : state.plan

    return {
      ...state,
      buildWealthPlan,
      plan,
      requestStatus: 'success',
      userPlans: {
        ...state.userPlans,
        userPlans: state?.userPlans?.userPlans?.map((userPlan) => {
          if (userPlan.id === userPlanId) {
            return {
              ...userPlan,
              currentBalance: Number(
                updateBalance({
                  amount: Number(amount),
                  balance: Number(userPlan.currentBalance),
                  updateType: 'credit-plan'
                })
              ).toFixed(2)
            }
          }
          return userPlan
        })
      }
    }
  },
  [PLANS_ACTION_TYPES.FUND_PLAN_WITH_WALLET_ERROR]: (state: PlanState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PLANS_ACTION_TYPES.FETCH_INVESTMENT_PROFILE_REQUEST]: (
    state: PlanState
  ) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PLANS_ACTION_TYPES.FETCH_INVESTMENT_PROFILE_SUCCESS]: (
    state: PlanState,
    { investmentProfile }: FetchInvestmentProfileSuccess
  ) => ({
    ...state,
    investmentProfile,
    requestStatus: 'success'
  }),
  [PLANS_ACTION_TYPES.FETCH_INVESTMENT_PROFILE_ERROR]: (state: PlanState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PLANS_ACTION_TYPES.GET_PLAN_PROJECTION_REQUEST]: (state: PlanState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PLANS_ACTION_TYPES.GET_PLAN_PROJECTION_SUCCESS]: (
    state: PlanState,
    { projection }: GetPlanProjectionSuccess
  ) => ({
    ...state,
    projection,
    requestStatus: 'success'
  }),
  [PLANS_ACTION_TYPES.GET_PLAN_PROJECTION_ERROR]: (state: PlanState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PLANS_ACTION_TYPES.EDIT_PLAN_REQUEST]: (state: PlanState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PLANS_ACTION_TYPES.EDIT_PLAN_SUCCESS]: (
    state: PlanState,
    { plan }: EditPlanSuccess
  ) => {
    return {
      ...state,
      plan: { ...state.plan, ...plan },
      requestStatus: 'success',
      userPlans: {
        ...state.userPlans,
        userPlans: state?.userPlans?.userPlans?.map((userPlan) => {
          if (userPlan.id === plan.id) {
            return {
              ...plan
            }
          }
          return userPlan
        })
      }
    }
  },
  [PLANS_ACTION_TYPES.EDIT_PLAN_ERROR]: (state: PlanState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PLANS_ACTION_TYPES.GET_ASSET_CLASSES_REQUEST]: (state: PlanState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PLANS_ACTION_TYPES.GET_ASSET_CLASSES_SUCCESS]: (
    state: PlanState,
    { assetClasses }: GetAssetClassesSuccess
  ) => ({
    ...state,
    assetClasses,
    requestStatus: 'success'
  }),
  [PLANS_ACTION_TYPES.GET_ASSET_CLASSES_ERROR]: (state: PlanState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PLANS_ACTION_TYPES.DELETE_PLAN_REQUEST]: (state: PlanState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PLANS_ACTION_TYPES.DELETE_PLAN_SUCCESS]: (
    state: PlanState,
    { planId }: DeletePlanSuccess
  ) => {
    const filterPlans = state?.userPlans?.userPlans?.filter(
      (plan) => plan.id !== Number(planId)
    )
    const isBuildWealth = state?.buildWealthPlan.id === planId

    return {
      ...state,
      buildWealthPlan: isBuildWealth ? {} : state.buildWealthPlan,
      requestStatus: 'success',
      userPlans: {
        ...state.userPlans,
        userPlans: filterPlans
      }
    }
  },
  [PLANS_ACTION_TYPES.UPDATE_PLAN_AMOUNT_SUCCESS]: (
    state: PlanState,
    { planId, amount, updateType = 'debit-plan' }: UpdatePlanAmountSuccess
  ) => {
    const updateUserPlan = state?.userPlans?.userPlans?.map((userPlan) => {
      if (userPlan.id === Number(planId)) {
        return {
          ...userPlan,
          currentBalance: updateBalance({
            amount: Number(amount),
            balance: Number(userPlan.currentBalance),
            updateType
          })
        }
      }
      return userPlan
    })

    return {
      ...state,
      buildWealthPlan:
        state.buildWealthPlan.id === planId
          ? {
              ...state.buildWealthPlan,
              currentBalance: updateBalance({
                amount: Number(amount),
                balance: Number(state.buildWealthPlan.currentBalance),
                updateType
              })
            }
          : state.buildWealthPlan,
      plan:
        state.plan.id === Number(planId)
          ? {
              ...state.plan,
              currentBalance: updateBalance({
                amount: Number(amount),
                balance: Number(state.plan.currentBalance),
                updateType
              })
            }
          : state.plan,
      userPlans: {
        ...state.userPlans,
        userPlans: updateUserPlan
      }
    }
  },
  [PLANS_ACTION_TYPES.REINVEST_PLAN_REQUEST]: (state: PlanState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PLANS_ACTION_TYPES.REINVEST_PLAN_ERROR]: (state: PlanState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PLANS_ACTION_TYPES.REINVEST_PLAN_SUCCESS]: (state: PlanState) => ({
    ...state,
    requestStatus: 'success'
  }),
  [PLANS_ACTION_TYPES.CREATE_GIFTED_PLAN_REQUEST]: (state: PlanState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PLANS_ACTION_TYPES.CREATE_GIFTED_PLAN_SUCCESS]: (state: PlanState) => ({
    ...state,
    requestStatus: 'success'
  }),
  [PLANS_ACTION_TYPES.CREATE_GIFTED_PLAN_ERROR]: (state: PlanState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PLANS_ACTION_TYPES.FETCH_GIFTED_PLAN_REQUEST]: (state: PlanState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PLANS_ACTION_TYPES.FETCH_GIFTED_PLAN_SUCCESS]: (
    state: PlanState,
    { giftedPlan }: FetchGiftedPlanSuccess
  ) => ({
    ...state,
    giftedPlan,
    requestStatus: 'success'
  }),
  [PLANS_ACTION_TYPES.FETCH_GIFTED_PLAN_ERROR]: (state: PlanState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PLANS_ACTION_TYPES.UPDATE_GIFTED_PLAN_REQUEST]: (state: PlanState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PLANS_ACTION_TYPES.UPDATE_GIFTED_PLAN_SUCCESS]: (
    state: PlanState,
    { status, plan }: UpdateGiftedPlanSuccess
  ) => ({
    ...state,
    giftedPlan: {
      ...state.giftedPlan,
      status: status === 'accept' ? 'accepted' : 'declined'
    },
    requestStatus: 'success',
    userPlans: {
      ...state.userPlans,
      userPlans:
        status === 'accept'
          ? [plan, ...(state?.userPlans?.userPlans ?? [])]
          : state?.userPlans?.userPlans
    }
  }),
  [PLANS_ACTION_TYPES.UPDATE_GIFTED_PLAN_ERROR]: (state: PlanState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PLANS_ACTION_TYPES.JOIN_CHALLENGE_REQUEST]: (state: PlanState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PLANS_ACTION_TYPES.JOIN_CHALLENGE_SUCCESS]: (
    state: PlanState,
    { plan }: JoinChallengeSuccess
  ) => ({
    ...state,
    plan,
    requestStatus: 'success',
    userPlans: {
      ...state.userPlans,
      userPlans: [plan, ...state.userPlans.userPlans]
    }
  }),
  [PLANS_ACTION_TYPES.JOIN_CHALLENGE_ERROR]: (state: PlanState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PLANS_ACTION_TYPES.WATCH_PLAN_CHALLENGE_UPDATE]: (
    state: PlanState,
    { plan }: WatchPlanChallengeSuccess
  ) => {
    const newUserPlans = state.userPlans.userPlans.find(
      (userPlan) => userPlan.id === plan.id
    )
      ? state.userPlans.userPlans
      : [plan, ...state.userPlans.userPlans]

    return {
      ...state,
      userPlans: {
        ...state.userPlans,
        userPlans: newUserPlans
      }
    }
  },
  [PLANS_ACTION_TYPES.FETCH_PLAN_HISTORY_REQUEST]: (state: PlanState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PLANS_ACTION_TYPES.FETCH_PLAN_HISTORY_SUCCESS]: (
    state: PlanState,
    { planId, planHistory }: FetchPlanHistorySuccess
  ) => {
    const updateUserPlan = state?.userPlans?.userPlans?.map((userPlan) => {
      if (userPlan.id === Number(planId)) {
        return {
          ...userPlan,
          history: planHistory
        }
      }
      return userPlan
    })

    return {
      ...state,
      buildWealthPlan:
        state.buildWealthPlan.id === planId
          ? {
              ...state.buildWealthPlan,
              history: planHistory
            }
          : state.buildWealthPlan,
      plan:
        state.plan.id === Number(planId)
          ? {
              ...state.plan,
              history: planHistory
            }
          : state.plan,
      requestStatus: 'success',
      userPlans: {
        ...state.userPlans,
        userPlans: updateUserPlan
      }
    }
  },
  [PLANS_ACTION_TYPES.FETCH_PLAN_HISTORY_ERROR]: (state: PlanState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PLANS_ACTION_TYPES.FETCH_GOAL_PLANS_REQUEST]: (state: PlanState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PLANS_ACTION_TYPES.FETCH_GOAL_PLANS_SUCCESS]: (
    state: PlanState,
    { goalPlans }: FetchGoalPlansSuccess
  ) => ({
    ...state,
    goalPlans,
    requestStatus: 'success'
  }),
  [PLANS_ACTION_TYPES.FETCH_GOAL_PLANS_ERROR]: (state: PlanState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PLANS_ACTION_TYPES.GET_RISE_STOCK_PORTFOLIO_ASSETS]: (
    state: PlanState,
    { assets }: any
  ) => ({
    ...state,
    portfolioAssets: {
      ...state.portfolioAssets,
      stocks: assets
    },
    requestStatus: 'success'
  }),
  [PLANS_ACTION_TYPES.GET_RISE_REAL_ESTATE_PORTFOLIO_ASSETS]: (
    state: PlanState,
    { assets }: any
  ) => ({
    ...state,
    portfolioAssets: {
      ...state.portfolioAssets,
      properties: assets
    },
    requestStatus: 'success'
  })
}

export const planReducer = (state = initialState, action: PlansActions) => {
  const handler = ACTIONS[action.type]
  return handler ? handler(state, action) : state
}
