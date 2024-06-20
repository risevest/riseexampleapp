import * as React from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Circle, CircleProps, G, Svg } from 'react-native-svg'

import { useProgressStyles } from './styles'
import { ProgressT } from './types'

interface ProgressProps {
  percentage: number
}

const SIZE = 24
const CENTER = SIZE / 2
const strokeWidth = 4
const RADIUS = CENTER - strokeWidth / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export const TextProgress = ({ percentage = 0 }: ProgressProps) => {
  const progressAnimation = React.useRef(new Animated.Value(0)).current
  const progressRef = React.useRef<
    React.LegacyRef<React.Component<CircleProps, any, any>> | any
  >(null)

  const animation = (toValue: number) => {
    return Animated.timing(progressAnimation, {
      duration: 250,
      toValue,
      useNativeDriver: true
    }).start()
  }

  React.useEffect(() => {
    animation(percentage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage])

  React.useEffect(() => {
    const id = progressAnimation.addListener((value) => {
      const strokeDashoffset: number =
        CIRCUMFERENCE - (CIRCUMFERENCE * value.value) / 100
      if (progressRef?.current) {
        progressRef.current?.setNativeProps?.({
          strokeDashoffset
        })
      }
    })
    return () => progressAnimation.removeListener(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage])

  return (
    <View style={styles.container}>
      <Svg height={SIZE} width={SIZE}>
        <G fill="transparent" origin={CENTER} rotation="-90">
          <Circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            stroke="rgba(113, 135, 156, 0.2)"
            strokeWidth={strokeWidth}
          />
          <Circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            ref={progressRef}
            stroke="rgba(8, 152, 160, 1)"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={
              CIRCUMFERENCE - (CIRCUMFERENCE * percentage) / 100
            }
            strokeWidth={strokeWidth}
          />
        </G>
      </Svg>
    </View>
  )
}

export function Progress({ progressWidth, containerWidth }: ProgressT) {
  const { styles } = useProgressStyles({ containerWidth, progressWidth })
  const isEqual = progressWidth === containerWidth
  const BORDER = isEqual ? 20 : 0

  return (
    <View style={styles.progressWrapper}>
      <View
        style={[
          styles.activeProgress,
          {
            borderBottomRightRadius: BORDER,
            borderTopRightRadius: BORDER
          }
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2.72
  }
})
