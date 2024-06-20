import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { Props } from './types'

export function WarningIcon({ ...props }: Props) {
  return (
    <Svg fill="none" {...props}>
      <Path
        d="M9.5 7.154h2v-2h-2v2zm1 11c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-18a10 10 0 100 20 10 10 0 000-20zm-1 15h2v-6h-2v6z"
        fill="#0898A0"
      />
    </Svg>
  )
}
