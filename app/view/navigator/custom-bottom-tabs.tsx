import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Circle, Text, useTheme } from '@risemaxi/sarcelle'
import {
  getComputedHeight,
  getComputedWidth,
  screenWidth
} from 'app/design/responsiveModule'
import { shadow } from 'app/design/Styles'
import * as React from 'react'
import {
  Animated,
  PixelRatio,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface IntroProps {
  name: string
}
export const SEGMENT = PixelRatio.roundToNearestPixel(screenWidth / 5)
export const ICON_SIZE = SEGMENT - 2

interface CustomTabBarProps extends BottomTabBarProps {}

const DOT_SIZE = getComputedWidth(8)

const HeartbeatAnimation = (
  value: Animated.Value,
  minValue: number,
  maxValue: number
) =>
  Animated.loop(
    Animated.sequence([
      Animated.timing(value, {
        duration: 100,
        toValue: maxValue,
        useNativeDriver: true
      }),
      Animated.timing(value, {
        duration: 100,
        toValue: minValue,
        useNativeDriver: true
      }),
      Animated.timing(value, {
        duration: 100,
        toValue: maxValue,
        useNativeDriver: true
      }),
      Animated.timing(value, {
        duration: 2000,
        toValue: minValue,
        useNativeDriver: true
      })
    ]),
    { iterations: 3 }
  ).start()

const IntroDot = (_props: IntroProps) => {
  const scale = React.useRef(new Animated.Value(1)).current
  const pendingView = false

  React.useEffect(() => {
    HeartbeatAnimation(scale, 0.9, 1.5)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!pendingView) return null
  return (
    <Animated.View
      style={[
        styles.dot,
        {
          transform: [{ scaleX: scale }, { scaleY: scale }]
        }
      ]}
    />
  )
}

export function CustomTabBar({
  navigation,
  state,
  descriptors
}: CustomTabBarProps) {
  const { bottom } = useSafeAreaInsets()

  const { colors } = useTheme()

  return (
    <View
      style={[
        CONTAINER,
        {
          paddingBottom: getComputedHeight(bottom ? bottom : 30)
        }
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name

        const isFocused = state.index === index
        const Icon = options.tabBarIcon

        const onPress = () => {
          const event = navigation.emit({
            canPreventDefault: true,
            target: route.key,
            type: 'tabPress'
          })

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            // @ts-expect-error
            navigation.navigate({ merge: true, name: route.name })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            target: route.key,
            type: 'tabLongPress'
          })
        }

        const color = isFocused ? colors['text-black'] : colors.text0004

        return (
          <TouchableOpacity
            accessibilityLabel={options.tabBarAccessibilityLabel}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            key={route.key}
            onLongPress={onLongPress}
            onPress={onPress}
            style={PRESS_CONTAINER}
            testID={options.tabBarTestID}
          >
            <>
              <IntroDot {...{ name: route.name }} />
              {Icon?.({
                color,
                focused: isFocused,
                size: 20
              })}
            </>

            {isFocused ? (
              <Circle
                backgroundColor="neutral-dark-mode"
                marginTop="s"
                size={7}
              />
            ) : (
              <Text
                color="primary"
                style={{
                  color,
                  ...LABEL
                }}
                variant="label-reg-14-usd"
              >
                {String(label)}
              </Text>
            )}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: 'red',
    borderRadius: DOT_SIZE,
    height: DOT_SIZE,
    left: ICON_SIZE * 0.6,
    position: 'absolute',
    top: 5,
    width: DOT_SIZE,
    zIndex: 2
  }
})

const CONTAINER: ViewStyle = {
  elevation: 3,
  ...shadow(0, -1, 0, '#E4E7EB', 1),
  alignSelf: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingTop: getComputedHeight(12)
}
const PRESS_CONTAINER: ViewStyle = {
  alignItems: 'center',
  flex: 1,
  width: ICON_SIZE
}
const LABEL: TextStyle = {
  fontSize: getComputedWidth(12),
  lineHeight: 16,
  marginTop: 4
}
