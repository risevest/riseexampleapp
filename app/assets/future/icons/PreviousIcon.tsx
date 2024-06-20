import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { Props } from './types'

export function PreviousIcon({
  width = 13,
  height = 12,
  stroke = '#FE7122',
  ...props
}: Props) {
  return (
    <Svg
      fill="none"
      height={height}
      viewBox="0 0 13 12"
      width={width}
      {...props}
    >
      <Path
        d="M7.133 1L2 6m0 0l5.133 5M2 6h11"
        strokeWidth={2}
        {...{ stroke }}
      />
    </Svg>
  )
}
