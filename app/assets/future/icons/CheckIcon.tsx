import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { Props } from './types'

export function CheckIcon({ width, height, ...props }: Props) {
  return (
    <Svg
      fill="none"
      height={height}
      viewBox="0 0 39 26"
      width={width}
      {...props}
      testID="check_icon"
    >
      <Path
        d="M2.364 14.663l10.134 8.707L36.635 2.63"
        stroke="#0898A0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
      />
    </Svg>
  )
}
