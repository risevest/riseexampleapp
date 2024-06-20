export enum FeedsType {
  FETCH_FEEDS_ERROR = 'feeds/FETCH_FEEDS_ERROR',
  FETCH_FEEDS_REQUEST = 'feeds/FETCH_FEEDS_REQUEST',
  FETCH_FEEDS_SUCCESS = 'feeds/FETCH_FEEDS_SUCCESS',

  FETCH_FEED_ERROR = 'feeds/FETCH_FEED_ERROR',
  FETCH_FEED_REQUEST = 'feeds/FETCH_FEED_REQUEST',
  FETCH_FEED_SUCCESS = 'feeds/FETCH_FEED_SUCCESS'
}

export type FeedsResponse = {
  data: IFeedsData[]
  meta: {
    limit: number
    offset: number
    total: number
  }
}

export type FetchFeedsSuccess = {
  feeds: FeedsResponse
  type: FeedsType.FETCH_FEEDS_SUCCESS
}

export type FetchFeedSuccess = {
  feed: IFeedsData
  type: FeedsType.FETCH_FEED_SUCCESS
}

export type FeedsActions = FetchFeedsSuccess | FetchFeedSuccess

export interface FeedsState {
  feed: IFeedsData
  feeds: FeedsResponse
  requestStatus: RequestStatus
}
