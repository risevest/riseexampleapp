import { StyleProp, StyleSheet, ViewStyle } from 'react-native'

import { getComputedHeight } from '../../design/responsiveModule'
import { UseTheme, useTheme } from '../../design/theme'
import { Variant } from './types'

export const useButtonStyles = (variant: Variant) => {
  const { theme }: UseTheme = useTheme()

  const getBackgroundColor = (): string => {
    let backgroundColor: string

    switch (variant) {
      case 'primary':
        backgroundColor = theme.primaryColor
        break
      case 'danger':
        backgroundColor = theme.red10
        break
      case 'secondary':
        backgroundColor = theme.secondaryButton
        break
      case 'tertiary':
        backgroundColor = theme.primarySurface
        break
      case 'transparent':
        backgroundColor = 'transparent'
        break
      default:
        backgroundColor = theme.primaryColor
        break
    }

    return backgroundColor
  }

  const getTextColor = (): string => {
    let textColor: string

    switch (variant) {
      case 'primary':
        textColor = theme.primarySurface
        break
      case 'secondary':
      case 'tertiary':
        textColor = theme.primaryColor
        break
      case 'danger':
        textColor = theme.error
        break
      case 'transparent':
        textColor = theme.primaryColor
        break
      default:
        textColor = theme.primarySurface
        break
    }

    return textColor
  }

  const getActivityIndicatorColor = () => {
    let activityIndicatorColor: string

    switch (variant) {
      case 'primary':
        activityIndicatorColor = theme.primarySurface
        break
      case 'danger':
        activityIndicatorColor = theme.error
        break
      default:
        activityIndicatorColor = theme.primaryColor
        break
    }

    return activityIndicatorColor
  }

  const setBorderStyle = () => {
    let borderStyle: StyleProp<ViewStyle>
    switch (variant) {
      case 'tertiary':
        borderStyle = {
          borderColor: 'rgba(113, 135, 156, 0.2)',
          borderWidth: 1
        }
        break

      default:
        borderStyle = {
          borderWidth: 0
        }
        break
    }

    return borderStyle
  }

  const styles = StyleSheet.create({
    wrapper: {
      alignItems: 'center',
      backgroundColor: getBackgroundColor(),
      borderRadius: 5,
      flexDirection: 'row',
      height: getComputedHeight(56),
      justifyContent: 'center',
      ...setBorderStyle()
    }
  })

  return {
    activityIndicatorColor: getActivityIndicatorColor(),
    styles,
    textColor: getTextColor(),
    theme
  }
}
