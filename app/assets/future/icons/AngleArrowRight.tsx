import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { Props } from './types'

function AngleArrowRight({ width, height, iconColor }: Props) {
  return (
    <Svg fill="none" height={height} viewBox="0 0 6 12" width={width}>
      <Path
        d="M1 1.5L5 6l-4 4.5"
        stroke={iconColor || '#0898A0'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </Svg>
  )
}

export default AngleArrowRight
