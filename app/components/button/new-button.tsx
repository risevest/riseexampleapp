import { useTheme } from '@risemaxi/sarcelle'
import * as React from 'react'
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle
} from 'react-native'

import { TEXT_PRESETS, VIEW_PRESETS } from './button.presets'
import { ButtonProps } from './button.props'

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = 'primary',
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    isLoading,
    disabled,
    onPress,
    ...rest
  } = props

  const { colors } = useTheme()

  const viewStyle = VIEW_PRESETS[preset] || VIEW_PRESETS.primary
  const disabledStyle: ViewStyle = disabled
    ? {
        opacity: 0.5
      }
    : {}
  const viewStyles = StyleSheet.flatten([
    viewStyle,
    styleOverride,
    disabledStyle
  ])
  const textStyle = TEXT_PRESETS[preset] || TEXT_PRESETS.primary
  const textStyles = [textStyle, textStyleOverride]

  const content = children || <Text style={textStyles}>{text}</Text>

  return (
    <TouchableOpacity
      style={viewStyles}
      {...rest}
      disabled={disabled || isLoading}
      onPress={(event) => {
        Keyboard.dismiss()
        onPress?.(event)
      }}
    >
      {isLoading ? (
        <ActivityIndicator
          color={
            preset === 'primary' || preset === 'danger'
              ? 'white'
              : colors.primary
          }
        />
      ) : (
        content
      )}
    </TouchableOpacity>
  )
}
