import { SkeletonContent } from '@balogunofafrica/react-native-skeleton-content-nonexpo'
import { getComputedWidth } from 'app/design/responsiveModule'
import { shadow } from 'app/design/Styles'
import { themeColors } from 'app/design/theme'
import * as React from 'react'
import { ViewStyle } from 'react-native'

type Props = {
  children: React.ReactNode
  isLoading: boolean
}

export function LoadingFeeds({ children, isLoading }: Props) {
  const { offWhite, primarySurface } = themeColors.light
  return (
    <SkeletonContent
      animationType="shiver"
      containerStyle={CONTAINER}
      highlightColor={primarySurface}
      isLoading={isLoading}
      layout={Array.from(Array(3).keys()).map((i) => ({
        children: [
          {
            borderRadius: 10,
            height: getComputedWidth(157),
            marginVertical: 20,
            opacity: 0.6,
            width: '100%',
            ...shadow(0, 12, 16, '#000', 0.2),
            backgroundColor: primarySurface
          },
          {
            backgroundColor: offWhite,
            borderTopLeftRadius: 10,
            height: 100,
            position: 'absolute',
            top: 20,
            width: 100
          },
          {
            backgroundColor: offWhite,
            bottom: 40,
            height: 17,
            left: 20,
            position: 'absolute',
            width: 101
          },
          {
            backgroundColor: offWhite,
            height: 16,
            position: 'absolute',
            right: 20,
            top: 40,
            width: 190
          },
          {
            backgroundColor: offWhite,
            height: 16,
            position: 'absolute',
            right: 20,
            top: 65,
            width: 190
          },
          {
            backgroundColor: offWhite,
            height: 16,
            position: 'absolute',
            right: 80,
            top: 90,
            width: 129
          },
          {
            backgroundColor: offWhite,
            bottom: 40,
            height: 16,
            position: 'absolute',
            right: 110,
            width: 101
          }
        ],
        key: `loadingChild${i + 1}`
      }))}
    >
      {children}
    </SkeletonContent>
  )
}

const CONTAINER: ViewStyle = {
  flex: 1
}
