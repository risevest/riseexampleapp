import * as React from 'react'
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg'

import { Props } from './types'

export function PlusIcon({ ...props }: Props) {
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
          clipRule="evenodd"
          d="M17.5 16.326v-4.25c0-.415-.448-.75-1-.75s-1 .335-1 .75v4.25h-4a1 1 0 100 2h4v4.25c0 .414.448.75 1 .75s1-.336 1-.75v-4.25h4a1 1 0 100-2h-4z"
          fill="#0898A0"
          fillRule="evenodd"
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
