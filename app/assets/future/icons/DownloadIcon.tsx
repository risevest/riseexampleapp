import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { Props } from './types'

export function DownloadIcon({ ...rest }: Props) {
  return (
    <Svg fill="none" height={24} viewBox="0 0 24 24" width={24} {...rest}>
      <Path
        d="M8.063 10.313L12 14.25l3.938-3.938M12 3.747v10.5"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 12.75v6.75a.75.75 0 01-.75.75H3.75A.75.75 0 013 19.5v-6.75"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
