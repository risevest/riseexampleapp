import { createSelector } from 'reselect'

import { AppState } from '../types'

export const getRisePortfolio = (state: AppState) =>
  state.portfolio.risePortfolio

export const getRealEstatePortfolio = createSelector(
  getRisePortfolio,
  (state) => {
    return state.data.find(
      (portfolio: any) => portfolio?.name === 'Real Estate'
    )
  }
)

export const getStocksPortfolio = createSelector(getRisePortfolio, (state) => {
  return state.data.find((portfolio: any) => portfolio?.name === 'Stocks')
})
