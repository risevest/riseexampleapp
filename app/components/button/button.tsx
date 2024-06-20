import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle
} from 'react-native'

import { useTheme } from '../../design/theme'

interface IGenericButtonProps extends TouchableOpacityProps {
  buttonStyle?: ViewStyle
  buttonText?: string
  children?: any
  isLoading?: boolean
  textColor?: string
  textStyle?: any
  variant: 'primary' | 'secondary' | 'transparent' | 'danger'
}

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: 'DMSans-Regular',
    fontSize: 15,
    fontWeight: '600'
  },
  wrapper: {
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    height: 55,
    justifyContent: 'center'
  }
})

function RenderButtonChild({
  children,
  isLoading,
  textColor,
  textStyle,
  buttonText
}: Pick<
  IGenericButtonProps,
  'children' | 'isLoading' | 'textColor' | 'textStyle' | 'buttonText'
>) {
  const { theme } = useTheme()

  if (children) {
    return children
  } else if (isLoading) {
    return <ActivityIndicator color={theme.primarySurface} size="large" />
  } else {
    return (
      <Text style={[styles.buttonText, { color: textColor, ...textStyle }]}>
        {buttonText}
      </Text>
    )
  }
}

const PrimaryButton = ({
  buttonText,
  onPress,
  buttonStyle,
  textStyle,
  textColor,
  children,
  disabled,
  isLoading,
  ...rest
}: IGenericButtonProps) => {
  const { theme } = useTheme()

  const WRAPPER = {
    backgroundColor: theme.primaryColor,
    opacity: disabled ? 0.5 : 1,
    ...buttonStyle
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.wrapper, WRAPPER]}
      {...rest}
    >
      <RenderButtonChild
        buttonText={buttonText}
        isLoading={isLoading}
        textColor={textColor}
        textStyle={textStyle}
      >
        {children}
      </RenderButtonChild>
    </TouchableOpacity>
  )
}

const TransparentButton = ({
  buttonText,
  onPress,
  buttonStyle,
  textStyle,
  textColor,
  children,
  disabled,
  isLoading,
  ...rest
}: IGenericButtonProps) => {
  const WRAPPER = { backgroundColor: 'transparent', ...buttonStyle }

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.wrapper, WRAPPER]}
      {...rest}
    >
      <RenderButtonChild
        buttonText={buttonText}
        isLoading={isLoading}
        textColor={textColor}
        textStyle={textStyle}
      >
        {children}
      </RenderButtonChild>
    </TouchableOpacity>
  )
}

const SecondaryButton = ({
  buttonText,
  onPress,
  buttonStyle,
  textStyle,
  textColor,
  children,
  disabled,
  isLoading,
  ...rest
}: IGenericButtonProps) => {
  const { theme } = useTheme()
  const WRAPPER = {
    backgroundColor: theme.secondaryColor,
    opacity: disabled ? 0.5 : 1,
    ...buttonStyle
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.wrapper, WRAPPER]}
      {...rest}
    >
      <RenderButtonChild
        buttonText={buttonText}
        isLoading={isLoading}
        textColor={textColor}
        textStyle={textStyle}
      >
        {children}
      </RenderButtonChild>
    </TouchableOpacity>
  )
}

const DangerButton = ({
  buttonText,
  onPress,
  buttonStyle,
  textStyle,
  textColor,
  children,
  disabled,
  isLoading,
  ...rest
}: IGenericButtonProps) => {
  const { theme } = useTheme()

  const CONTAINER = [
    styles.wrapper,
    { backgroundColor: theme.red10, ...buttonStyle }
  ]

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={CONTAINER}
      {...rest}
    >
      <RenderButtonChild
        buttonText={buttonText}
        isLoading={isLoading}
        textColor={textColor}
        textStyle={textStyle}
      >
        {children}
      </RenderButtonChild>
    </TouchableOpacity>
  )
}

const GenericButton = (props: IGenericButtonProps) => {
  if (props.variant === 'primary') {
    return <PrimaryButton {...props} />
  } else if (props.variant === 'transparent') {
    return <TransparentButton {...props} />
  } else if (props.variant === 'danger') {
    return <DangerButton {...props} />
  } else {
    return <SecondaryButton {...props} />
  }
}

export default GenericButton
