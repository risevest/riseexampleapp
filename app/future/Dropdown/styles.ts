import { UseTheme, useTheme } from 'app/design/theme'
import { StyleSheet } from 'react-native'

export const useDropdownStyles = () => {
  const { theme }: UseTheme = useTheme()

  const styles = StyleSheet.create({
    container: {
      marginTop: 30
    },
    dropDown: {
      backgroundColor: theme.primarySurface,
      borderColor: '#E6F5F6',
      borderRadius: 8,
      borderWidth: 1,
      elevation: 2,
      marginTop: 10,
      paddingHorizontal: 20,
      paddingVertical: 8,
      shadowColor: 'rgba(8, 152, 160, .4)',
      shadowOffset: {
        height: 0,
        width: 0
      }
    },
    dropDownPicker: {
      alignItems: 'center',
      borderColor: '#E1E8ED',
      borderRadius: 5,
      borderWidth: 1,
      flexDirection: 'row',
      height: 50,
      justifyContent: 'space-between',
      paddingHorizontal: 15
    }
  })

  return { styles, theme }
}
