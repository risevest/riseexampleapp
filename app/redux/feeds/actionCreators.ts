import { FeedsResponse, FeedsType } from './types'

export const fetchFeedsActionSuccess = (feeds: FeedsResponse) => ({
  feeds,
  type: FeedsType.FETCH_FEEDS_SUCCESS
})

export const fetchFeedActionSuccess = (feed: IFeedsData) => ({
  feed,
  type: FeedsType.FETCH_FEED_SUCCESS
})
