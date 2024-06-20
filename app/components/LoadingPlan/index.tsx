import { SkeletonContent } from '@balogunofafrica/react-native-skeleton-content-nonexpo'
import {
  getComputedHeight,
  getComputedWidth
} from 'app/design/responsiveModule'
import * as React from 'react'
import { ViewStyle } from 'react-native'

type Props = {
  children: React.ReactNode
  isLoading: boolean
}

export function LoadingPlan({ children, isLoading }: Props) {
  return (
    <SkeletonContent
      animationType="shiver"
      containerStyle={SKELETON_CONTAINER}
      isLoading={isLoading}
      layout={Array.from(Array(3).keys()).map((i) => ({
        children: [
          {
            borderRadius: 15,
            height: getComputedWidth(243),
            marginHorizontal: 20,
            opacity: 0.6,
            width: getComputedHeight(188)
          },
          {
            borderRadius: 10,
            bottom: 65,
            height: 17,
            marginLeft: 20,
            position: 'absolute',
            width: 70
          },
          {
            borderRadius: 10,
            bottom: 35,
            height: 17,
            marginLeft: 20,
            position: 'absolute',
            width: 140
          },
          {
            borderRadius: 10,
            bottom: 10,
            height: 17,
            marginLeft: 20,
            position: 'absolute',
            width: 90
          },
          {
            bottom: 0,
            height: 100,
            marginLeft: 40,
            opacity: 0.3,
            position: 'absolute',
            width: 188
          }
        ],
        key: `loadingChild${i + 1}`
      }))}
    >
      {children}
    </SkeletonContent>
  )
}

const SKELETON_CONTAINER: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  marginVertical: 20
}
