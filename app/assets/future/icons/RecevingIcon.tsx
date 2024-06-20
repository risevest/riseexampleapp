import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

import { Props } from './types'

export function ReceivingIcon({ ...rest }: Props) {
  return (
    <Svg fill="none" viewBox="0 0 37 37" {...rest}>
      <Rect
        fill="#4CD964"
        fillOpacity={0.15}
        height={36}
        rx={18}
        width={36}
        x={0.5}
        y={0.435}
      />
      <Path
        d="M23.142 13.793l-9.284 9.284m0 0h8.2m-8.2 0v-8.2"
        stroke="#27BF41"
        strokeWidth={1.5}
      />
    </Svg>
  )
}
