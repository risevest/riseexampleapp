import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

import { Props } from './types'

export function LockIcon({ height, width }: Props) {
  return (
    <Svg fill="none" height={height} viewBox="0 0 68 68" width={width}>
      <Rect fill="#71879C" fillOpacity={0.1} height={68} rx={34} width={68} />
      <Path
        d="M25.984 50h16.033c2.178 0 3.25-1.039 3.25-3.435V34.033c0-2.328-1.005-3.367-3.066-3.434v-3.786c0-5.378-3.45-8.813-8.192-8.813-4.758 0-8.193 3.435-8.193 8.813v3.786c-2.077.067-3.083 1.106-3.083 3.434v12.532c0 2.396 1.073 3.435 3.25 3.435zm1.072-23.22c0-4.558 2.865-7.607 6.953-7.607 4.054 0 6.936 3.049 6.936 7.606v3.82h-13.89v-3.82zM25.95 48.826c-1.357 0-1.977-.502-1.977-2.194V33.966c0-1.693.62-2.195 1.977-2.195h16.117c1.34 0 1.96.502 1.96 2.195v12.666c0 1.692-.62 2.194-1.96 2.194H25.95z"
        fill="#0898A0"
      />
    </Svg>
  )
}
