import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import { Text } from '../Text'
import { useRadioButtonStyles } from './styles'
import { RadioButtonProps } from './types'

export const RadioButton = ({
  checked,
  radioButtonSize,
  children,
  textStyle,
  containerStyle,
  ...rest
}: RadioButtonProps) => {
  const { styles } = useRadioButtonStyles({ radioButtonSize })
  return (
    <TouchableOpacity
      style={[styles.wrapper, { ...(containerStyle as object) }]}
      {...rest}
    >
      <View style={styles.checkView}>
        {checked && <View style={styles.checked} />}
      </View>
      <Text textStyle={textStyle} type="reg-17-main">
        {children}
      </Text>
    </TouchableOpacity>
  )
}
