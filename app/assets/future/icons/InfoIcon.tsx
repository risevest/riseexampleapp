import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { Props } from './types'

export function InfoIcon({ width, height }: Props) {
  return (
    <Svg fill="none" height={height} viewBox="0 0 20 20" width={width}>
      <Path
        d="M9 7h2V5H9v2zm1 11c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-18a10 10 0 100 20 10 10 0 000-20zM9 15h2V9H9v6z"
        fill="#0898A0"
      />
    </Svg>
  )
}
