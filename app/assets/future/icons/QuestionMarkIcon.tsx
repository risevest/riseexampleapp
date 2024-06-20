import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

import { Props } from './types'

export function QuestionMarkIcon({ width, height }: Props) {
  return (
    <Svg fill="none" height={height} viewBox="0 0 40 41" width={width}>
      <Rect
        fill="#71879C"
        fillOpacity={0.1}
        height={40}
        rx={20}
        width={40}
        y={0.174}
      />
      <Path
        d="M20.073 23.646c.49 0 .723-.339.723-.794v-.419c.017-1.158.419-1.666 1.8-2.62 1.498-1.034 2.353-2.13 2.353-3.708 0-2.443-1.987-3.931-4.501-3.931-1.908 0-3.548.971-4.225 2.612A2.75 2.75 0 0016 15.828c0 .41.232.687.669.687.365 0 .606-.214.713-.57.392-1.677 1.542-2.434 3.021-2.434 1.72 0 3.076 1.016 3.076 2.594 0 1.203-.723 1.925-1.9 2.763-1.38.98-2.245 1.916-2.245 3.387v.615c0 .455.25.776.74.776zm.01 4.528c.588 0 1.06-.482 1.06-1.06a1.056 1.056 0 10-1.06 1.06z"
        fill="#0898A0"
      />
    </Svg>
  )
}
