import { fetchFeed, fetchHighlightedFeed } from 'app/api'
import { AxiosError } from 'axios'
import _ from 'lodash'
import { useQuery } from '@tanstack/react-query'

export async function getHighLightedFeed(): Promise<Feed> {
  try {
    return await fetchHighlightedFeed()
  } catch (error) {
    const err = error as AxiosError<any>
    if (err.isAxiosError && err.response?.status === 404) {
      return {} as Feed
    } else {
      throw error
    }
  }
}

export const useFeedQuery = (id: string) => {
  const { data, ...query } = useQuery<Feed>(['feed', id], () => fetchFeed(id))
  const feed = (data ?? {}) as Feed

  return {
    ...query,
    data,
    feed
  }
}

export const useHighlightedFeedQuery = () => {
  const { data, status, ...query } = useQuery<Feed>(
    'highlightedFeed',
    getHighLightedFeed
  )

  const feed = (data ?? {}) as Feed
  const empty = _.isEmpty(feed) && status === 'success'

  return {
    ...query,
    data,
    empty,
    feed,
    status
  }
}
