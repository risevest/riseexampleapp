import React from 'react'
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

// fix riseinput problem
export * from './Input/index'

interface IInputProps extends TextInputProps {
  hasIcon: boolean
  iconName?: string
  inputStyle?: any
  onIconPress?: () => any
  placeHolderText: string
  placeHolderTextColor?: string
  style?: any
}

const styles = StyleSheet.create({
  input: {
    color: '#fff',
    flex: 1,
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    lineHeight: 18
  },
  wrapper: {
    borderColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    height: 55,
    marginTop: 35,
    paddingHorizontal: 15
  }
})

export const Input = ({
  hasIcon,
  iconName,
  placeHolderText,
  placeHolderTextColor = 'white',
  style,
  inputStyle,
  onIconPress,
  ...rest
}: IInputProps) => {
  return (
    <View style={[styles.wrapper, style]}>
      <TextInput
        placeholder={placeHolderText}
        placeholderTextColor={placeHolderTextColor}
        style={[styles.input, inputStyle]}
        {...rest}
      />
      {hasIcon && (
        <Ionicons
          color="#fff"
          name={iconName}
          onPress={onIconPress}
          size={25}
          style={ICON}
        />
      )}
    </View>
  )
}

const ICON: ViewStyle = { paddingVertical: 12 }
