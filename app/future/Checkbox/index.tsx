import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Text } from '../Text'
import { useCheckboxStyles } from './styles'
import { CheckboxProps } from './types'

export const Checkbox = ({
  checked,
  children,
  checkmarkColor,
  containerStyle,
  checkboxStyle,
  checkedboxStyle,
  iconProps,
  ...props
}: CheckboxProps) => {
  const { styles, theme } = useCheckboxStyles({ checked })

  return (
    <TouchableOpacity
      style={[styles.wrapper, { ...(containerStyle as object) }]}
      {...props}
    >
      <View
        style={[
          styles.checkbox,
          { ...(checkboxStyle as object) },
          checked && checkedboxStyle
        ]}
      >
        {checked && (
          <Ionicons
            color={checkmarkColor || theme.primarySurface}
            name="ios-checkmark"
            size={15}
            {...iconProps}
          />
        )}
      </View>
      <Text type="r-16-main">{children}</Text>
    </TouchableOpacity>
  )
}
