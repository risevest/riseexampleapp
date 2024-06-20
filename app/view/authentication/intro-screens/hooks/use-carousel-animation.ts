import { useState } from 'react'
import { Dimensions } from 'react-native'
import {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated'

const dimension = Dimensions.get('window')

export function useCarouselAnimation() {
  const [currentPage, setCurrentPage] = useState(0)
  const sliderTranslateX = useSharedValue(0)
  const isScrollingBack = useSharedValue(false)
  const onScroll = useAnimatedScrollHandler((event) => {
    runOnJS(setCurrentPage)(
      Math.max(
        Math.round(Math.round(event.contentOffset.x) / dimension.width),
        0
      )
    )
    isScrollingBack.value = event.contentOffset.x < sliderTranslateX.value
    sliderTranslateX.value = event.contentOffset.x
  })

  return {
    currentPage,
    isScrollingBack,
    onScroll,
    sliderTranslateX
  }
}
