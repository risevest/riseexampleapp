import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { Props } from './types'

export function BellIcon({ width, height, iconColor }: Props) {
  return (
    <Svg fill="none" height={height} viewBox="0 0 20 23" width={width}>
      <Path
        d="M19.947 18.159v1.024H.052v-1.024l2.21-2.05V9.964c0-3.175 2.244-5.972 5.527-6.873v-.297c0-.544.233-1.065.648-1.449.414-.384.976-.6 1.563-.6.586 0 1.148.216 1.563.6.414.384.647.905.647 1.449v.297c3.283.901 5.526 3.698 5.526 6.873v6.147l2.211 2.049zm-7.737 2.048c0 .544-.233 1.065-.647 1.449-.415.384-.977.6-1.563.6a2.302 2.302 0 01-1.563-.6 1.976 1.976 0 01-.648-1.449"
        fill={iconColor ?? '#0898A0'}
      />
    </Svg>
  )
}

export default BellIcon
