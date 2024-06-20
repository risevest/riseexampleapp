import { StyleSheet } from 'react-native'

import { UseTheme, useTheme } from '../../design/theme'
import { ProgressT } from './types'

export function useProgressStyles({
  progressWidth,
  containerWidth
}: ProgressT) {
  const { theme }: UseTheme = useTheme()

  const styles = StyleSheet.create({
    activeProgress: {
      backgroundColor: theme.primaryColor,
      borderRadius: 20,
      height: 10,
      position: 'absolute',
      width: `${progressWidth}%`
    },
    progressWrapper: {
      backgroundColor: theme.secondaryButton,
      borderRadius: 20,
      height: 10,
      marginBottom: 35,
      width: `${containerWidth}%`
    }
  })

  return { styles, theme }
}
