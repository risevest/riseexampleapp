import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { Props } from './types'

export function OpenEyeIcon({ width, height, style }: Props) {
  return (
    <Svg
      fill="none"
      height={height}
      style={style}
      viewBox="0 0 14 10"
      width={width}
    >
      <Path
        d="M7 3.125a1.875 1.875 0 100 3.75 1.875 1.875 0 000-3.75zm0 5a3.125 3.125 0 110-6.25 3.125 3.125 0 010 6.25zM7 .312A7.392 7.392 0 00.125 5 7.392 7.392 0 007 9.688 7.392 7.392 0 0013.875 5 7.392 7.392 0 007 .312z"
        fill="#0898A0"
      />
    </Svg>
  )
}
