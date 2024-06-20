import * as React from 'react'
import Svg, { Circle, Path, Rect } from 'react-native-svg'

import { Props } from './types'

export function PersonalizeIcon({ ...rest }: Props) {
  return (
    <Svg fill="none" viewBox="0 0 42 42" {...rest}>
      <Rect fill="#71879C" fillOpacity={0.1} height={42} rx={21} width={42} />
      <Rect
        height={13.7}
        rx={1.35}
        stroke="#0898A0"
        strokeWidth={1.3}
        width={16.7}
        x={12.65}
        y={14.65}
      />
      <Circle cx={25} cy={20} r={2} stroke="#0898A0" strokeWidth={1.3} />
      <Path
        d="M12.5 21.5l1.396 1.508a1 1 0 001.415.052l2.528-2.355a1 1 0 011.436.075L26 28.5"
        stroke="#0898A0"
        strokeWidth={1.3}
      />
    </Svg>
  )
}
