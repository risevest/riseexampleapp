import { StyleSheet } from 'react-native'

import { UseTheme, useTheme } from '../../../design/theme'

export const useInitialRouteStyles = () => {
  const { theme } = useTheme() as UseTheme
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: theme.primarySurface,
      flex: 1,
      justifyContent: 'center'
    },
    loader: {
      marginTop: 40
    },
    logo: {
      alignSelf: 'center',
      marginTop: 142
    },
    path: {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0
    },
    text: {
      color: theme.primarySurface,
      marginHorizontal: 102,
      marginTop: 30,
      textAlign: 'center'
    }
  })

  return styles
}
