import * as React from 'react'
import {
  ActivityIndicator,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'

import { Text } from '../Text'
import { useButtonStyles } from './styles'
import { Props } from './types'

export const Button = ({
  variant,
  children,
  isLoading,
  disabled,
  textStyle,
  containerStyle,
  iconPosition,
  Icon,
  ...rest
}: Props) => {
  const { styles, textColor, activityIndicatorColor } = useButtonStyles(variant)

  const BUTTON_CONTAINER: ViewStyle = { opacity: disabled ? 0.5 : 1 }

  const BUTTON_TEXT: TextStyle = {
    ...(textStyle as object),
    color: textColor,
    lineHeight: 19
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.wrapper, containerStyle, BUTTON_CONTAINER]}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={activityIndicatorColor} size="large" />
      ) : (
        <View style={BUTTON_TEXT_CONTAINER}>
          {iconPosition === 'left' && Icon}
          <Text textStyle={BUTTON_TEXT} type="reg-17-button" variant="primary">
            {children}
          </Text>
          {iconPosition === 'right' && <View style={ICON}>{Icon}</View>}
        </View>
      )}
    </TouchableOpacity>
  )
}

const BUTTON_TEXT_CONTAINER: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  height: '100%',
  justifyContent: 'center',
  paddingHorizontal: 20,
  width: '100%'
}

const ICON: ViewStyle = { justifyContent: 'center', marginLeft: 'auto' }
