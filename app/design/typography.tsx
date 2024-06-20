import React, { ReactElement } from 'react'
import { StyleProp, StyleSheet, TextProps, TextStyle } from 'react-native'
import { View as AnimatedView } from 'react-native-animatable'
import { Animation } from 'react-native-animatable'
import Animated from 'react-native-reanimated'

import { getComputedHeight, getComputedWidth } from './responsiveModule'
import { UseTheme, useTheme } from './theme'

interface ITypography extends TextProps {
  animation?: Animation
  animationDuration?: number
  children?: ReactElement
  fontWeight?: TextStyle['fontWeight']
  fontsize?: number
  style?: StyleProp<TextStyle>
  text: string | ReactElement
  type?: 'dark' | 'light' | 'primary' | 'danger' | 'white' | 'success'
}

const styles = StyleSheet.create({
  body: {
    fontFamily: 'DMSans-Medium'
  },
  paragraph: {
    fontFamily: 'DMSans-Regular'
  },
  text: {
    fontFamily: 'TomatoGrotesk-Regular'
  }
})

export const Header = ({
  fontsize = 30,
  text,
  style,
  animation,
  animationDuration,
  type = 'dark',
  ...rest
}: ITypography) => {
  const { theme } = useTheme() as UseTheme
  return (
    <AnimatedView
      animation={animation || 'fadeIn'}
      duration={animationDuration || 800}
      useNativeDriver
    >
      <Animated.Text
        style={[
          styles.text,
          {
            color:
              type === 'dark'
                ? theme.tertiaryColor
                : type === 'primary'
                  ? theme.primaryColor
                  : type === 'white'
                    ? theme.primarySurface
                    : theme.primaryTextColor,
            fontSize: getComputedHeight(fontsize),
            ...(style as object)
          }
        ]}
        {...rest}
      >
        {text}
      </Animated.Text>
    </AnimatedView>
  )
}

export const P = ({
  fontsize = 15,
  text,
  style = {},
  fontWeight = '600',
  animation,
  animationDuration,
  type,
  ...rest
}: ITypography) => {
  const { theme } = useTheme() as UseTheme
  return (
    <AnimatedView
      animation={animation || 'fadeIn'}
      duration={animationDuration || 800}
      useNativeDriver
    >
      <Animated.Text
        style={[
          styles.paragraph,
          {
            color:
              type === 'dark'
                ? theme.tertiaryColor
                : type === 'primary'
                  ? theme.primaryColor
                  : type === 'danger'
                    ? theme.error
                    : type === 'white'
                      ? theme.primarySurface
                      : type === 'success'
                        ? theme.success
                        : theme.primaryTextColor,
            fontSize: getComputedWidth(fontsize),
            fontWeight,
            ...(style as object)
          }
        ]}
        {...rest}
      >
        {text}
      </Animated.Text>
    </AnimatedView>
  )
}

export const Body = ({
  fontsize = 17,
  text,
  style,
  animation,
  animationDuration,
  type,
  ...rest
}: ITypography) => {
  const { theme } = useTheme() as UseTheme
  return (
    <AnimatedView
      animation={animation || 'fadeIn'}
      duration={animationDuration || 800}
      useNativeDriver
    >
      <Animated.Text
        style={[
          styles.body,
          {
            color:
              type === 'dark'
                ? theme.tertiaryColor
                : type === 'primary'
                  ? theme.primaryColor
                  : type === 'danger'
                    ? theme.error
                    : type === 'white'
                      ? theme.primarySurface
                      : type === 'success'
                        ? theme.success
                        : theme.primaryTextColor,
            fontSize: getComputedHeight(fontsize),
            ...(style as object)
          }
        ]}
        {...rest}
      >
        {text}
      </Animated.Text>
    </AnimatedView>
  )
}
