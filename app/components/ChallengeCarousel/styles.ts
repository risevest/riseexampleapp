import { screenWidth } from 'app/design/responsiveModule'
import { UseTheme, useTheme } from 'app/design/theme'
import { StyleSheet } from 'react-native'

export const useChallengeStyles = () => {
  const { theme } = useTheme() as UseTheme

  const styles = StyleSheet.create({
    dot: {
      backgroundColor: theme.grey400,
      borderRadius: 5,
      height: 10,
      marginHorizontal: -1,
      width: 10
    },
    info: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 20
    },
    infoText: {
      width: screenWidth * 0.6
    },
    wrapper: {
      backgroundColor: theme.maroon,
      borderRadius: 8,
      elevation: 5,
      marginBottom: 20,
      marginHorizontal: 20,
      marginTop: 20,
      paddingBottom: 25,
      paddingTop: 25,
      shadowColor: 'rgba(188, 16, 88, 0.45);',
      shadowOffset: {
        height: 10,
        width: 5
      },
      shadowOpacity: 1,
      shadowRadius: 14
    }
  })

  return { styles, theme }
}
