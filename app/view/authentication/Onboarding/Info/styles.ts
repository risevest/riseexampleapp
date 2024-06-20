import { StyleSheet } from 'react-native'

import { UseTheme, useTheme } from '../../../../design/theme'

export const useInfoStyles = () => {
  const { theme } = useTheme() as UseTheme
  const styles = StyleSheet.create({
    absoluteButton: {
      marginBottom: 50,
      marginTop: 80
    },
    anchor: {
      alignSelf: 'center',
      borderColor: theme.viewBackground,
      borderRadius: 4,
      borderWidth: 2,
      height: 1,
      width: 36
    },
    body: {
      lineHeight: 23,
      marginBottom: 19,
      marginTop: 20,
      textAlign: 'center'
    },
    button: {
      marginTop: 10
    },
    buttonText: {
      color: theme.primarySurface
    },
    captionWrapper: {
      flexDirection: 'row',
      marginTop: 31
    },
    circle: {
      alignItems: 'center',
      backgroundColor: theme.viewBackground,
      borderRadius: 46 / 2,
      height: 46,
      justifyContent: 'center',
      width: 46
    },
    emoji: {
      marginLeft: 5,
      marginTop: 5
    },
    heading: {
      color: theme.tertiaryColor,
      marginTop: 38
    },
    illustrationView: {
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: theme.viewBackground,
      borderRadius: 20,
      height: 110,
      justifyContent: 'center',
      marginTop: 31,
      width: 237
    },
    modalContent: {
      backgroundColor: theme.primarySurface,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      bottom: 0,
      height: '95%',
      left: 0,
      paddingHorizontal: 20,
      paddingVertical: 20,
      position: 'absolute',
      right: 0
    },
    modalWrapper: {
      margin: 0
    },
    wrapText: {
      flexWrap: 'wrap',
      marginTop: 4
    },
    wrapper: {
      paddingHorizontal: 20,
      paddingVertical: 20
    }
  })

  return {
    styles,
    theme
  }
}
