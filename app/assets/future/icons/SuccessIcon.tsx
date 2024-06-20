import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

import { Props } from './types'

export function SuccessIcon({ ...rest }: Props) {
  return (
    <Svg fill="none" viewBox="0 0 91 91" {...rest}>
      <Rect
        fill="#71879C"
        fillOpacity={0.1}
        height={90}
        rx={45}
        width={90}
        x={0.416}
        y={0.11}
      />
      <Path
        d="M28.28 46.773l10.134 8.708L62.552 34.74"
        stroke="#0898A0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
      />
    </Svg>
  )
}
