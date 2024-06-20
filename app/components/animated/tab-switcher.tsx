import { Box, Text, Theme } from '@risemaxi/sarcelle'
import { BoxProps } from '@risemaxi/sarcelle/dist/components/box/types'
import { createBox } from '@shopify/restyle'
import { getShadowStyle } from 'app/utils/utilFunctions'
import React, { memo, useCallback, useRef, useState } from 'react'
import {
  LayoutChangeEvent,
  LayoutRectangle,
  Pressable,
  ScrollView
} from 'react-native'
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'

const ScrollBox = createBox<Theme, React.ComponentProps<typeof ScrollView>>(
  ScrollView
)

const AnimatedBox = Animated.createAnimatedComponent(Box)

const TabItem = memo(
  ({
    currentIndex,
    index,
    item,
    onLayout,
    onPress
  }: {
    currentIndex: Animated.SharedValue<number>
    index: number
    item: string
    onLayout: (event: LayoutChangeEvent, index: number) => void
    onPress: (index: number) => void
  }) => {
    const [isFocused, setIsFocused] = useState(false)

    useAnimatedReaction(
      () => currentIndex.value,
      (value) => {
        if (value === index) runOnJS(setIsFocused)(true)
        else runOnJS(setIsFocused)(false)
      },
      [currentIndex.value, isFocused]
    )

    return (
      <Pressable
        onLayout={(event) => onLayout(event, index)}
        onPress={() => onPress(index)}
      >
        <Box paddingHorizontal={12} paddingVertical={6}>
          <Text
            color="black"
            fontWeight={isFocused ? '700' : '400'}
            variant="body-12-regular"
          >
            {item}
          </Text>
        </Box>
      </Pressable>
    )
  }
)

TabItem.displayName = 'TabItem'

type TabSwitcherProps = BoxProps & {
  initialIndex?: number
  isScrollable?: boolean
  items: Array<string>
  onIndexChange?: (index: number) => void
}

const defaultContainerProps = {
  bg: 'offWhite0003',
  borderRadius: 'xl',
  cg: 's'
} as const

export function TabSwitcher({
  initialIndex = 0,
  isScrollable,
  items,
  onIndexChange,
  ...rest
}: TabSwitcherProps) {
  const scrollRef = useRef<ScrollView>(null)
  const currentIndex = useSharedValue(initialIndex)
  const [textLayouts, setTextLayouts] = useState<Array<LayoutRectangle>>([])

  const onItemLayout = useCallback(
    (event: LayoutChangeEvent, index: number) => {
      const layout = event.nativeEvent.layout

      setTextLayouts((previousValue) => {
        const newValue = [...previousValue]
        newValue[index] = layout

        return newValue
      })
    },
    []
  )

  const onPress = useCallback(
    (index: number) => {
      if (isScrollable) {
        scrollRef.current?.scrollTo({
          animated: true,
          x: (textLayouts?.[index]?.x ?? 0) - 32
        })
      }
      currentIndex.value = index

      onIndexChange?.(index)
    },
    [currentIndex, isScrollable, onIndexChange, textLayouts]
  )

  const Container = isScrollable ? ScrollBox : Box

  const style = useAnimatedStyle(() => {
    const selectedWidth = textLayouts[currentIndex.value]?.width ?? 0
    const selectedOffsetX = textLayouts[currentIndex.value]?.x ?? 0

    return {
      transform: [
        {
          translateX: isScrollable
            ? withTiming(selectedOffsetX)
            : withSpring(selectedOffsetX, {
                damping: 15
              })
        }
      ],
      width: isScrollable
        ? withTiming(selectedWidth)
        : withSpring(selectedWidth, {
            damping: 15
          })
    }
  }, [currentIndex, textLayouts])

  return (
    <Box flexDirection="row" {...rest}>
      <Container
        width="100%"
        {...(isScrollable && {
          bounces: false,
          horizontal: true,
          showsHorizontalScrollIndicator: false,
          showsVerticalScrollIndicator: false
        })}
        ref={scrollRef}
        {...defaultContainerProps}
      >
        <Box
          bg="transparent"
          flexDirection="row"
          justifyContent="space-between"
        >
          <AnimatedBox
            {...getShadowStyle(32, 0.15)}
            alignSelf="center"
            bg="background"
            borderColor="neutral-grey"
            borderRadius="xl"
            borderWidth={0.5}
            height="110%"
            position="absolute"
            shadowColor="soft-tect"
            shadowOffset={{
              height: 20,
              width: 0
            }}
            style={style}
            width={textLayouts[0]?.width}
          />

          {items.map((item, index) => (
            <TabItem
              currentIndex={currentIndex}
              index={index}
              item={item}
              key={item}
              onLayout={onItemLayout}
              onPress={onPress}
            />
          ))}
        </Box>
        {isScrollable && <Box mx="s" />}
      </Container>
    </Box>
  )
}
