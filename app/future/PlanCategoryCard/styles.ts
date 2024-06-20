import {
  getComputedHeight,
  getComputedWidth
} from 'app/design/responsiveModule'
import { shadow } from 'app/design/Styles'
import { StyleSheet } from 'react-native'

export const usePlanCategoryCardStyle = () => {
  const styles = StyleSheet.create({
    assetClassImage: {
      height: '100%',
      width: '100%',
      ...shadow(10, 10, 15, 'rgba(43, 57, 75, 0.15)', 0.6),
      borderRadius: 15
    },
    opaqueView: {
      alignItems: 'center',
      borderRadius: 15,
      borderWidth: 0,
      bottom: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 20,
      position: 'absolute',
      width: '100%'
    },
    planCategoryCard: {
      height: getComputedHeight(243),
      width: getComputedWidth(188)
    }
  })

  return {
    styles
  }
}
