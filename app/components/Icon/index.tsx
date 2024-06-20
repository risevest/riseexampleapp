// this is a cleaner way to define and use icons in the app
import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { SvgProps } from 'react-native-svg'

import clock from '../../assets/icons/svg/clock.svg'

// actual Icons
export const ICONS = {
  'icon-clock': clock
}

export type IconName = keyof typeof ICONS
export type IconProps = SvgProps & {
  name: IconName
  outerStroke?: string
  size?: number
  stroke?: string
  style?: StyleProp<ViewStyle>
}

export const Icon = ({ name, size = 24, style, ...props }: IconProps) => {
  const IconImpl = ICONS[name as IconName]
  return IconImpl ? (
    <IconImpl height={size} width={size} {...{ style }} {...props} />
  ) : null
}
