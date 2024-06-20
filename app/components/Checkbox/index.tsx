import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { UseTheme, useTheme } from '../../design/theme'
import { P } from '../../design/typography'

interface ICheckbox extends TouchableOpacityProps {
  checkboxStyle?: any
  isChecked: boolean
  isClickable: boolean
  text: string
  textStyle: any
}

const styles = StyleSheet.create({
  checkbox: {
    alignItems: 'center',
    borderRadius: 15 / 2,
    height: 15,
    justifyContent: 'center',
    marginRight: 7,
    width: 15
  },
  wrapper: {
    flexDirection: 'row',
    marginTop: 15
  }
})

const Checkbox = ({
  isChecked,
  text,
  textStyle,
  isClickable = true,
  checkboxStyle = {},
  ...rest
}: ICheckbox) => {
  const { theme } = useTheme() as UseTheme

  const generateCheckboxColor = (isBorderColor?: boolean) => {
    if (isChecked) {
      return theme.primaryColor
    } else if (isChecked === false) {
      return theme.error
    } else {
      return isBorderColor ? theme.primaryColor : theme.secondaryColor
    }
  }

  const CHECKBOX = {
    backgroundColor: generateCheckboxColor(),
    borderColor: generateCheckboxColor(true),
    borderWidth: isChecked || isChecked === null ? 1 : 0,
    ...checkboxStyle
  }

  return (
    <TouchableOpacity disabled={!isClickable} style={styles.wrapper} {...rest}>
      <View style={[styles.checkbox, CHECKBOX]}>
        {isChecked && (
          <Ionicons color={theme.primarySurface} name="checkmark" size={12} />
        )}
        {isChecked === false && (
          <Ionicons
            color={theme.primarySurface}
            name="close"
            size={12}
            style={ICON}
          />
        )}
      </View>
      <P fontsize={12} fontWeight="300" style={textStyle} text={text} />
    </TouchableOpacity>
  )
}

const ICON = { alignSelf: 'center' }

export default Checkbox
