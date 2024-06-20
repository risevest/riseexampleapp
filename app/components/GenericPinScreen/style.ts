import { screenHeight } from 'app/design/responsiveModule'
import Styles from 'app/design/Styles'
import { UseTheme, useTheme } from 'app/design/theme'
import { StyleSheet } from 'react-native'

export const useGenericPinScreenStyles = () => {
  const { theme } = useTheme() as UseTheme

  const styles = StyleSheet.create({
    confirmText: {
      marginTop: 8
    },
    dot: {
      backgroundColor: theme.tertiaryColor,
      borderRadius: 4,
      height: 8,
      width: 8
    },
    header: {
      marginTop: 38
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
      marginTop: 35,
      width: 40
    },
    inputWrapper: {
      flexDirection: 'row',
      marginBottom: 19,
      marginTop: 21
    },
    keypadContainer: {
      left: 0,
      position: 'absolute',
      right: 0,
      top: screenHeight / 2 - 140
    },
    modalView: {
      alignItems: 'center',
      backgroundColor: theme.primarySurface,
      borderRadius: 8,
      height: 150,
      justifyContent: 'center'
    },
    wrapper: {
      ...Styles.body,
      flex: 1,
      justifyContent: 'space-between',
      paddingBottom: 20
    }
  })

  return { styles, theme }
}
