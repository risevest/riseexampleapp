import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

import { Props } from './types'

export function FeedBackIcon({ width = 36, height = 36, ...rest }: Props) {
  return (
    <Svg fill="none" viewBox="0 0 36 36" {...{ height, width, ...rest }}>
      <Rect fill="#fff" fillOpacity={0.2} height={36} rx={18} width={36} />
      <Path
        d="M24.664 18H11.336m0 0L18 11.336M11.336 18L18 24.664"
        stroke="#fff"
        strokeWidth={2}
      />
    </Svg>
  )
}
