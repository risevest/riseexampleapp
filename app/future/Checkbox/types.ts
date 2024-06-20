import React from 'react'
import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle
} from 'react-native'

interface IconProps {
  color: string
  name: string
  size: number
}

export interface CheckboxProps extends TouchableOpacityProps {
  checkboxStyle?: StyleProp<ViewStyle>
  checked: boolean
  checkedboxStyle?: StyleProp<ViewStyle>
  checkmarkColor?: string
  children: React.ReactNode
  containerStyle?: StyleProp<ViewStyle>
  iconProps?: Partial<IconProps>
  isClickable?: boolean
  textStyle?: TextStyle
}
