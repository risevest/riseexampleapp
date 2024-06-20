import React from 'react'
import { ActivityIndicator, ViewStyle } from 'react-native'
import { QueryStatus } from 'react-query'

export const HeaderLoader = ({
  isFetchingNextPage,
  status,
  refreshing
}: {
  isFetchingNextPage: boolean
  refreshing: boolean
  status: QueryStatus
}) => {
  if (isFetchingNextPage && status === 'loading' && !refreshing) {
    return (
      <ActivityIndicator
        animating
        color="#0898A0"
        size="large"
        style={ACTIVITY_INDICATOR}
      />
    )
  }
  return null
}

const ACTIVITY_INDICATOR: ViewStyle = { marginTop: 10 }
