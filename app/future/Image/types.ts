import { StyleProp, ViewStyle } from 'react-native'
import { ResizeMode } from 'react-native-fast-image'

export type ImageProps = {
  borderBottomLeftRadius?: number
  borderBottomRightRadius?: number
  borderRadius?: number
  borderTopLeftRadius?: number
  borderTopRightRadius?: number
  children?: any
  containerStyle?: StyleProp<ViewStyle>
  height?: number
  imageUri: any
  isBackground?: boolean
  resizeMode?: ResizeMode
  width?: number
}

export type StylesProp = {
  borderBottomLeftRadius?: number
  borderBottomRightRadius?: number
  borderRadius?: number
  borderTopLeftRadius?: number
  borderTopRightRadius?: number
  containerStyle?: StyleProp<ViewStyle>
  height?: number
  width?: number
}
