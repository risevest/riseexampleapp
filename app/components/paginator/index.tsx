import { Box, Theme, useTheme } from '@risemaxi/sarcelle'
import React from 'react'
import { Dimensions } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated'

type PaginatorCursorProps = {
  isScrollingBack: Animated.SharedValue<boolean>
  page: number[]
  sliderTranslateX: Animated.SharedValue<number>
}

type PaginatorDotsProps = {
  index: number
  sliderTranslateX: Animated.SharedValue<number>
}
type Color = keyof Theme['colors']

type PaginatorProps = {
  cursorColor?: Color
  cursorWidth?: number
  dotColor?: Color
  dotSize?: number
  isScrollingBack: Animated.SharedValue<boolean>
  itemWidth?: number
  pageSize: number
  sliderTranslateX: Animated.SharedValue<number>
  spacingValue?: keyof Theme['spacing']
}

type PickedProps = 'cursorWidth' | 'dotSize' | 'itemWidth' | 'spacingValue'

const AnimatedBox = Animated.createAnimatedComponent(Box)

const dimension = Dimensions.get('window')

const PaginatorCursor = ({
  cursorWidth,
  cursorColor,
  dotSize,
  isScrollingBack,
  itemWidth,
  page,
  sliderTranslateX,
  spacingValue
}: PaginatorCursorProps &
  Required<Pick<PaginatorProps, PickedProps | 'cursorColor'>>) => {
  const theme = useTheme()
  const cursorStye = useAnimatedStyle(() => {
    const translateX = interpolate(
      sliderTranslateX.value,
      page.map((_, index) => index * itemWidth),
      page.map((_, index) => index * (dotSize + theme.spacing[spacingValue])),
      Extrapolate.CLAMP
    )
    const zIndex = interpolate(Number(isScrollingBack.value), [0, 1], [1, -1])

    return {
      transform: [{ translateX }],
      zIndex
    }
  })

  return (
    <AnimatedBox
      bg={cursorColor}
      borderRadius="s"
      height={dotSize}
      position="absolute"
      style={cursorStye}
      width={cursorWidth}
    />
  )
}

const PaginatorDots = ({
  cursorWidth,
  dotSize,
  dotColor,
  index,
  itemWidth,
  sliderTranslateX,
  spacingValue
}: PaginatorDotsProps &
  Required<Pick<PaginatorProps, PickedProps | 'dotColor'>>) => {
  const theme = useTheme()
  const style = useAnimatedStyle(() => {
    const translateX = interpolate(
      sliderTranslateX.value,
      [index * itemWidth, (index + 1) * itemWidth],
      [cursorWidth + theme.spacing[spacingValue], 0],
      Extrapolate.CLAMP
    )

    return {
      transform: [{ translateX }]
    }
  })

  return (
    <AnimatedBox
      aspectRatio={1}
      bg={dotColor}
      borderRadius="xl"
      height={dotSize}
      mr={spacingValue}
      style={style}
    />
  )
}

export const Paginator = ({
  cursorColor = 'teal001',
  cursorWidth = 12,
  dotSize = 6,
  dotColor = 'teal004',
  isScrollingBack,
  itemWidth = dimension.width,
  pageSize,
  sliderTranslateX,
  spacingValue = 's'
}: PaginatorProps) => {
  const theme = useTheme()
  const page = Array.from({ length: pageSize }, (_, index) => index)
  const dots = page.slice(0, page.length - 1)
  const width =
    cursorWidth +
    dots.length * dotSize +
    dots.length * theme.spacing[spacingValue]

  return (
    <Box alignSelf="center" width={width}>
      <Box flexDirection="row">
        {dots.map((item, index) => (
          <PaginatorDots
            cursorWidth={cursorWidth}
            dotColor={dotColor}
            dotSize={dotSize}
            index={index}
            itemWidth={itemWidth}
            key={item}
            sliderTranslateX={sliderTranslateX}
            spacingValue={spacingValue}
          />
        ))}
      </Box>
      {page.length > 1 && (
        <PaginatorCursor
          cursorColor={cursorColor}
          cursorWidth={cursorWidth}
          dotSize={dotSize}
          isScrollingBack={isScrollingBack}
          itemWidth={itemWidth}
          page={page}
          sliderTranslateX={sliderTranslateX}
          spacingValue={spacingValue}
        />
      )}
    </Box>
  )
}
