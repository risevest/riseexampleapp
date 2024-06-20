import { StyleSheet } from 'react-native'

import { UseTheme, useTheme } from '../../design/theme'
import { InputProps } from './types'

type Props = {
  hasError: Pick<InputProps, 'hasError'>['hasError']
  isCurrencyInput: boolean
  isFocused: boolean
  scaleX: any
  scaleY: any
  translateX: any
  translateY: any
}

export const useInputStyles = ({
  hasError,
  isFocused,
  translateX,
  translateY,
  scaleX,
  scaleY,
  isCurrencyInput
}: Props) => {
  const { theme }: UseTheme = useTheme()

  const styles = StyleSheet.create({
    countryCodeWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10,
      marginRight: 10
    },
    countryItem: {
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#E6F5F6',
      borderTopWidth: 1,
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 13
    },
    divider: {
      borderLeftColor: '#0898A0',
      borderLeftWidth: 1,
      height: '60%',
      marginHorizontal: 10,
      marginVertical: 12
    },
    flagWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10,
      marginRight: 10
    },
    input: {
      color: theme.tertiaryColor,
      flex: 1,
      fontSize: 17,
      fontWeight: '600',
      lineHeight: 18,
      paddingLeft: 5
    },
    labelStyle: {
      backgroundColor: isFocused ? theme.primarySurface : 'transparent',
      color: 'rgba(1, 34, 36, .8)',
      left: isCurrencyInput ? 50 : 0,
      position: 'absolute',
      top: 3,
      transform: [{ translateX }, { translateY }, { scaleX }, { scaleY }]
    },
    leftContent: {
      borderLeftColor: theme.primaryColor,
      borderLeftWidth: 1,
      marginHorizontal: 15,
      marginVertical: 12
    },
    modalWrapper: {
      backgroundColor: theme.primarySurface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      bottom: 0,
      height: '80%',
      left: 0,
      position: 'absolute',
      right: 0
    },
    searchHeading: {
      alignItems: 'center',
      borderColor: '#0898A0',
      borderRadius: 8,
      borderWidth: 1,
      flex: 1,
      flexDirection: 'row',
      height: 40,
      paddingLeft: 8
    },
    wrapper: {
      backgroundColor: 'rgba(230, 245, 246, 0.2)',
      borderColor: hasError
        ? theme.error
        : isFocused
          ? 'rgba(113, 135, 156, 0.2)'
          : theme.modalBackground,
      borderRadius: 5,
      borderWidth: 1,
      flexDirection: 'row',
      height: 55,
      marginTop: 35,
      paddingHorizontal: 15
    }
  })

  return { styles, theme }
}
