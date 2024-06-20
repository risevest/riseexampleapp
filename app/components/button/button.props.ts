import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle
} from 'react-native'

import { ButtonPresetNames } from './button.presets'

export interface ButtonProps extends TouchableOpacityProps {
  /**
   * Optional component wrapped with the button
   */
  children?: React.ReactNode

  /**
   * Show activity indicator in the button
   */
  isLoading?: boolean

  /**
   * One of the different types of text presets.
   */
  preset?: ButtonPresetNames

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  /**
   * The text to display .
   */
  text?: string

  /**
   * An optional style override useful for fontFamily and fontSize
   */
  textStyle?: StyleProp<TextStyle>
}
