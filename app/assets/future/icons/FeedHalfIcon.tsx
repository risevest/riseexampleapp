import * as React from 'react'
import Svg, { Circle, Path, Rect } from 'react-native-svg'

import { Props } from './types'

export function FeedIcon({ ...rest }: Props) {
  return (
    <Svg fill="none" {...rest}>
      <Rect fill="#fff" height={221} rx={16} width={206} y={13} />
      <Circle cx={34} cy={46} fill="#71879C" fillOpacity={0.2} r={17} />
      <Rect
        fill="#71879C"
        fillOpacity={0.2}
        height={10}
        rx={1}
        width={61}
        x={61}
        y={33}
      />
      <Rect
        fill="#71879C"
        fillOpacity={0.1}
        height={90}
        rx={6}
        width={173}
        x={17}
        y={85}
      />
      <Rect
        fill="#71879C"
        fillOpacity={0.2}
        height={10}
        rx={1}
        width={37}
        x={61}
        y={50}
      />
      <Path
        d="M174 10c0-5.523 4.477-10 10-10h39c5.523 0 10 4.477 10 10v39c0 5.523-4.477 10-10 10h-39c-5.523 0-10-4.477-10-10V10z"
        fill="#fff"
      />
      <Path
        clipRule="evenodd"
        d="M186.906 14.906a2 2 0 012-2h29.188a2 2 0 012 2v8.069a2 2 0 01-2 2h-29.188a2 2 0 01-2-2v-8.069zm0 15.086a2 2 0 012-2h15.611a2 2 0 012 2v14.102a2 2 0 01-2 2h-15.611a2 2 0 01-2-2V29.992zm24.628-2a2 2 0 00-2 2v14.102a2 2 0 002 2h6.559a2 2 0 002-2V29.992a2 2 0 00-2-2h-6.559z"
        fill="#71879C"
        fillOpacity={0.1}
        fillRule="evenodd"
      />
      <Rect fill="#fff" height={67} rx={16} width={206} x={82} y={69} />
      <Circle cx={116} cy={102} fill="#71879C" fillOpacity={0.2} r={17} />
      <Circle cx={270} cy={94} fill="#71879C" fillOpacity={0.2} r={2} />
      <Circle cx={270} cy={102} fill="#71879C" fillOpacity={0.2} r={2} />
      <Circle cx={270} cy={110} fill="#71879C" fillOpacity={0.2} r={2} />
      <Rect
        fill="#71879C"
        fillOpacity={0.2}
        height={10}
        rx={1}
        width={61}
        x={143}
        y={89}
      />
      <Rect
        fill="#71879C"
        fillOpacity={0.2}
        height={10}
        rx={1}
        width={37}
        x={143}
        y={106}
      />
    </Svg>
  )
}
