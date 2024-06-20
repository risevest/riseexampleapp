import * as React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Svg, { Path } from 'react-native-svg'

interface Props {
  height: number
  iconColor?: string
  style?: StyleProp<ViewStyle>
  width: number
}

export function GreyArrow({ width, height, iconColor, ...rest }: Props) {
  return (
    <Svg fill="none" height={height} viewBox="0 0 16 9" width={width} {...rest}>
      <Path
        d="M.846 1.203c0 .216.083.399.224.54l6.433 6.582c.158.158.349.24.556.24a.735.735 0 00.556-.24l6.425-6.574a.753.753 0 00.233-.548.744.744 0 00-.764-.755c-.2 0-.399.083-.54.216L8.06 6.707 2.15.664a.788.788 0 00-.54-.216.744.744 0 00-.763.755z"
        fill={iconColor ? iconColor : '#838F91'}
      />
    </Svg>
  )
}
