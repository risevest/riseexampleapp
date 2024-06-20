import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { Props } from './types'

function StarIcon({ width, height }: Props) {
  return (
    <Svg fill="none" height={height} viewBox="0 0 12 11" width={width}>
      <Path
        d="M5.552.416a.5.5 0 01.896 0l1.344 2.722a.5.5 0 00.376.274l3.004.436a.5.5 0 01.277.853L9.276 6.82a.5.5 0 00-.144.442l.513 2.992a.5.5 0 01-.726.527L6.233 9.37a.5.5 0 00-.466 0L3.081 10.78a.5.5 0 01-.726-.527l.513-2.992a.5.5 0 00-.144-.442L.551 4.7a.5.5 0 01.277-.852l3.004-.436a.5.5 0 00.376-.274L5.552.416z"
        fill="#fff"
      />
    </Svg>
  )
}

export default StarIcon
