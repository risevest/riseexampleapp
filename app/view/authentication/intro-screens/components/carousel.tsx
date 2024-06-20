import { Box, Text } from '@risemaxi/sarcelle'
import { getComputedHeight } from 'app/design'
import LottieView from 'lottie-react-native'
import React, { useEffect, useRef } from 'react'
import { Dimensions, ViewStyle } from 'react-native'
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated'

import type { OnboardingItem } from '../constant'

type RenderItemProps = {
  index: number
  item: OnboardingItem
  playItem: boolean
}

type CarouselProps = {
  currentPage: number
  data: OnboardingItem[]
  onScroll: ReturnType<typeof useAnimatedScrollHandler>
}

const dimension = Dimensions.get('window')

const lottieHeight: ViewStyle = {
  alignSelf: 'center',
  height: getComputedHeight(400),
  width: '100%'
}

const RenderItem = ({ item, playItem }: RenderItemProps) => {
  const lottieRef = useRef<LottieView>(null)
  useEffect(() => {
    if (playItem) {
      lottieRef.current?.play()
    } else {
      lottieRef.current?.pause()
    }
  }, [playItem])

  return (
    <Box width={dimension.width}>
      <Box height={120} mx="m" px="s">
        <Text fontWeight="500" mb="s" variant="header-h1-24-bold">
          {item.title}
        </Text>
        <Text variant="body-15-regular">{item.body}</Text>
      </Box>
      <LottieView
        loop={false}
        ref={lottieRef}
        source={item.lottie}
        speed={0.8}
        style={lottieHeight}
      />
    </Box>
  )
}

const keyExtractor = (item: OnboardingItem) => item.body

export const Carousel = ({ currentPage, data, onScroll }: CarouselProps) => (
  <Box>
    <Animated.FlatList
      bounces
      data={data}
      horizontal
      keyExtractor={keyExtractor}
      onScroll={onScroll}
      pagingEnabled
      renderItem={({ index, item }) => (
        <RenderItem
          index={index}
          item={item}
          playItem={index === currentPage}
        />
      )}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
    />
  </Box>
)
