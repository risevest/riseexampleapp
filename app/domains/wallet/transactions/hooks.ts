import { flatten } from 'lodash'
import React, { useCallback, useState } from 'react'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { getSingleWalletTransactionDetail, getWalletTransactions } from './api'
import { TRANSACTIONS_QUERY_KEYS } from './constants'
import {
  WalletTransaction,
  WalletTransactionPayload,
  WalletTransactionServer
} from './types'

export function extractWalletTransactions(
  data: WalletTransactionServer[]
): WalletTransaction[] {
  return data?.map((transaction) => {
    return {
      amount: transaction?.amount,
      createdAt: transaction?.created_at,
      currency: transaction?.currency,
      id: transaction?.id,
      localAmount: transaction?.local_amount,
      localCurrency: transaction?.local_currency,
      metadata: {
        description: transaction?.metadata?.description,
        destination: transaction?.metadata?.destination,
        destinationId: transaction?.metadata?.destination_id,
        exchangeRate: transaction?.metadata?.exchange_rate,
        localCurrency: transaction?.metadata?.local_currency,
        source: transaction?.metadata?.source,
        sourceId: transaction?.metadata?.source_id,
        transactionRequestAmount:
          transaction?.metadata?.transaction_request_amount,
        transactionRequestId: transaction?.metadata?.transaction_request_id
      },
      ownerId: transaction?.owner_id,
      provider: transaction?.provider,
      providerMetadata: transaction?.provider_metadata,
      screening: transaction?.screening,
      status: transaction?.status,
      transactionId: transaction?.transaction_id,
      type: transaction?.request_type,
      updatedAt: transaction?.updated_at,
      walletId: transaction?.wallet_id
    }
  })
}

export function useGetWalletTransactions(filters: WalletTransactionPayload) {
  const { data, ...query } = useTransactionScroll(filters)
  const transactions = extractWalletTransactions(data) || []

  return {
    ...query,
    transactions
  }
}

export function useTransactionScroll(filters: WalletTransactionPayload) {
  type Page =
    | {
        item_count: number
        items: WalletTransactionServer[]
      }[]
    | undefined

  const [refreshing, setRefreshing] = useState(false)

  const getData = ({ pageParam = 0 }) =>
    getWalletTransactions(pageParam, filters)

  const {
    data: pureData,
    refetch,
    fetchNextPage,
    status,
    isFetchingNextPage,
    ...queryDetails
  } = useInfiniteQuery({
    getNextPageParam: (lastPage: any, pages) => {
      const allItems = pages.map(
        (p: {
          item_count: number
          items: WalletTransactionServer[]
          offset: number
        }) => flatten(p?.items)
      )
      if (flatten(allItems)?.length < pages?.[0]?.item_count) {
        const allPages = pages ?? []
        return (allPages[allPages.length - 1]?.offset ?? 0) + 10
      } else {
        return undefined
      }
    },
    queryFn: getData,
    queryKey: [TRANSACTIONS_QUERY_KEYS.walletTransactions, filters]
  })
  const getDataFromPages = useCallback((pages: Page) => {
    const container: WalletTransactionServer[] = []
    pages?.forEach((page) => {
      container.push(...page.items)
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
    refetch,
    refreshing,
    status,
    // some times we want the pure query status
    ...queryDetails
  }
}

export function useGetSingleWalletTransactionDetail(id: string) {
  const { data, ...query } = useQuery({
    queryFn: () => getSingleWalletTransactionDetail(id),
    queryKey: [TRANSACTIONS_QUERY_KEYS.walletTransaction, id]
  })

  return {
    transaction: data
      ? extractWalletTransactions([data])?.[0]
      : ({} as WalletTransaction),
    ...query
  }
}
