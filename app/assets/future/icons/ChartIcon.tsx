import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

import { Props } from './types'

export function ChartIcon({ height, width }: Props) {
  return (
    <Svg fill="none" height={height} viewBox="0 0 40 40" width={width}>
      <Rect fill="#71879C" fillOpacity={0.1} height={40} rx={20} width={40} />
      <Path
        d="M12.5 19a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v7.5h-5V19zM17.5 14a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v12.5h-5V14zM22.5 22a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4.5h-5V22z"
        stroke="#0898A0"
      />
    </Svg>
  )
}
