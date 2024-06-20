import * as React from 'react'
import { Switch as RNSwitch } from 'react-native'

import { UseTheme, useTheme } from '../../design/theme'
import { SwitchT } from './types'

export function Switch({
  onValueChange,
  value,
  disabled,
  containerStyle
}: SwitchT) {
  const { theme }: UseTheme = useTheme()

  return (
    <RNSwitch
      disabled={disabled}
      onValueChange={onValueChange}
      style={[
        containerStyle,
        { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }
      ]}
      thumbColor={theme.primarySurface}
      trackColor={{ false: '#94A1AD', true: theme.primaryColor }}
      value={value}
    />
  )
}
