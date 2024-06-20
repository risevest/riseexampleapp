import { getComputedHeight } from 'app/design/responsiveModule'
import React from 'react'
import { ActivityIndicator, View, ViewStyle } from 'react-native'

export const BottomLoader = ({
  isFetchingNextPage
}: {
  isFetchingNextPage: boolean
}) => {
  return (
    <View style={{ marginBottom: getComputedHeight(35) }}>
      {isFetchingNextPage && (
        <ActivityIndicator
          animating
          color="#0898A0"
          size="large"
          style={ACTIVITY_INDICATOR}
        />
      )}
    </View>
  )
}

const ACTIVITY_INDICATOR: ViewStyle = {
  marginBottom: getComputedHeight(35),
  marginTop: 10
}
