import React from 'react'
import {
  Animated,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle
} from 'react-native'

import { ICountriesData } from '../../utils/countriesData'

type ExtraProps = {
  Icon?: React.ComponentType
  containerStyle?: StyleProp<ViewStyle>
  countryCallingCode?: string
  getCountryCallingCode?: (countryCode: string) => void
  handleBlur?: () => void
  hasError?: boolean
  hasLabel?: boolean
  hasPlaceholder?: boolean
  inputStyle?: TextStyle
  isPressable?: boolean
  label: string
  labelStyle?: TextStyle
  leftText?: string
} & TextInputProps

type IconInput = ExtraProps & {
  Icon: React.ComponentType
  inputType: 'icon-input'
}

type PhoneInput = {
  countryCallingCode: string
  getCountryCallingCode: (countryCode: string) => void
  inputType: 'phone'
} & ExtraProps

type RegularInput = ExtraProps & {
  inputType: 'regular' | 'currency'
}

export type InputProps = RegularInput | IconInput | PhoneInput

export type InputState = {
  animatedValue: Animated.AnimatedValue
  country?: ICountriesData
  isFocused: boolean
  isModalOpen: boolean
  searchedCountries: ICountriesData[]
  value?: string
}
