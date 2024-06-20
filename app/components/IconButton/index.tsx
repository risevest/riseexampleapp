import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { UseTheme, useTheme } from '../../design/theme'

interface IconButtonProp extends TouchableOpacityProps {
  backgroundColor?: string
  iconColor?: string
  iconName: string
  onPress: () => any
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    borderRadius: 33 / 2,
    height: 33,
    justifyContent: 'center',
    width: 33
  }
})

const IconButton = ({
  onPress,
  iconName,
  iconColor,
  backgroundColor,
  ...rest
}: IconButtonProp) => {
  const { theme } = useTheme() as UseTheme
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.wrapper,
        { backgroundColor: backgroundColor || theme.offWhite }
      ]}
      {...rest}
    >
      <Ionicons
        color={iconColor || theme.primaryColor}
        name={iconName}
        size={25}
      />
    </TouchableOpacity>
  )
}

export default IconButton
