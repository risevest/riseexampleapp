import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { Props } from './types'

export function IndigoArrowRight({ height, width }: Props) {
  return (
    <Svg fill="none" height={height} viewBox="0 0 13 13" width={width}>
      <Path
        d="M5.867 1.5L11 6.5m0 0l-5.133 5M11 6.5H0"
        stroke="#B80074"
        strokeWidth={2}
      />
    </Svg>
  )
}
