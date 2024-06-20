import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

import { Props } from './types'

export function CloseIcon({ ...rest }: Props) {
  return (
    <Svg fill="none" viewBox="0 0 37 36" {...rest}>
      <Rect
        fill="#71879C"
        fillOpacity={0.1}
        height={36}
        rx={18}
        width={36}
        x={0.239}
      />
      <Path
        d="M23.245 23.006L13.234 12.994M13.233 23.006l10.012-10.012"
        stroke="#0898A0"
        strokeWidth={1.5}
      />
    </Svg>
  )
}
