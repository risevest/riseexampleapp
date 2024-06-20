import { fetchFeeds } from 'app/api'

import { useScroller } from '../useScroller/v2/useScroller'

export const useFeedsQuery = () => {
  const { status, data, ...query } = useScroller<Feed>(
    fetchFeeds,
    'infiniteFeeds',
    { baseOffset: 0, limit: 10 }
  )

  const feeds = (data ?? []) as Feed[]

  return {
    ...query,
    feeds,
    requestStatus: status,
    status
  }
}
