import { Currency } from 'app/domains/wallet'
import React from 'react'
import { TextInput, TextStyle } from 'react-native'

import { CountryData } from './constants/countriesData'

export interface PhoneInputProps
  extends React.ComponentProps<typeof TextInput> {
  /**
   * optional default country code e.g nigeria
   */
  countryCode?: string

  /**
   * optional default currency code e.g NGN - set to USD by default
   */
  currency?: Currency

  /**
   * disabled picking of country
   */
  disableCountrySelect?: boolean

  /**
   * A warning text useful when validating input
   */
  errorText?: string

  /**
   * An animated placeholder that transitions to the border on focus
   */
  label?: string

  /**
   * An optional style for `label`
   */
  labelStyle?: TextStyle

  /**
   * Handle user interaction with current phone code
   */
  onCountryCodeChange?: (value: CountryData) => void

  /**
   * A reference to the input field. useful for toggling field focus
   */
  refs?: React.RefObject<TextInput>

  /**
   * optional list of curriences supported
   */
  selectableCurrencies?: Currency[]
}
