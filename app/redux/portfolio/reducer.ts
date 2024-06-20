import {
  FetchPortfolioSuccess,
  FetchRisePortfolioSuccess,
  FetchRiseRealEstatePortfolioSuccess,
  FetchRiseStocksPortfolioSuccess,
  FetchUserBuildWealthPortfolioSuccess,
  IAssetDistribution,
  PORTFOLIO_TYPES,
  PortfolioActions
} from './types'

export type PortfolioState = {
  assetDistribution: IAssetDistribution
  requestStatus: RequestStatus
  risePortfolio: IRisePortfolioData
  riseRealEstatePortfolio: IRealEstatePortfolioAssetClass
  riseStocksPortfolio: IStockPortfolioAssetClass
  userPortfolio: IUserPortfolio
}

const initialState: PortfolioState = {
  assetDistribution: {
    assetCount: 0,
    assetDistribution: [],
    netWorth: 0
  } as IAssetDistribution,
  requestStatus: 'idle',
  risePortfolio: {
    aum: 0,
    data: [],
    ytd: 0
  },
  riseRealEstatePortfolio: {} as IRealEstatePortfolioAssetClass,
  riseStocksPortfolio: {} as IStockPortfolioAssetClass,
  userPortfolio: {} as IUserPortfolio
}

const ACTIONS: any = {
  [PORTFOLIO_TYPES.FETCH_USER_PORTFOLIO_REQUEST]: (state: PortfolioState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PORTFOLIO_TYPES.FETCH_USER_PORTFOLIO_SUCCESS]: (
    state: PortfolioState,
    { assetDistribution }: FetchPortfolioSuccess
  ) => ({
    ...state,
    assetDistribution,
    requestStatus: 'success'
  }),
  [PORTFOLIO_TYPES.FETCH_USER_PORTFOLIO_ERROR]: (state: PortfolioState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PORTFOLIO_TYPES.FETCH_BUILD_WEALTH_PORTFOLIO_REQUEST]: (
    state: PortfolioState
  ) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PORTFOLIO_TYPES.FETCH_BUILD_WEALTH_PORTFOLIO_SUCCESS]: (
    state: PortfolioState,
    { userPlan }: FetchUserBuildWealthPortfolioSuccess
  ) => ({
    ...state,
    requestStatus: 'success',
    userPortfolio: userPlan
  }),
  [PORTFOLIO_TYPES.FETCH_BUILD_WEALTH_PORTFOLIO_ERROR]: (
    state: PortfolioState
  ) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PORTFOLIO_TYPES.EDIT_USER_PORTFOLIO_REQUEST]: (state: PortfolioState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PORTFOLIO_TYPES.EDIT_USER_PORTFOLIO_SUCCESS]: (state: PortfolioState) => ({
    ...state,
    requestStatus: 'success'
  }),
  [PORTFOLIO_TYPES.EDIT_USER_PORTFOLIO_ERROR]: (state: PortfolioState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PORTFOLIO_TYPES.FETCH_RISE_PORTFOLIO_REQUEST]: (state: PortfolioState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PORTFOLIO_TYPES.FETCH_RISE_PORTFOLIO_SUCCESS]: (
    state: PortfolioState,
    { risePortfolio }: FetchRisePortfolioSuccess
  ) => ({
    ...state,
    requestStatus: 'success',
    risePortfolio
  }),
  [PORTFOLIO_TYPES.FETCH_RISE_PORTFOLIO_ERROR]: (state: PortfolioState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PORTFOLIO_TYPES.FETCH_RISE_REAL_ESTATE_PORTFOLIO_REQUEST]: (
    state: PortfolioState
  ) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PORTFOLIO_TYPES.FETCH_RISE_REAL_ESTATE_PORTFOLIO_SUCCESS]: (
    state: PortfolioState,
    { riseRealEstatePortfolio }: FetchRiseRealEstatePortfolioSuccess
  ) => ({
    ...state,
    requestStatus: 'success',
    riseRealEstatePortfolio
  }),
  [PORTFOLIO_TYPES.FETCH_RISE_REAL_ESTATE_PORTFOLIO_ERROR]: (
    state: PortfolioState
  ) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [PORTFOLIO_TYPES.FETCH_RISE_STOCKS_PORTFOLIO_REQUEST]: (
    state: PortfolioState
  ) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [PORTFOLIO_TYPES.FETCH_RISE_STOCKS_PORTFOLIO_SUCCESS]: (
    state: PortfolioState,
    { riseStocksPortfolio }: FetchRiseStocksPortfolioSuccess
  ) => ({
    ...state,
    requestStatus: 'success',
    riseStocksPortfolio
  }),
  [PORTFOLIO_TYPES.FETCH_RISE_STOCKS_PORTFOLIO_ERROR]: (
    state: PortfolioState
  ) => ({
    ...state,
    requestStatus: 'failed'
  })
}

export const portfolioReducer = (
  state = initialState,
  action: PortfolioActions
) => {
  const handler = ACTIONS[action.type]
  return handler ? handler(state, action) : state
}
