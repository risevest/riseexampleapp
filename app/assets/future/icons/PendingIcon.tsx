import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

import { Props } from './types'

export function PendingIcon({ height, width }: Props) {
  return (
    <Svg fill="none" height={height} viewBox="0 0 36 36" width={width}>
      <Rect
        fill="#EBB057"
        fillOpacity={0.15}
        height={36}
        rx={18}
        transform="rotate(-180 36 36)"
        width={36}
        x={36}
        y={36}
      />
      <Path d="M14 11v14M22 11v14" stroke="#FE7122" strokeWidth={1.5} />
    </Svg>
  )
}
