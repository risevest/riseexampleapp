import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

export function useAnimatedProgress(
  progressStartPoint: string,
  progressEndPoint: string
) {
  const barWidth = useRef(new Animated.Value(0)).current
  const progressPercent = barWidth.interpolate({
    inputRange: [0, 100],
    outputRange: [progressStartPoint, progressEndPoint]
  })

  useEffect(() => {
    Animated.timing(barWidth, {
      duration: 1500,
      toValue: 100,
      useNativeDriver: false
    }).start()
  }, [barWidth])

  return { progressPercent }
}
