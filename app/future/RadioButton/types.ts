import React from 'react'
import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle
} from 'react-native'

export interface RadioButtonProps extends TouchableOpacityProps {
  checked: boolean
  children: React.ReactNode
  containerStyle?: StyleProp<ViewStyle>
  radioButtonSize?: number
  textStyle?: TextStyle
}
