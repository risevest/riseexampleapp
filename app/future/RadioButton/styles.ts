import { StyleSheet } from 'react-native'

import { UseTheme, useTheme } from '../../design/theme'
import { RadioButtonProps } from './types'

export const useRadioButtonStyles = ({
  radioButtonSize
}: Pick<RadioButtonProps, 'radioButtonSize'>) => {
  const buttonSize = radioButtonSize || 15
  const { theme }: UseTheme = useTheme()

  const styles = StyleSheet.create({
    checkView: {
      alignItems: 'center',
      borderColor: theme.primaryColor,
      borderRadius: buttonSize / 2,
      borderWidth: 1,
      height: buttonSize,
      justifyContent: 'center',
      marginRight: 7,
      width: buttonSize
    },
    checked: {
      backgroundColor: theme.primaryColor,
      borderRadius: 9 / 2,
      height: 9,
      width: 9
    },
    wrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 15
    }
  })

  return { styles, theme }
}
