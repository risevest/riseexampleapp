import { UseTheme, useTheme } from 'app/design/theme'
import { StyleSheet } from 'react-native'

export const useOTPInputStyles = () => {
  const { theme } = useTheme() as UseTheme

  const styles = StyleSheet.create({
    input: {
      backgroundColor: 'rgba(230, 245, 246, 0.2)',
      borderColor: 'rgba(8, 152, 160, 0.3)',
      borderRadius: 5,
      borderWidth: 1,
      color: 'black',
      height: 40,
      marginRight: 9,
      marginTop: 35,
      textAlign: 'center',
      width: 40
    }
  })

  return { styles, theme }
}
