import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from 'react-native'

import { UseTheme, useTheme } from '../../design/theme'
import { P } from '../../design/typography'

interface IRadioButton extends TouchableOpacityProps {
  checked: boolean
  isClickable?: boolean
  text: string
  textStyle?: any
}

const styles = StyleSheet.create({
  checkView: {
    alignItems: 'center',
    borderRadius: 15 / 2,
    borderWidth: 1,
    height: 15,
    justifyContent: 'center',
    marginRight: 7,
    width: 15
  },
  checked: {
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

const RadioButton = ({
  checked,
  text,
  isClickable = true,
  onPress,
  textStyle,
  ...rest
}: IRadioButton) => {
  const { theme } = useTheme() as UseTheme
  return (
    <TouchableOpacity
      disabled={!isClickable}
      onPress={onPress}
      style={styles.wrapper}
      {...rest}
    >
      <View
        style={[
          styles.checkView,
          {
            borderColor: theme.primaryColor
          }
        ]}
      >
        {checked && (
          <View
            style={[styles.checked, { backgroundColor: theme.primaryColor }]}
          />
        )}
      </View>
      <P fontsize={12} fontWeight="300" style={textStyle} text={text} />
    </TouchableOpacity>
  )
}

export default RadioButton
