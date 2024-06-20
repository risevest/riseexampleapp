import {
  editPlan,
  fetchAssetClasses,
  fetchPlanDetails,
  fetchPlans
} from 'app/api'
import { toastMethods } from 'app/components/toast'
import { logEvent } from 'app/utils/analytics'
import fbsdk from 'app/utils/analytics/fbsdk'

import instance from '../../utils/axios'
import { CHALLENGE_TYPES } from '../challenge/types'
import { setError } from '../error/actionCreators'
import {
  editPlanSuccessAction,
  fetchBuildWealthPlanSuccessAction,
  fetchGiftedPlanSuccessAction,
  fetchGoalPlansSuccess,
  fetchInvestmentProfileSuccess,
  fetchPlanHistorySuccessAction,
  fetchPropertiesPortfolioAssets,
  fetchStockPortfolioAssets,
  fetchUserPlanAction,
  fetchUserPlansAction,
  getAssetClassesSuccessAction,
  joinPlanSuccessAction,
  resetPlanTempData,
  savePlanTempData,
  setAssetClassPlanAction,
  setAssetClassSuggestion,
  setBuildWealthPlanAction,
  setInvestmentData,
  setInvestmentProfile,
  updateGiftedPlanSuccessAction,
  watchPlanChallengeSuccess
} from './actionCreators'
import { PLANS_ACTION_TYPES } from './types'

export type ReinvestData = {
  amount: number
}

export type ChallengeData = {
  chargeRecurringFrequency: string
  name: string
  nextChargeDate: string
  nickname: string
}

export const setIProfileTempDataDispatcher = (data: any) => {
  return (dispatch: any) => {
    dispatch(setInvestmentData(data))
  }
}

export const setAssetClassSuggestionDispatcher = (assetClasses: any) => {
  return (dispatch: any) => {
    dispatch(setAssetClassSuggestion(assetClasses))
  }
}

export const savePlanTempDataDispatcher = (tempData: any) => {
  return (dispatch: any) => {
    dispatch(savePlanTempData(tempData))
  }
}

export const resetPlanTempDataDispatcher = () => {
  return (dispatch: any) => {
    dispatch(resetPlanTempData())
  }
}

export const watchPlanChallengeSuccessDispatcher = (plan: IPlan) => {
  return (dispatch: any) => {
    dispatch(watchPlanChallengeSuccess(plan))
  }
}

export const createInvestmentProfileDispatcher = (
  data: Partial<IInvestmentProfile>
) => {
  return (dispatch: any) => {
    dispatch({ type: PLANS_ACTION_TYPES.CREATE_INVESTMENT_PROFILE_REQUEST })
    return instance
      .post('/investment-profiles', data)
      .then((response) => {
        if (response.status === 200) {
          dispatch(setInvestmentProfile(response.data.data))
          return {
            data: response.data.data,
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(setError('Plan Creation Error', error))
        dispatch({ type: PLANS_ACTION_TYPES.CREATE_INVESTMENT_PROFILE_ERROR })
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const createAssetClassPlanDispatcher = (data: any) => {
  return (dispatch: any) => {
    dispatch({
      type: PLANS_ACTION_TYPES.CREATE_ASSET_CLASS_PLAN_REQUEST
    })
    return instance
      .post('/user-plans', data)
      .then((response) => {
        if (response.status === 200) {
          const plan: IPlan = response.data.data
          dispatch(setAssetClassPlanAction(plan))
          return {
            plan,
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          toastMethods.show({
            props: {
              contentProps: {
                description: error?.response?.data?.message,
                title: 'Error'
              },
              type: 'error'
            },
            type: 'alert'
          })
        } else {
          toastMethods.show({
            props: {
              contentProps: {
                description: 'Error creating your Build plan at this time',
                title: 'Error'
              },
              type: 'error'
            },
            type: 'alert'
          })
        }
        dispatch({
          type: PLANS_ACTION_TYPES.CREATE_ASSET_CLASS_PLAN_ERROR
        })
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const createBuildWealthPlanDispatcher = (data: any) => {
  return (dispatch: any) => {
    dispatch({ type: PLANS_ACTION_TYPES.CREATE_BUILD_WEALTH_PLAN_REQUEST })
    return instance
      .post('/user-portfolios', data)
      .then((response) => {
        if (response.status === 200) {
          dispatch(setBuildWealthPlanAction(response.data.data.plan))
          const plan: IPlan = response.data.data.plan
          logEvent('begin_create_plan', {
            fund_frequency: plan.recurringFrequency,
            investment_period: plan.duration,
            origin_screen_name: 'Plan Review',
            plan_id: plan.id,
            plan_name: plan.name,
            plan_type: plan.planType,
            reinvest: plan.reinvest
          })
          fbsdk.logEvent('create_plan')

          return {
            plan,
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(setError('Build Wealth Error', error))
        dispatch({ type: PLANS_ACTION_TYPES.CREATE_BUILD_WEALTH_PLAN_ERROR })
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const uploadPlanImageDispatcher = (
  planId: number,
  data: any,
  showNotif: boolean = true
) => {
  return (dispatch: any) => {
    dispatch({ type: PLANS_ACTION_TYPES.UPLOAD_PLAN_IMAGE_REQUEST })
    return instance
      .post(`/user-plans/${planId}/image`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        if (response.status === 200) {
          const actionData = {
            planId,
            url: response.data.url
          }
          dispatch({
            data: actionData,
            type: PLANS_ACTION_TYPES.UPLOAD_PLAN_IMAGE_SUCCESS
          })
          if (showNotif)
            toastMethods.show({
              props: {
                contentProps: {
                  description: 'Successfully uploaded an image to your plan',
                  title: 'Upload Successful'
                }
              },
              type: 'alert'
            })

          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(setError('Image Upload Error', error))
        dispatch({ type: PLANS_ACTION_TYPES.UPLOAD_PLAN_IMAGE_ERROR })
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const fetchUserPlanDispatcher = (planId: number, history: boolean) => {
  return (dispatch: any) => {
    dispatch({ type: PLANS_ACTION_TYPES.FETCH_USER_PLAN_REQUEST })
    return fetchPlanDetails({ planId })
      .then((data) => {
        if (!history) {
          dispatch(fetchUserPlanAction(data))
        }
        return {
          data: data,
          requestStatus: 'success'
        }
      })
      .catch(() => {
        // dispatch(setError('Plans Fetching Error', error));
        dispatch({ type: PLANS_ACTION_TYPES.FETCH_USER_PLAN_ERROR })
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const fetchUserPlansDispatcher = (offset: number = 0) => {
  return (dispatch: any) => {
    dispatch({ type: PLANS_ACTION_TYPES.FETCH_USER_PLANS_REQUEST })
    return fetchPlans(offset)
      .then((data) => {
        dispatch(fetchUserPlansAction(data.data))
        return {
          requestStatus: 'success'
        }
      })
      .catch((error) => {
        dispatch(setError('Plan Fetching Error', error))
        dispatch({ type: PLANS_ACTION_TYPES.FETCH_USER_PLANS_ERROR })
      })
  }
}

export const fetchInvestmentProfileDispatcher = () => {
  return (dispatch: any) => {
    dispatch({ type: PLANS_ACTION_TYPES.FETCH_INVESTMENT_PROFILE_REQUEST })
    return instance
      .get('/investment-profiles')
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchInvestmentProfileSuccess(response.data.data[0] || {}))
        }
      })
      .catch((error) => {
        dispatch(setError('Investment Profile Error', error))
        dispatch({ type: PLANS_ACTION_TYPES.FETCH_INVESTMENT_PROFILE_ERROR })
      })
  }
}

export const getAssetClassesDispatcher = () => {
  return (dispatch: any) => {
    dispatch({ type: PLANS_ACTION_TYPES.GET_ASSET_CLASSES_REQUEST })
    return fetchAssetClasses()
      .then((assetClass: any) => {
        dispatch(getAssetClassesSuccessAction(assetClass))
      })
      .catch(() => {
        // fail silently
        dispatch({ type: PLANS_ACTION_TYPES.GET_ASSET_CLASSES_ERROR })
      })
  }
}

export const fetchBuildWealthPlanDispatcher = () => {
  return (dispatch: any) => {
    dispatch({ type: PLANS_ACTION_TYPES.FETCH_BUILD_WEALTH_PLAN_REQUEST })
    return instance
      .get('/user-plans/plan/fetch-build-wealth')
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchBuildWealthPlanSuccessAction(response.data.data))
        }
      })
      .catch(() => {
        dispatch({ type: PLANS_ACTION_TYPES.FETCH_BUILD_WEALTH_PLAN_ERROR })
      })
  }
}

export const editPlanDispatcher = (planId: number, payload: any) => {
  return (dispatch: any) => {
    dispatch({ type: PLANS_ACTION_TYPES.EDIT_PLAN_REQUEST })
    return editPlan({ payload, planId })
      .then((response) => {
        if (response.status === 200) {
          dispatch(editPlanSuccessAction(response.data.data))
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(setError('Plan Editing Error', error))
        dispatch({ type: PLANS_ACTION_TYPES.EDIT_PLAN_ERROR })
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const reinvestPlanDispatcher = (
  planId: number,
  reinvestData: ReinvestData
) => {
  return (dispatch: any) => {
    dispatch({ type: PLANS_ACTION_TYPES.REINVEST_PLAN_REQUEST })
    return instance
      .post(`/user-plans/${planId}/reinvest`, reinvestData)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: PLANS_ACTION_TYPES.REINVEST_PLAN_SUCCESS })
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(setError('Reinvest Error', error))
        dispatch({ type: PLANS_ACTION_TYPES.REINVEST_PLAN_ERROR })
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const createGiftPlanDispatcher = (data: GiftPlanPayload) => {
  return (dispatch: any) => {
    dispatch({ type: PLANS_ACTION_TYPES.CREATE_GIFTED_PLAN_REQUEST })
    return instance
      .post('/gifted-plans', data)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: PLANS_ACTION_TYPES.CREATE_GIFTED_PLAN_SUCCESS })
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(setError('Gifted Plans Error', error))
        dispatch({ type: PLANS_ACTION_TYPES.CREATE_GIFTED_PLAN_ERROR })
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const fetchGiftedPlanDispatcher = (planId: number) => {
  return (dispatch: any) => {
    dispatch({ type: PLANS_ACTION_TYPES.FETCH_GIFTED_PLAN_REQUEST })
    return instance
      .get(`/gifted-plans/${planId}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchGiftedPlanSuccessAction(response.data.data))
        }
      })
      .catch((error) => {
        dispatch(setError('Fetch Gift Error', error))
        dispatch({ type: PLANS_ACTION_TYPES.FETCH_GIFTED_PLAN_ERROR })
      })
  }
}

export const updateGiftedPlanDispatcher = (planId: number, status: string) => {
  return (dispatch: any) => {
    dispatch({ type: PLANS_ACTION_TYPES.UPDATE_GIFTED_PLAN_REQUEST })
    return instance
      .post(`/gifted-plans/${planId}/${status}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(updateGiftedPlanSuccessAction(status, response.data.data))
        }
      })
      .catch((error) => {
        dispatch(setError('Update Gift Error', error))
        dispatch({ type: PLANS_ACTION_TYPES.UPDATE_GIFTED_PLAN_ERROR })
      })
  }
}

export const joinChallengeDispatcher = (data: ChallengeData) => {
  return (dispatch: any) => {
    dispatch({ type: PLANS_ACTION_TYPES.JOIN_CHALLENGE_REQUEST })
    return instance
      .post('/challenges/register', data)
      .then((response) => {
        if (response.status === 200) {
          dispatch(joinPlanSuccessAction(response.data.data))
          dispatch({
            data: response.data.data,
            type: CHALLENGE_TYPES.LISTEN_JOIN_CHALLENGE_SUCCESS
          })
          toastMethods.show({
            props: {
              contentProps: {
                description: 'You have successfully joined the challenge!',
                title: 'Success'
              }
            },
            type: 'alert'
          })

          return {
            planId: response.data.data.id,
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(setError('Challenge Error', error))
        dispatch({ type: PLANS_ACTION_TYPES.JOIN_CHALLENGE_ERROR })

        return {
          requestStatus: 'error'
        }
      })
  }
}

export const fetchPlanHistoryDispatcher = (planId: number) => {
  return (dispatch: any) => {
    dispatch({ type: PLANS_ACTION_TYPES.FETCH_PLAN_HISTORY_REQUEST })
    return instance
      .get(`/user-plans/${planId}/history`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchPlanHistorySuccessAction(planId, response.data.data))
        }
      })
      .catch((error) => {
        dispatch(setError('Fetch Plan History Error', error))
        dispatch({ type: PLANS_ACTION_TYPES.FETCH_PLAN_HISTORY_ERROR })
      })
  }
}

export const fetchGoalPlansDispatcher = () => {
  return (dispatch: any) => {
    dispatch({ type: PLANS_ACTION_TYPES.FETCH_GOAL_PLANS_REQUEST })
    return instance
      .get('/goal-plans')
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchGoalPlansSuccess(response.data.data))
        }
      })
      .catch((error) => {
        dispatch(setError('Fetch Goal Plans error', error))
        dispatch({ type: PLANS_ACTION_TYPES.FETCH_GOAL_PLANS_ERROR })
      })
  }
}

export const fetchStockPortfolioAssetsDispatcher = () => {
  return (dispatch: any) => {
    dispatch({ type: PLANS_ACTION_TYPES.GET_RISE_STOCK_PORTFOLIO_ASSETS })
    return instance
      .get('/stocks?$limit=6')
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchStockPortfolioAssets(response.data.data))
        }
      })
      .catch(() => {
        // fail silently
      })
  }
}

export const fetchPropertyPortfolioAssetsDispatcher = () => {
  return (dispatch: any) => {
    dispatch({ type: PLANS_ACTION_TYPES.GET_RISE_REAL_ESTATE_PORTFOLIO_ASSETS })
    return instance
      .get('/properties?$limit=6')
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchPropertiesPortfolioAssets(response.data.data))
        }
      })
      .catch(() => {
        // fail silently
      })
  }
}
