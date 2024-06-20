import { SkeletonContent } from '@balogunofafrica/react-native-skeleton-content-nonexpo'
import { themeColors } from 'app/design/theme'
import * as React from 'react'
import { ViewStyle } from 'react-native'

interface Props {
  isLoading: boolean
}

export function LoadingTokens({ isLoading }: Props) {
  const { offWhite, primarySurface } = themeColors.light
  return (
    <SkeletonContent
      animationType="shiver"
      containerStyle={SKELETON_CONTAINER}
      highlightColor={primarySurface}
      isLoading={isLoading}
      layout={Array.from(Array(3).keys()).map((i) => ({
        children: [
          {
            backgroundColor: offWhite,
            borderRadius: 42 / 2,
            height: 42,
            position: 'absolute',
            top: 20,
            width: 42
          },
          {
            backgroundColor: offWhite,
            borderRadius: 0,
            height: 14,
            left: 60,
            position: 'absolute',
            top: 20,
            width: 72
          },
          {
            backgroundColor: offWhite,
            borderRadius: 0,
            height: 14,
            left: 60,
            position: 'absolute',
            top: 45,
            width: 115
          }
        ],
        key: `loadingChild${i + 1}`
      }))}
    />
  )
}

const SKELETON_CONTAINER: ViewStyle = {
  flex: 1
}
