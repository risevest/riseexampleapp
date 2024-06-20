import { getComputedHeight } from 'app/design/responsiveModule'
import { StyleSheet } from 'react-native'

export const useHeaderStyles = () => {
  const styles = StyleSheet.create({
    space: {
      paddingHorizontal: 20
    },
    wrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: getComputedHeight(20),
      paddingTop: getComputedHeight(25)
    }
  })

  return { styles }
}
