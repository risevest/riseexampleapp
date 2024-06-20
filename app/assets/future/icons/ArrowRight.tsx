import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { Props } from './types'

function ArrowRightIcon({ width, height, stroke, strokeWidth }: Props) {
  return (
    <Svg fill="none" height={width} viewBox="0 0 17 15" width={height}>
      <Path
        d="M1.301 7.226H16m0 0L9.586.813M16 7.226l-6.414 6.415"
        stroke={stroke ? stroke : '#fff'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth ? strokeWidth : 1.5}
      />
    </Svg>
  )
}

export default ArrowRightIcon
