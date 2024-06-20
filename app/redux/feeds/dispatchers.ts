import instance from 'app/utils/axios'

import {
  fetchFeedActionSuccess,
  fetchFeedsActionSuccess
} from './actionCreators'
import { FeedsType } from './types'

export const fetchFeedsDispatcher = () => {
  return (dispatch: any) => {
    dispatch({ type: FeedsType.FETCH_FEEDS_REQUEST })
    return instance
      .get('/feeds?$include=article')
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchFeedsActionSuccess(response.data))
        }
      })
      .catch(() => {
        dispatch({ type: FeedsType.FETCH_FEEDS_ERROR })
      })
  }
}

export const fetchFeedDispatcher = (feedId: number) => {
  return (dispatch: any) => {
    dispatch({ type: FeedsType.FETCH_FEED_REQUEST })
    return instance
      .get(`/feeds/${feedId}?$include=article`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchFeedActionSuccess(response.data.data))
        }
      })
      .catch(() => {
        dispatch({ type: FeedsType.FETCH_FEED_ERROR })
      })
  }
}
