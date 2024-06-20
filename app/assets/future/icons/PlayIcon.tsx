import * as React from 'react'
import Svg, { Defs, G, Path, Rect } from 'react-native-svg'

import { Props } from './types'

export function PlayIcon({ ...rest }: Props) {
  return (
    <Svg fill="none" {...rest}>
      <G filter="url(#prefix__filter0_b)">
        <Rect
          fill="#fff"
          fillOpacity={0.8}
          height={36}
          rx={18}
          width={36}
          x={0.5}
          y={0.5}
        />
        <Path d="M27.045 18.5l-12.978 7.493V11.007L27.045 18.5z" fill="#333" />
      </G>
      <Defs />
    </Svg>
  )
}
