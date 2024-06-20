import { shadow } from 'app/design/Styles'
import { StyleSheet } from 'react-native'

import { PlanCardProps } from './types'

export function usePlanCardStyles({
  width,
  height
}: Pick<PlanCardProps, 'width' | 'height'>) {
  const styles = StyleSheet.create({
    container: {
      borderRadius: 15,
      height,
      marginRight: 15,
      overflow: 'hidden',
      width,
      ...shadow(10, 10, 4, 'rgba(43, 57, 75, 0.15)', 0.6)
    },
    imageWrapper: {
      borderRadius: 15,
      height,
      left: 0,
      overflow: 'hidden',
      position: 'absolute',
      right: 0,
      top: 0,
      width
    },
    planCardContainer: {
      borderRadius: 15,
      height,
      marginRight: 16,
      overflow: 'hidden',
      width,
      ...shadow(10, 10, 15, 'rgba(43, 57, 75, 0.15)', 0.6)
    },
    planInfo: {
      alignItems: 'center',
      bottom: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      left: 0,
      paddingBottom: 15,
      paddingHorizontal: 15,
      position: 'absolute',
      right: 0,
      zIndex: 1
    },
    planInfoView: {
      bottom: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      left: 0,
      paddingHorizontal: 20,
      paddingVertical: 5,
      position: 'absolute',
      right: 0
    }
  })

  return { styles }
}
