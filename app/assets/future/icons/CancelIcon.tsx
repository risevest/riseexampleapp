import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

import { Props } from './types'

export function CancelIcon({ height, width }: Props) {
  return (
    <Svg fill="none" height={height} viewBox="0 0 36 36" width={width}>
      <Rect fill="#71879C" fillOpacity={0.1} height={36} rx={18} width={36} />
      <Path
        d="M23.006 23.006L12.994 12.994M12.995 23.006l10.011-10.012"
        stroke="#0898A0"
        strokeWidth={2}
      />
    </Svg>
  )
}
