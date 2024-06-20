import { UseTheme, useTheme } from 'app/design/theme'
import * as React from 'react'
import { StyleProp, Switch as RNSwitch, ViewStyle } from 'react-native'

import { hapticFeedback } from '../../utils/index'

export type ISwitch = {
  disabled?: boolean
  onValueChange: () => void
  style?: StyleProp<ViewStyle>
  value: boolean | undefined
}

const Switch = ({ value, onValueChange, style, disabled }: ISwitch) => {
  const { theme } = useTheme() as UseTheme
  return (
    <RNSwitch
      disabled={disabled}
      onValueChange={() => {
        hapticFeedback()
        onValueChange()
      }}
      style={[{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }, style]}
      thumbColor={value ? theme.primarySurface : '#f4f3f4'}
      trackColor={{ false: theme.lightGrey, true: theme.primaryColor }}
      value={value}
    />
  )
}

export default Switch
