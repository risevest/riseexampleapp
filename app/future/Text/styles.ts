import { StyleSheet, TextStyle } from 'react-native'

import { getComputedWidth } from '../../design/responsiveModule'
import { UseTheme, useTheme } from '../../design/theme'
import { Props, TextVariant } from './types'

export const useTextStyles = ({
  type,
  variant
}: Pick<Props, 'type' | 'variant'>) => {
  const createTextStyle = () => {
    let textStyle: TextStyle = {
      color: getTextColor(variant as TextVariant),
      fontFamily: 'DMSans-Regular',
      fontSize: getComputedWidth(14),
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: getComputedWidth(17)
    }

    switch (type) {
      case 'r-14-soft':
        textStyle = {
          ...textStyle,
          fontSize: getComputedWidth(14),
          lineHeight: getComputedWidth(20)
        }
        break
      case 'r-15-soft':
        textStyle = {
          ...textStyle,
          fontSize: getComputedWidth(15),
          lineHeight: getComputedWidth(20)
        }
        break
      case 'r-16-btn':
        textStyle = {
          ...textStyle,
          fontSize: getComputedWidth(16),
          lineHeight: getComputedWidth(22)
        }
        break
      case 'r-16-main':
        textStyle = {
          ...textStyle,
          fontSize: getComputedWidth(16),
          lineHeight: getComputedWidth(22)
        }
        break
      case 'r-17-soft':
        textStyle = {
          ...textStyle,
          fontSize: getComputedWidth(17),
          lineHeight: getComputedWidth(20)
        }
        break
      case 'r-18-news':
        textStyle = {
          ...textStyle,
          fontSize: getComputedWidth(18),
          lineHeight: getComputedWidth(22)
        }
        break
      case 'reg-17-main':
        textStyle = {
          ...textStyle,
          fontSize: getComputedWidth(15),
          lineHeight: getComputedWidth(22)
        }
        break
      case 'reg-15-soft':
        textStyle = {
          ...textStyle,
          fontSize: getComputedWidth(15),
          lineHeight: getComputedWidth(20)
        }
        break
      case 'reg-17-button':
        textStyle = {
          ...textStyle,
          fontSize: getComputedWidth(15),
          fontWeight: '600',
          lineHeight: getComputedWidth(20)
        }
        break
      case 'reg-22-news':
        textStyle = {
          ...textStyle,
          fontSize: getComputedWidth(22),
          letterSpacing: -0.5,
          lineHeight: getComputedWidth(26)
        }
        break
      case 'bold-14':
        textStyle = {
          ...textStyle,
          fontSize: getComputedWidth(14),
          fontWeight: '500',
          lineHeight: getComputedWidth(14)
        }
        break
      case 'bold-18':
        textStyle = {
          ...textStyle,
          fontSize: getComputedWidth(18),
          fontWeight: '500',
          lineHeight: getComputedWidth(22)
        }
        break
      case 'med-17-tabs':
        textStyle = {
          ...textStyle,
          fontSize: getComputedWidth(17),
          fontWeight: '500',
          lineHeight: getComputedWidth(20)
        }
        break
      case 'links-16-ul-sb':
        textStyle = {
          ...textStyle,
          fontSize: getComputedWidth(16),
          fontWeight: '600',
          lineHeight: getComputedWidth(16),
          textDecorationLine: 'underline'
        }
        break
      case 'light-18':
        textStyle = {
          ...textStyle,
          fontSize: getComputedWidth(18),
          fontWeight: '300',
          lineHeight: getComputedWidth(22)
        }
        break
      case 'extra-light-18-card':
        textStyle = {
          ...textStyle,
          fontSize: getComputedWidth(24),
          lineHeight: getComputedWidth(29)
        }
        break
      case 'label-12-reg':
        textStyle = {
          ...textStyle,
          fontSize: getComputedWidth(12),
          fontWeight: '500',
          lineHeight: getComputedWidth(14)
        }
        break
      case 'label-10':
        textStyle = {
          ...textStyle,
          fontSize: getComputedWidth(10),
          fontWeight: '700',
          lineHeight: getComputedWidth(13)
        }
        break
      case 'head-1':
        textStyle = {
          ...textStyle,
          fontFamily: 'TomatoGrotesk-Medium',
          fontSize: getComputedWidth(24),
          fontWeight: '600',
          lineHeight: 26
        }
        break
      case 'head-2':
        textStyle = {
          ...textStyle,
          fontFamily: 'TomatoGrotesk-Medium',
          fontSize: getComputedWidth(28),
          fontWeight: '700',
          lineHeight: getComputedWidth(34)
        }
        break
      case 'head-2-20':
        textStyle = {
          ...textStyle,
          fontFamily: 'TomatoGrotesk-Regular',
          fontSize: getComputedWidth(20),
          fontWeight: '500',
          lineHeight: getComputedWidth(26)
        }
        break
      case 'head-mod-18-sb':
        textStyle = {
          ...textStyle,
          fontSize: getComputedWidth(18),
          fontWeight: '600',
          lineHeight: getComputedWidth(22)
        }
        break
      case 'head-mod-20-semibold':
        textStyle = {
          ...textStyle,
          color: '#23404d',
          fontFamily: 'DMSans-Medium',
          fontSize: getComputedWidth(22),
          lineHeight: getComputedWidth(26)
        }
        break
      case 'label-14-reg':
        textStyle = {
          ...textStyle,
          fontSize: getComputedWidth(14),
          lineHeight: getComputedWidth(17)
        }
        break
      case 'growth-14-reg':
        textStyle = {
          ...textStyle,
          fontFamily: 'TomatoGrotesk-Regular',
          fontSize: getComputedWidth(16),
          fontWeight: 'normal',
          lineHeight: getComputedWidth(19)
        }
        break
      case 'num-15-reg':
        textStyle = {
          ...textStyle,
          color: '#71879C',
          fontFamily: 'TomatoGrotesk-Regular',
          fontSize: getComputedWidth(15),
          lineHeight: getComputedWidth(20)
        }
        break
      case 'num-18-reg':
        textStyle = {
          ...textStyle,
          fontFamily: 'TomatoGrotesk-Regular',
          fontSize: getComputedWidth(18),
          letterSpacing: -0.32,
          lineHeight: getComputedWidth(22)
        }
        break
      case 'button-14-medium':
        textStyle = {
          ...textStyle,
          color: '#222222',
          fontFamily: 'DMSans-Regular',
          fontSize: getComputedWidth(13),
          lineHeight: getComputedWidth(17)
        }
        break
      case 'body-12-reg':
        textStyle = {
          ...textStyle,
          fontFamily: 'DMSans-Regular',
          fontSize: getComputedWidth(12),
          fontWeight: '400',
          lineHeight: getComputedWidth(16)
        }
        break
      case 'h1-24-semibold':
        textStyle = {
          ...textStyle,
          fontFamily: 'TomatoGrotesk-SemiBold',
          fontSize: getComputedWidth(24),
          fontWeight: '600',
          lineHeight: 26
        }
        break
      case 'empty':
      default:
        textStyle = {
          fontFamily: 'DMSans-Regular',
          fontSize: getComputedWidth(14),
          fontStyle: 'normal',
          fontWeight: 'normal',
          lineHeight: getComputedWidth(17)
        }
        break
    }

    return textStyle
  }

  const getTextColor = (textVariant: TextVariant) => {
    let textColor: string

    switch (textVariant) {
      case 'white':
        textColor = theme.primarySurface
        break
      case 'light':
        textColor = '#71879C'
        break
      case 'danger':
        textColor = theme.error
        break
      case 'dark':
        textColor = '#333333'
        break
      case 'primary':
        textColor = theme.primaryColor
        break
      case 'success':
        textColor = theme.success
        break
      case 'soft-tect':
        textColor = theme.inactiveTabText
        break
      case 'black':
        textColor = theme.softBlack
        break
      case 'green':
        textColor = theme.green
        break
      case 'orange':
        textColor = theme.orange
        break
      case 'indigo':
        textColor = theme.indigo
        break
      case 'gray':
        textColor = theme.gray
        break
      case 'inactive':
        textColor = theme.inactiveText
        break
      default:
        textColor = '#333333'
        break
    }

    return textColor
  }

  const { theme }: UseTheme = useTheme()

  const styles = StyleSheet.create({
    text: {
      ...createTextStyle(),
      color: getTextColor(variant as TextVariant)
    }
  })

  return { styles, theme }
}
