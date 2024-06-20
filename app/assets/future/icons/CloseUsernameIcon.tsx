import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { Props } from './types'

export function CloseUsernameIcon({
  height = 36,
  width = 36,
  ...props
}: Props) {
  return (
    <Svg
      fill="none"
      height={height}
      viewBox="0 0 36 36"
      width={width}
      {...props}
    >
      <Path
        clipRule="evenodd"
        d="M13.17 12.069L23.18 22.08l-1.06 1.06L12.11 13.13l1.06-1.062z"
        fill="#0898A0"
        fillRule="evenodd"
      />
      <Path
        clipRule="evenodd"
        d="M14.618 23.384l-.004-1.5 7.285-.021-.017-7.243 1.5-.004.02 8.742-8.784.026z"
        fill="#0898A0"
        fillRule="evenodd"
      />
    </Svg>
  )
}
