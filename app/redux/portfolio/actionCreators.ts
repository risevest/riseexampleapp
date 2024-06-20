import { IAssetDistribution, PORTFOLIO_TYPES } from './types'

export const fetchUserPortfolioSuccessAction = (
  assetDistribution: IAssetDistribution
) => ({
  assetDistribution,
  type: PORTFOLIO_TYPES.FETCH_USER_PORTFOLIO_SUCCESS
})

export const fetchBuildWealthPortfolioSuccess = (userPlan: IUserPortfolio) => ({
  type: PORTFOLIO_TYPES.FETCH_BUILD_WEALTH_PORTFOLIO_SUCCESS,
  userPlan
})

export const fetchRisePortfolioSuccess = (
  risePortfolio: IRisePortfolioData
) => ({
  risePortfolio,
  type: PORTFOLIO_TYPES.FETCH_RISE_PORTFOLIO_SUCCESS
})

export const fetchRiseRealEstatePortfolioSuccessAction = (
  riseRealEstatePortfolio: IRealEstatePortfolioAssetClass
) => ({
  riseRealEstatePortfolio,
  type: PORTFOLIO_TYPES.FETCH_RISE_REAL_ESTATE_PORTFOLIO_SUCCESS
})

export const fetchRiseStocksPortfolioSuccessAction = (
  riseStocksPortfolio: IStockPortfolioAssetClass
) => ({
  riseStocksPortfolio,
  type: PORTFOLIO_TYPES.FETCH_RISE_STOCKS_PORTFOLIO_SUCCESS
})
