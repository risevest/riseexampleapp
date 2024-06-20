import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { Props } from './types'

function ClockIcon({ width, height, iconColor }: Props) {
  return (
    <Svg fill="none" height={height} width={width}>
      <Path
        d="M9 16.25a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Z"
        stroke={iconColor || '#fff'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 5.563V9.5h3.938"
        stroke={iconColor || '#fff'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default ClockIcon
