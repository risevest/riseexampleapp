import { StyleSheet } from 'react-native'

import { screenHeight } from '../../../../design/responsiveModule'
import { UseTheme, useTheme } from '../../../../design/theme'

export const useCreatePinStyles = () => {
  const { theme } = useTheme() as UseTheme
  const styles = StyleSheet.create({
    dot: {
      backgroundColor: theme.tertiaryColor,
      borderRadius: 4,
      height: 8,
      width: 8
    },
    heading: {
      marginBottom: 8,
      marginTop: 18
    },
    input: {
      alignItems: 'center',
      backgroundColor: theme.inputBackground,
      borderColor: theme.modalBackground,
      borderRadius: 5,
      borderWidth: 1,
      height: 40,
      justifyContent: 'center',
      marginRight: 8,
      marginTop: 15,
      width: 40
    },
    inputWrapper: {
      flexDirection: 'row'
    },
    keypadContainer: {
      left: 0,
      position: 'absolute',
      right: 0,
      top: screenHeight / 2 - 80
    },
    pressKeysWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: 25,
      marginTop: 20
    },
    wrapper: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 20
    }
  })

  return styles
}
