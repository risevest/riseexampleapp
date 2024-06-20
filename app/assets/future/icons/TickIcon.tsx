import * as React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Svg, { Path } from 'react-native-svg'

interface Props {
  height: number
  style?: StyleProp<ViewStyle>
  width: number
}

export function TickIcon({ width, height, ...rest }: Props) {
  return (
    <Svg
      fill="none"
      height={height}
      viewBox="0 0 14 11"
      width={width}
      {...rest}
    >
      <Path
        clipRule="evenodd"
        d="M5.554 7.241L12.005.79a.993.993 0 011.404 1.404L5.554 10.05.99 5.487a.993.993 0 111.404-1.404L5.554 7.24z"
        fill="#0898A0"
        fillRule="evenodd"
      />
    </Svg>
  )
}
