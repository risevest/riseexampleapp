import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

import { Props } from './types'

export function CardIcon({ height, width }: Props) {
  return (
    <Svg fill="none" height={height} viewBox="0 0 40 40" width={width}>
      <Rect fill="#71879C" fillOpacity={0.1} height={40} rx={20} width={40} />
      <Path
        d="M13.844 26.296h12.36c1.523 0 2.296-.782 2.296-2.282v-8.351c0-1.508-.773-2.29-2.297-2.29h-12.36c-1.53 0-2.304.774-2.304 2.29v8.351c0 1.508.774 2.282 2.305 2.282zM12.508 15.71c0-.899.476-1.368 1.351-1.368h12.32c.86 0 1.36.47 1.36 1.368v.625H12.508v-.625zm1.351 9.617c-.875 0-1.351-.461-1.351-1.367v-6.175h15.031v6.175c0 .906-.5 1.367-1.36 1.367H13.86zm.946-2.961h1.914c.46 0 .773-.313.773-.75v-.953c0-.438-.312-.742-.773-.742h-1.914c-.453 0-.766.304-.766.742v.953c0 .438.313.75.766.75z"
        fill="#0898A0"
      />
    </Svg>
  )
}
