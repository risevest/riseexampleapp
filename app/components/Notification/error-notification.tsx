import { Box, Text } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import { screenHeight } from 'app/design/responsiveModule'
import * as React from 'react'
import { View, ViewStyle } from 'react-native'
import {
  Gesture,
  GestureDetector,
  TouchableOpacity
} from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'

import { styles } from './styles'

interface ErrorNotificationProps {
  message: string
  onPress: () => void
}

const OVER_DRAG = 40

export function ErrorNotification({
  message,
  onPress
}: ErrorNotificationProps) {
  const offsetY = useSharedValue(0)

  const pan = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = offsetY.value + event.changeY
      const clamped = Math.max(-OVER_DRAG, offsetDelta)
      offsetY.value = offsetDelta > 0 ? offsetDelta : withSpring(clamped)
    })
    .onFinalize(() => {
      if (offsetY.value < OVER_DRAG / 2) {
        offsetY.value = withSpring(0)
      } else {
        offsetY.value = withSpring(screenHeight + OVER_DRAG, undefined, () => {
          runOnJS(onPress)()
          offsetY.value = 0
        })
      }
    })

  const opacity = useSharedValue(0)

  const gestureStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offsetY.value }]
    }
  })
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, {
        duration: 300
      })
    }
  })

  React.useEffect(() => {
    opacity.value = interpolate(opacity.value, [0, opacity.value], [1, 0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LinearGradient
      colors={[
        'transparent',
        'transparent',
        'rgba(113, 135, 156, 0.2);',
        'rgba(113, 135, 156, 0.2);'
      ]}
      pointerEvents="box-none"
      style={[CONTAINER, FLEX, FULL_HEIGHT]}
    >
      <View style={FLEX}>
        <Box height={200} style={[CONTAINER, BOTTOM]}>
          <Animated.View style={[animatedStyles]}>
            <GestureDetector gesture={pan}>
              <Box style={FLEX}>
                <Animated.View
                  style={[
                    styles.container,
                    NOTIFICATION_CONTAINER,
                    gestureStyle
                  ]}
                >
                  <Box alignItems="center" flexDirection="row">
                    <Icon name="warning-white" />
                    <Box marginLeft={13} width="80%">
                      <Text color="white" variant="button-15-bold">
                        {message}
                      </Text>
                    </Box>
                  </Box>
                  <TouchableOpacity onPress={onPress} style={CLOSE_BUTTON}>
                    <Icon name="x" size={12} />
                  </TouchableOpacity>
                </Animated.View>
              </Box>
            </GestureDetector>
          </Animated.View>
        </Box>
      </View>
    </LinearGradient>
  )
}

const FULL_HEIGHT: ViewStyle = {
  height: '100%'
}

const CONTAINER: ViewStyle = {
  left: 0,
  position: 'absolute',
  right: 0
}

const FLEX: ViewStyle = {
  flex: 1
}

const BOTTOM: ViewStyle = {
  bottom: 0
}

const NOTIFICATION_CONTAINER: ViewStyle = {
  alignItems: 'center',
  backgroundColor: '#F34040',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginHorizontal: 16,
  marginTop: 20,
  paddingHorizontal: 17,
  paddingVertical: 16
}

const CLOSE_BUTTON: ViewStyle = {
  alignItems: 'center',
  height: '100%',
  justifyContent: 'center',
  width: 30
}

export default ErrorNotification
