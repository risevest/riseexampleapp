import * as React from 'react'
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg'

import { Props } from './types'

export function MinusIcon({ ...props }: Props) {
  return (
    <Svg fill="none" {...props}>
      <G clipPath="url(#prefix__clip0)">
        <Rect
          fill="#71879C"
          fillOpacity={0.1}
          height={33}
          rx={16.5}
          width={33}
          y={0.826}
        />
        <Path
          d="M10.5 17.326a1 1 0 011-1h10a1 1 0 110 2h-10a1 1 0 01-1-1z"
          fill="#0898A0"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path d="M0 0h33v33H0z" fill="#fff" transform="translate(0 .826)" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
