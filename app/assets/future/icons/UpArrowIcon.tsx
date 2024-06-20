import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { Props } from './types'

export function UpArrowIcon({ width, height, style, iconColor }: Props) {
  return (
    <Svg
      fill="none"
      height={height}
      style={style}
      viewBox="0 0 8 8"
      width={width}
    >
      <Path
        d="M1 .716h6m0 0v6.002M7 .717l-6 6"
        stroke={iconColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
