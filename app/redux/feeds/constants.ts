import { FeedsState } from './types'

export const initialState: FeedsState = {
  feed: {} as IFeedsData,
  feeds: {
    data: [],
    meta: {
      limit: 0,
      offset: 0,
      total: 0
    }
  },
  requestStatus: 'idle'
}
