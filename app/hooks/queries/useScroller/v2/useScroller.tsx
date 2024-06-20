import { transformQueryStatusToRiseStatus } from 'app/utils/utilFunctions'
import React, { useCallback, useState } from 'react'
import { QueryKey, useInfiniteQuery } from 'react-query'

export function useScroller<T>(
  query: (arg0: number) => Promise<ListResponse<T>>,
  queryKey: QueryKey,
  options: {
    baseOffset: number
    isAutoFetching?: boolean
    limit: number
  }
) {
  const [refreshing, setRefreshing] = useState(false)
  const fetchData = ({ pageParam = 0 }) => query(pageParam)
  const fetchLimit = options.limit || 10

  const {
    data: pureData,
    refetch,
    fetchNextPage,
    status,
    isFetchingNextPage,
    ...queryDetails
  } = useInfiniteQuery(queryKey, fetchData, {
    enabled: options.isAutoFetching ?? true,
    getNextPageParam: (lastPage, totalPages) => {
      // if limit ever becomes zero the app will break
      const totalPagesToFetch = Math.ceil(lastPage.item_count / fetchLimit)
      if (totalPages.length > totalPagesToFetch) {
        return undefined
      } else {
        // next page
        // the next page will always be the last offset plus the limit
        // the last offset can always be calculated or stored
        return fetchLimit * totalPages.length
      }
    },
    ...options
  })

  const getDataFromPages = useCallback((pages?: ListResponse<T>[]) => {
    const container: T[] = []
    pages?.forEach((page) => {
      container.push(...page.items)
    })
    return container
  }, [])

  const { pages } = pureData || {}
  const data = getDataFromPages(pages)

  const handleLoadMore = React.useCallback(() => {
    fetchNextPage()
  }, [fetchNextPage])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }, [refetch])

  return {
    data,
    fetchNextPage,
    handleLoadMore,
    isFetchingNextPage,
    onRefresh,
    pureStatus: status,
    refetch,
    refreshing,
    status: transformQueryStatusToRiseStatus(status),
    ...queryDetails
  }
}
