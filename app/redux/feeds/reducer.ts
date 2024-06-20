import { initialState } from './constants'
import {
  FeedsActions,
  FeedsState,
  FeedsType,
  FetchFeedsSuccess,
  FetchFeedSuccess
} from './types'

const ACTIONS: any = {
  [FeedsType.FETCH_FEEDS_REQUEST]: (state: FeedsState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [FeedsType.FETCH_FEEDS_SUCCESS]: (
    state: FeedsState,
    { feeds }: FetchFeedsSuccess
  ) => ({
    ...state,
    feeds,
    requestStatus: 'success'
  }),
  [FeedsType.FETCH_FEEDS_ERROR]: (state: FeedsState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [FeedsType.FETCH_FEED_REQUEST]: (state: FeedsState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [FeedsType.FETCH_FEED_SUCCESS]: (
    state: FeedsState,
    { feed }: FetchFeedSuccess
  ) => ({
    ...state,
    feed,
    requestStatus: 'success'
  }),
  [FeedsType.FETCH_FEED_ERROR]: (state: FeedsState) => ({
    ...state,
    requestStatus: 'failed'
  })
}

export const feedsReducer = (state = initialState, action: FeedsActions) => {
  const handler = ACTIONS[action.type]
  return handler ? handler(state, action) : state
}
