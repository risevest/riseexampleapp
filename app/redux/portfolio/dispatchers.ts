import { fetchPlanPortfolio } from 'app/api'
import instance from 'app/utils/axios'
import { calculatePortfolioDistribution } from 'app/utils/portfolioHeavyLifting'

import { setError } from '../error/actionCreators'
import {
  fetchBuildWealthPortfolioSuccess,
  fetchRisePortfolioSuccess,
  fetchRiseRealEstatePortfolioSuccessAction,
  fetchRiseStocksPortfolioSuccessAction,
  fetchUserPortfolioSuccessAction
} from './actionCreators'
import { PORTFOLIO_TYPES } from './types'

export const fetchUserPortfolioDispatcher = () => {
  return (dispatch: any) => {
    dispatch({ type: PORTFOLIO_TYPES.FETCH_USER_PORTFOLIO_REQUEST })
    return instance
      .get(
        '/user-plans?$include=userPortfolio.user_portfolio_mix.asset_class&$limit=1000'
      )
      .then((response) => {
        if (response.status === 200) {
          const assetDistribution = calculatePortfolioDistribution(
            response.data.data
          )
          dispatch(fetchUserPortfolioSuccessAction(assetDistribution))
        }
      })
      .catch((err) => {
        setError('Portfolio Fetch Error', err)
        dispatch({ type: PORTFOLIO_TYPES.FETCH_USER_PORTFOLIO_ERROR })
      })
  }
}

export const fetchBuildWealthPortfolioDispatcher = (planId: number) => {
  return (dispatch: any) => {
    dispatch({ type: PORTFOLIO_TYPES.FETCH_BUILD_WEALTH_PORTFOLIO_REQUEST })
    return fetchPlanPortfolio({ planId })
      .then((portfolio) => {
        dispatch(fetchBuildWealthPortfolioSuccess(portfolio))
      })
      .catch((error) => {
        dispatch(setError('Fetching Portfolio Error', error))
        dispatch({ type: PORTFOLIO_TYPES.FETCH_BUILD_WEALTH_PORTFOLIO_ERROR })
      })
  }
}

export const editUserPortfolioDispatcher = (
  portfolioId: number,
  payload: any
) => {
  return (dispatch: any) => {
    dispatch({ type: PORTFOLIO_TYPES.EDIT_USER_PORTFOLIO_REQUEST })
    return instance
      .put(`/user-portfolios/${portfolioId}`, payload)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: PORTFOLIO_TYPES.EDIT_USER_PORTFOLIO_SUCCESS })
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(setError('Update Error', error))
        dispatch({ type: PORTFOLIO_TYPES.EDIT_USER_PORTFOLIO_ERROR })
        return {
          requestStatus: 'error'
        }
      })
  }
}

export const fetchRisePortfolioDispatcher = () => {
  return (dispatch: any) => {
    dispatch({ type: PORTFOLIO_TYPES.FETCH_RISE_PORTFOLIO_REQUEST })
    return instance
      .get('/asset-classes/percentages')
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchRisePortfolioSuccess(response.data))
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(setError('Portfolio Fetching Error', error))
        dispatch({ type: PORTFOLIO_TYPES.FETCH_RISE_PORTFOLIO_ERROR })
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const fetchRiseRealEstatePortfolioDispatcher = (portfolioId: number) => {
  return (dispatch: any) => {
    dispatch({
      type: PORTFOLIO_TYPES.FETCH_RISE_REAL_ESTATE_PORTFOLIO_REQUEST
    })
    return instance
      .get(`/portfolios/${portfolioId}?$include=portfolio_asset.property`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            fetchRiseRealEstatePortfolioSuccessAction(response.data.data)
          )
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(setError('Portfolio Fetch Error', error))
        dispatch({
          type: PORTFOLIO_TYPES.FETCH_RISE_REAL_ESTATE_PORTFOLIO_ERROR
        })
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const fetchRiseStocksPortfolioDispatcher = (portfolioId: number) => {
  return (dispatch: any) => {
    dispatch({ type: PORTFOLIO_TYPES.FETCH_RISE_STOCKS_PORTFOLIO_REQUEST })
    return instance
      .get(`/portfolios/${portfolioId}?$include=portfolio_asset.stock`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchRiseStocksPortfolioSuccessAction(response.data.data))
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(setError('Portfolio Fetch Error', error))
        dispatch({ type: PORTFOLIO_TYPES.FETCH_RISE_STOCKS_PORTFOLIO_ERROR })
        return {
          requestStatus: 'failed'
        }
      })
  }
}
