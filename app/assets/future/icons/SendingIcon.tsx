import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

import { Props } from './types'

export function SendingIcon({ ...rest }: Props) {
  return (
    <Svg fill="none" viewBox="0 0 37 37" {...rest}>
      <Rect
        fill="#EB5757"
        fillOpacity={0.15}
        height={36}
        rx={18}
        transform="rotate(-180 36.5 36.435)"
        width={36}
        x={36.5}
        y={36.435}
      />
      <Path
        d="M13.858 23.077l9.284-9.284m0 0h-8.2m8.2 0v8.2"
        stroke="#EB5757"
        strokeWidth={1.5}
      />
    </Svg>
  )
}
