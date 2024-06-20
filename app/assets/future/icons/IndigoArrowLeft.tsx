import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { Props } from './types'

export function IndigoArrowLeft({ height, width }: Props) {
  return (
    <Svg fill="none" height={height} viewBox="0 0 13 13" width={width}>
      <Path
        d="M7.133 1.5L2 6.5m0 0l5.133 5M2 6.5h11"
        stroke="#B80074"
        strokeWidth={2}
      />
    </Svg>
  )
}
