import { Box } from '@risemaxi/sarcelle'
import constants from 'app/config/constants'
import { isNumber } from 'lodash'
import React, { useMemo } from 'react'
import Animated, {
  ComplexAnimationBuilder,
  FadeInDown,
  FadeOutDown
} from 'react-native-reanimated'

const AnimatedBox = Animated.createAnimatedComponent(Box)

export type SpringBoxProps = Omit<
  React.ComponentProps<typeof AnimatedBox>,
  'entering' | 'exiting' | 'key'
> & {
  entering?: typeof ComplexAnimationBuilder
  exiting?: typeof ComplexAnimationBuilder
} & {
  dampingFactor?: number
  delayFactor?: number
}

export function SpringBox(props: SpringBoxProps) {
  const { entering = FadeInDown, exiting = FadeOutDown, ...rest } = props
  const delay = useMemo(
    () =>
      rest.delayFactor
        ? constants.ANIMATION_MAX_DELAY_DURATION / Math.max(rest.delayFactor, 1)
        : 0,

    [rest.delayFactor]
  )
  isNumber()

  const damping = useMemo(
    () =>
      (isNumber(rest.dampingFactor) ? rest.dampingFactor : 1) *
      constants.ANIMATION_DAMPING,

    [rest.dampingFactor]
  )

  return (
    <AnimatedBox
      entering={entering.springify().delay(delay).damping(damping)}
      exiting={exiting.springify().damping(damping)}
      {...rest}
    />
  )
}
