import React from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export interface ComponentShape {
  style?: TextStyle
  text: string
}

export interface HeaderProps {
  CenterComponent?: React.ComponentType | ComponentShape
  LeftComponent?: React.ComponentType | ComponentShape
  RightComponent?: React.ComponentType | ComponentShape
  backgroundColor?: string
  barStyle?: 'default' | 'light-content' | 'dark-content'
  containerStyle?: StyleProp<ViewStyle>
  goBack?: Noop
  navigation?: any
  onBackPress?: () => void
  space?: boolean
  type: 'no-icon' | 'with-back-icon-only' | 'other-icon'
}
