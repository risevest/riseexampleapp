import { UseTheme, useTheme } from 'app/design/theme'
import { P } from 'app/design/typography'
import React from 'react'
import { StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native'

const useActionInputStyles = () => {
  const { theme } = useTheme() as UseTheme
  const styles = StyleSheet.create({
    container: {},
    dropDownPicker: {
      alignItems: 'center',
      borderColor: theme.primaryColor,
      borderRadius: 5,
      borderWidth: 1,
      flexDirection: 'row',
      height: 50,
      paddingHorizontal: 15
    }
  })
  return { styles, theme }
}

interface IActionInputProps {
  Icon?: Element
  hasIcon?: boolean
  label: string
  leftIcon?: any
  onPress: () => void
  placeHolderText?: string
  rightIcon?: any
  value?: string
}

const ActionInput = ({
  onPress,
  value = '',
  label,
  leftIcon,
  rightIcon
}: IActionInputProps) => {
  const { styles, theme } = useActionInputStyles()

  const INPUT_BUTTON: TextStyle = {
    borderColor: value !== '' ? theme.primaryColor : 'rgba(8, 152, 160, .2)'
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.dropDownPicker, INPUT_BUTTON]}
      >
        {leftIcon}
        <P
          text={value === '' ? label : value}
          type={value === '' ? 'dark' : 'primary'}
        />
        {rightIcon}
      </TouchableOpacity>
    </View>
  )
}

export default ActionInput
