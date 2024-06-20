import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { Props } from './types'

export function TimerIcon({ width, height, style }: Props) {
  return (
    <Svg
      fill="none"
      height={height}
      style={style}
      viewBox="0 0 33 32"
      width={width}
    >
      <Path
        d="M27.99 16c0 6.346-5.144 11.49-11.49 11.49-6.345 0-11.49-5.144-11.49-11.49S10.156 4.51 16.5 4.51c6.346 0 11.49 5.144 11.49 11.49z"
        stroke="#94A1AD"
        strokeWidth={1.5}
      />
      <Path
        d="M16.763 9.01v7.13l3.555 2.272"
        stroke="#94A1AD"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </Svg>
  )
}
