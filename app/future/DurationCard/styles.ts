import {
  getComputedHeight,
  getComputedWidth
} from 'app/design/responsiveModule'
import { shadow } from 'app/design/Styles'
import { UseTheme, useTheme } from 'app/design/theme'
import { StyleSheet } from 'react-native'

const useDurationCardStyles = () => {
  const { theme } = useTheme() as UseTheme

  const styles = StyleSheet.create({
    activeCard: {
      backgroundColor: 'rgba(8,152,160,1)',
      ...shadow(0.5, 3.5, 7, 'rgba(8,152,160,1)', 0.2)
    },
    container: {
      alignItems: 'center',
      backgroundColor: '#71879C33',
      borderColor: 'rgba(113, 135, 156, 0.2)',
      borderRadius: 8,
      borderWidth: 1,
      height: getComputedHeight(83),
      justifyContent: 'center',
      width: getComputedWidth(76)
    }
  })

  return { styles, theme }
}

export default useDurationCardStyles
