import { StyleSheet } from 'react-native'

import { UseTheme, useTheme } from '../../design/theme'
import { CheckboxProps } from './types'

export const useCheckboxStyles = ({
  checked
}: Pick<CheckboxProps, 'checked'>) => {
  const { theme }: UseTheme = useTheme()

  const getCheckboxBackgroundColor = () => {
    let backgroundColor: string

    switch (checked) {
      case true:
        backgroundColor = theme.primaryColor
        break
      case false:
        backgroundColor = theme.secondaryColor
        break
      default:
        backgroundColor = theme.primaryColor
        break
    }

    return backgroundColor
  }

  const getCheckboxBorderColor = () => {
    let borderColor: string

    switch (checked) {
      case true:
        borderColor = theme.primaryColor
        break
      case false:
        borderColor = theme.secondaryColor
        break
      default:
        borderColor = theme.primaryColor
        break
    }

    return borderColor
  }

  const styles = StyleSheet.create({
    checkbox: {
      alignItems: 'center',
      backgroundColor: getCheckboxBackgroundColor(),
      borderColor: getCheckboxBorderColor(),
      borderRadius: 15 / 2,
      borderWidth: 1,
      height: 15,
      justifyContent: 'center',
      marginRight: 7,
      width: 15
    },
    wrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 15
    }
  })

  return { styles, theme }
}
