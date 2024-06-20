import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

import { Props } from './types'

export function BackIcon({ ...rest }: Props) {
  return (
    <Svg fill="none" height={36} viewBox="0 0 37 36" width={37} {...rest}>
      <Rect
        fill="#71879C"
        fillOpacity={0.1}
        height={36}
        rx={18}
        width={36}
        x={0.771}
      />
      <Path
        d="M25.436 18H12.107m0 0l6.665-6.664M12.107 18l6.665 6.664"
        stroke="#0898A0"
        strokeWidth={1.817}
      />
    </Svg>
  )
}
