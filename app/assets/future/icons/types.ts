import { StyleProp, ViewStyle } from 'react-native'

export interface Props {
  height?: number
  iconColor?: string
  iconOpacity?: number
  stroke?: string | undefined
  strokeWidth?: number
  style?: StyleProp<ViewStyle>
  width?: number
}
