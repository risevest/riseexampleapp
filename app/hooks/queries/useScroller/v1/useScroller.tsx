import { transformQueryStatusToRiseStatus } from 'app/utils/utilFunctions'
import React, { useCallback, useState } from 'react'
import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions
} from 'react-query'

export function useScroller<T>(
  query: (arg0: number) => Promise<{ data: T[]; meta: Meta }>,
  queryKey: QueryKey,
  _options: Omit<
    UseInfiniteQueryOptions<unknown, unknown, Paginate<T>, unknown>,
    'queryKey' | 'queryFn' | 'getNextPageParam'
  > = {}
) {
  type Page =
    | {
        data: T[]
        meta: Meta
      }[]
    | undefined

  const [refreshing, setRefreshing] = useState(false)
  const getData = ({ pageParam = 0 }) => {
    return query(pageParam)
  }

  const {
    data: pureData,
    refetch,
    fetchNextPage,
    status,
    isFetchingNextPage,
    ...queryDetails
  } = useInfiniteQuery({
    getNextPageParam: (lastPage, pages) => {
      const meta = (lastPage as Paginate<T>).meta
      if (pages.length === meta.total) {
        return undefined
      }
      return meta.offset + meta.limit
    },
    queryFn: getData,
    queryKey: queryKey,
    ..._options
  })
  const getDataFromPages = useCallback((pages: Page) => {
    const container: T[] = []
    pages?.forEach((page) => {
      container.push(...page.data)
    })
    return container
  }, [])
  const { pages } = pureData || {}
  const data = getDataFromPages(pages)

  const goToFirst = useCallback(
    () => fetchNextPage({ pageParam: 0 }),
    [fetchNextPage]
  )
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
    goToFirst,
    handleLoadMore,
    isFetchingNextPage,
    onRefresh,
    // some times we want the pure query status
    pureStatus: status,

    refetch,

    refreshing,

    status: transformQueryStatusToRiseStatus(status),
    ...queryDetails
  }
}
