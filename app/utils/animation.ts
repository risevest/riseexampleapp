import {
  CarouselProps,
  getInputRangeFromIndexes
} from 'react-native-snap-carousel' // 3.7.2

export function scrollInterpolator(
  index: number,
  carouselProps: CarouselProps<any>
) {
  const range = [1, 0, -1]
  const inputRange = getInputRangeFromIndexes(range, index, carouselProps)
  const outputRange = range

  return { inputRange, outputRange }
}
