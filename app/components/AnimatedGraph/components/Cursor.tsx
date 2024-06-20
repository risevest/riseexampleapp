import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'
import { getYForX, parse, Vector } from 'react-native-redash'

import { useTheme } from '../../../design/theme'

const { width } = Dimensions.get('window')
const CURSOR = 50

interface CursorProps {
  borderColor: string
  borderWidth: number
  d: string
  r: number
  translation: Vector<Animated.SharedValue<number>>
}

const realWidth = width - 40
const Cursor = ({
  d,
  translation,
  r,
  borderColor,
  borderWidth
}: CursorProps) => {
  const radius = r + borderWidth / 2
  const { theme } = useTheme()
  const isActive = useSharedValue(false)
  const path = React.useMemo(() => parse(d), [d])
  React.useEffect(() => {
    translation.y.value = getYForX(path, 0) || 0
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: (event) => {
      if (event.x > 0 && event.x < realWidth) {
        translation.x.value = event.x
        const y = getYForX(path, translation.x.value) || 0
        translation.y.value = y
      }
    },
    onEnd: () => {
      isActive.value = false
    },
    onStart: () => {
      isActive.value = true
    }
  })

  const style = useAnimatedStyle(() => {
    const translateX = translation.x.value - CURSOR / 2
    const translateY = translation.y.value - CURSOR / 2
    return {
      transform: [
        { translateX },
        { translateY },
        { scale: withSpring(isActive.value ? 1.2 : 1) }
      ]
    }
  })

  return (
    <View style={StyleSheet.absoluteFill}>
      <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.cursor, style]}>
            <View
              style={{
                backgroundColor: theme.primaryColor,
                borderColor,
                borderRadius: radius,
                borderWidth,
                height: radius * 2,
                width: radius * 2
              }}
            />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

export default Cursor
const styles = StyleSheet.create({
  cursor: {
    alignItems: 'center',
    borderRadius: CURSOR / 2,
    height: CURSOR,
    justifyContent: 'center',
    width: CURSOR
  },
  cursorBody: {
    backgroundColor: 'black',
    borderRadius: 7.5,
    height: 15,
    width: 15
  }
})
