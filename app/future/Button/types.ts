import { ReactElement } from 'react'
import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle
} from 'react-native'

import { TextVariant } from '../Text/types'

export interface Props extends TouchableOpacityProps {
  Icon?: ReactElement
  children?: any
  containerStyle?: StyleProp<ViewStyle>
  iconPosition?: 'left' | 'right' | ''
  isLoading?: boolean
  textStyle?: TextStyle
  textVariant?: TextVariant
  variant: Variant
}

export type Variant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'transparent'
  | 'danger'
